const { EOL } = require('os')
const xmlbuilder = require('xmlbuilder')

function buildDetails (data) {
  if (!data) {
    return ''
  }

  let str = '\n---\n'

  for (const key in data) {
    str += `${key}: ${data[key]}\n`
  }

  str += '---\n'

  return str
}

/**
 * Gathers information from the test object to build out the proper arguments for creating the failure element
 * @function
 * @private
 * @param {Object} test The primary test results object
 * @returns {Array} An array with the proper arguments to use
 */
function buildFailureParams (fail) {
  // If there is an operator then its most likely a harness test
  if (fail.operator) {
    return [
      { type: fail.diag.operator },
      `
      ---
      operator: ${fail.diag.operator}
      expected: ${fail.diag.expected}
      actual: ${fail.diag.actual}
      at: ${fail.diag.at}
      stack: ${fail.diag.stack}
      ---
      `
    ]
  }

  // Otherwise assume its the wild west of tap input and just piece it together the best we can
  return [
    { message: fail.diag.message, type: fail.diag.severity || 'fail' },
    fail.todo
      ? `${fail.todo}`
      : buildDetails(fail.diag.data)
  ]
}

module.exports = (testCases, output, name = 'Tap-Junit') => {
  const wrapper = xmlbuilder.create('testsuites')

  wrapper.att('tests', output.count)
  wrapper.att('name', name)
  wrapper.att('failures', output.fail)

  const rootXml = wrapper.ele('testsuite', {
    tests: output.count,
    failures: output.fail,
    skipped: output.skip
  })
  const len = testCases.length

  for (let i = 0; i < len; i++) {
    const t = testCases[i]
    const caseEl = rootXml.ele('testcase', {
      name: `#${t.id} ${t.name}`
    })

    if (t.skip) {
      caseEl.ele('skipped')
    } else if (!t.ok) {
      caseEl.ele('failure', ...buildFailureParams(t))
    }
  }

  return rootXml.end({
    pretty: true,
    indent: '  ',
    newline: EOL
  })
}
