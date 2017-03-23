const xmlbuilder = require('xmlbuilder');

function formatFailure(diag) {
	let text = '\n          ---\n';
	let key = '';

	for (key in diag) {
		if (diag.hasOwnProperty(key) && diag[key]) {
			let value = diag[key];

			text += '            '+key+': ' + (typeof value === 'object' ? JSON.stringify(value) : value) + '\n';
		}
	}

	text += '          ...\n      ';

	return text;
}

module.exports = (testCases) => {
	let rootXml = xmlbuilder.create('testsuites');

	testCases.forEach((suite) => {
		let suiteEl = rootXml.ele('testsuite');
		let failureEl = '';

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
				failureEl = testCaseEl.ele('failure');
				console.log(test)
				if (test.diag) {
					failureEl.txt(formatFailure(test.diag));
				}
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
