const xmlbuilder = require('xmlbuilder');
const EOL = require('os').EOL;

module.exports = testCases => {
	let rootXml = xmlbuilder.create('testsuites');

	testCases.forEach(suite => {
		let suiteEl = rootXml.ele('testsuite');

		suiteEl.att('tests', suite.assertCount);
		suiteEl.att('failures', suite.failCount);
		suiteEl.att('errors', suite.errorCount);
		suiteEl.att('name', suite.testName || '');
		suite.asserts.forEach(test => {
			const testCaseEl = suiteEl.ele('testcase', {
				name: `#${test.number} ${test.name}`
			});

			if (test.skip) {
				testCaseEl.ele('skipped');
			}
			if (!test.ok && !test.skip) {
				testCaseEl.ele('failure')
        .ele('system-out', {}, `
    ---
${test.error.raw}
    ---
				`);
			}
		});
	});

	return rootXml.end({
		pretty: true,
		indent: '  ',
		newline: EOL
	});
};
