const xmlbuilder = require('xmlbuilder');

module.exports = (testCases) => {
	let rootXml = xmlbuilder.create('testsuites');

	testCases.forEach((suite) => {
		let suiteEl = rootXml.ele('testsuite');

		suiteEl.att('tests', suite.asserts.length);
		suiteEl.att('failures', suite.asserts.filter(test => {
			return !test.ok && !test.skip;
		}).length);
		suiteEl.att('errors', '0');
		suiteEl.att('name', suite.testName || '');
		suite.asserts.forEach(function (test, i) {
			const testCaseEl = suiteEl.ele('testcase', {
				name: `#${test.number} ${test.name}`
			});

			if (test.skip) {
				testCaseEl.ele('skipped');
			}
			if (!test.ok && !test.skip) {
				testCaseEl.ele('failure');
			}

			if (i === suite.asserts.length - 1) {
				suite.extra.forEach(function (extraContent) {
					testCaseEl.ele('system-out', extraContent);
				});
			}
		});
	});

	return rootXml.end({
		pretty: true,
		indent: '  ',
		newline: '\n'
	});
};
