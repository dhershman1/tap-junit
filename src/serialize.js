const { EOL } = require('os')
const { create } = require('xmlbuilder2')

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
function buildFailureParams (fail, comment) {
  const failObj = {}

  // If there is an operator then its most likely a harness test
  if (fail.operator) {
    failObj.type = fail.diag.operator
    failObj['#'] = `
      ---
      operator: ${fail.diag.operator}
      expected: ${fail.diag.expected}
      actual: ${fail.diag.actual}
      at: ${fail.diag.at}
      stack: ${fail.diag.stack}
      ---
      ${comment}
      `

    return failObj
  }

  if (fail.diag) {
    failObj.message = fail.diag.message
    failObj.type = fail.diag.severity || 'fail'
  } else if (fail.todo) {

  }

  // Otherwise assume its the wild west of tap input and just piece it together the best we can
  return fail.diag
    ? [
      { message: fail.diag.message, type: fail.diag.severity || 'fail' },
      fail.todo
        ? `${fail.todo}\n ${comment}`
        : `${buildDetails(fail.diag.data)} ${comment}`
    ]
    : [{ message: '', type: 'fail' }, `\n${comment}`]
}

module.exports = (testCases, output, comments, name = 'Tap-Junit') => {
  console.log(comments)
  const len = testCases.length
  const xmlObj = {
    testsuites: {
      '@tests': output.count,
      '@name': output.name,
      '@failures': output.fail,
      testsuite: {
        '@tests': output.count,
        '@skipped': output.skip,
        '@failures': output.fail,
        testcase: []
      }
    }
  }

  // return create(xmlObj).end({ prettyPrint: true })

  for (let i = 0; i < len; i++) {
    const t = testCases[i]
    const comment = comments[t.id] || ''
    const caseEl = {
      '@name': t.name,
      '@id': t.id
    }

    if (t.skip) {
      caseEl.skipped = {}
      caseEl['#'] = comment
    } else if (!t.ok) {
      caseEl.failure = buildFailureParams(t, comment)
    } else {
      caseEl['#'] = comment
    }

    xmlObj.testsuites.testsuite.testcase.push(caseEl)
  }

  return create(xmlObj).end({
    prettyPrint: true,
    newline: EOL
  })
}
