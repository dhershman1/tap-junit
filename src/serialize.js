const xmlbuilder = require('xmlbuilder');

module.exports = testCases => {
	let rootXml = xmlbuilder.create('testsuites');

	testCases.forEach(suite => {
		let suiteEl = rootXml.ele('testsuite');

		suiteEl.att('skipped', suite.skipped);
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
				const failEl = testCaseEl.ele('failure');

				failEl.ele('operator', {}, test.error.operator);
				failEl.ele('expected', {}, test.error.expected);
				failEl.ele('actual', {}, test.error.actual);
				const locEl = failEl.ele('location');

				locEl.ele('file', {}, test.error.at.file);
				locEl.ele('line', {}, test.error.at.line);
				locEl.ele('character', {}, test.error.at.character);
			}
		});
	});

	return rootXml.end({
		pretty: true,
		indent: '  ',
		newline: '\n'
	});
};
