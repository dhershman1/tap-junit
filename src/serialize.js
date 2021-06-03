const { EOL } = require('os')
const { create } = require('xmlbuilder2')

function formatDiag (diag) {
  return Object.entries(diag).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      acc.push(`${key}: \n  ${formatDiag(value)}`)
    } else {
      acc.push(`${key}: ${String(value).replace(/\n/g, ' ')}`)
    }

    return acc
  }, []).join('\n')
}

/**
 * Gathers information from the test object to build out the proper arguments for creating the failure element
 * @function
 * @private
 * @param {Object} test The primary test results object
 * @returns {Array} An array with the proper arguments to use
 */
function buildFailureParams (fail) {
  const failObj = {
    '@message': '',
    '@type': 'fail'
  }

  // If there is an operator then its most likely a harness test
  if (fail.operator) {
    failObj.type = fail.diag.operator
    failObj['@message'] = `
      ---
      operator: ${fail.diag.operator}
      expected: ${fail.diag.expected}
      actual: ${fail.diag.actual}
      at: ${fail.diag.at}
      stack: ${fail.diag.stack}
      ---
      `

    return failObj
  }

  if (fail.diag) {
    failObj['@message'] = fail.diag.message || fail.todo
      ? `${fail.todo}`
      : `
    ---
    ${formatDiag(fail.diag)}
    ...`
    failObj['@type'] = fail.diag.severity || 'fail'
  }

  return failObj
}

module.exports = (testCases, output, { name = 'Tap-Junit', pretty, classname = 'Tap-Junit-Suite' }) => {
  const len = testCases.length
  const xmlObj = {
    testsuites: {
      '@tests': output.count,
      '@name': name,
      '@failures': output.fail,
      testsuite: {
        '@name': classname,
        '@tests': output.count,
        '@skipped': output.skip,
        '@failures': output.fail,
        testcase: []
      }
    }
  }

  for (let i = 0; i < len; i++) {
    const t = testCases[i]
    const caseEl = {
      '@name': t.name,
      '@id': t.id
    }

    if (t.skip) {
      caseEl.skipped = {}
    } else if (!t.ok) {
      caseEl.failure = buildFailureParams(t)
    }

    if (t.comments) {
      caseEl['system-out'] = t.comments
    }

    xmlObj.testsuites.testsuite.testcase.push(caseEl)
  }

  return create(xmlObj).end({
    prettyPrint: pretty,
    newline: EOL
  })
}
