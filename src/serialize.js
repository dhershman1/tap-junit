const { EOL } = require('os')
const xmlbuilder = require('xmlbuilder')

/**
 * Gathers information from the test object to build out the proper arguments for creating the failure element
 * @function
 * @private
 * @param {Object} test The primary test results object
 * @returns {Array} An array with the proper arguments to use
 */
function buildFailureParams (test) {
  const opts = test.error.operator
    ? { type: test.error.operator, message: test.raw }
    : { message: test.raw }

  if (test.error.raw && test.error.stack) {
    return [
      opts,
      `
      ---
  ${test.error.raw}
  ${test.error.stack}
      ---
          `
    ]
  }

  return [opts]
}

module.exports = (testCases, output, name = 'Tap-Junit') => {
  const rootXml = xmlbuilder.create('testsuites')

  rootXml.att('tests', output.asserts.length)
  rootXml.att('name', name)
  rootXml.att('failures', output.fail.length)
  rootXml.att('errors', output.errors.length)

  testCases.forEach(suite => {
    if (!suite.asserts.length && !suite.skipped) {
      return
    }

    const suiteEl = rootXml.ele('testsuite')

    suiteEl.att('tests', suite.assertCount)
    suiteEl.att('failures', suite.failCount)
    suiteEl.att('errors', suite.errorCount)
    suiteEl.att('name', suite.testName || '')
    suite.asserts.forEach(test => {
      const testCaseEl = suiteEl.ele('testcase', {
        name: `#${test.number} ${test.name}`
      })

      if (test.skip) {
        testCaseEl.ele('skipped')
      } else if (!test.ok) {
        testCaseEl.ele('failure', ...buildFailureParams(test))
      }
    })
  })

  return rootXml.end({
    pretty: true,
    indent: '  ',
    newline: EOL
  })
}
