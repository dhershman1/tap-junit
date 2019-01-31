const { EOL } = require('os')

const xmlbuilder = require('xmlbuilder')

module.exports = (testCases, output, name = 'Tap-Junit') => {
  const rootXml = xmlbuilder.create('testsuites')

  rootXml.att('tests', output.asserts.length)
  rootXml.att('name', name)
  rootXml.att('failures', output.fail.length)
  rootXml.att('errors', output.errors.length)

  testCases.forEach(suite => {
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
        testCaseEl.ele('failure', {
          type: test.error.operator,
          message: test.raw
        }, `
    ---
${test.error.raw}
${test.error.stack}
    ---
        `)
      }
    })
  })

  return rootXml.end({
    pretty: true,
    indent: '  ',
    newline: EOL
  })
}
