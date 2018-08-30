const { EOL } = require('os')

const xmlbuilder = require('xmlbuilder')

module.exports = testCases => {
  const rootXml = xmlbuilder.create('testsuites')

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
