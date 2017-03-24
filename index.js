/* Modules */

const path = require('path');
const parser = require('tap-parser');
const through = require('through2');
const duplexer = require('duplexer');
const fse = require('fs-extra');
const parsedArgs = require('minimist')(process.argv.slice(2));
const serialize = require('./lib/serialize.js');

/* Parser */

module.exports = () => {
	const tap = parser();
	let out = through();
	let testSuites = [];
	let finished = false;
	let testCase = {};
	let dup = duplexer(tap, out);

	/* Helpers */

	/**
	 * Writes the tap.xml file
	 * @param  {String} xml     the xml string generated by the tap-parser events
	 * @param  {Boolean} passing passing boolean to let us know that the tests are passing
	 * @return {Null} No Return required
	 */
	function writeOutput(xml, passing) {
		const output = parsedArgs.output || '';

		fse.mkdirp(output, (err) => {
			if (err) {
				throw err;
			}
			fse.writeFile(path.join(output, 'tap.xml'), xml, (xmlErr) => {
				if (xmlErr) {
					throw xmlErr;
				}
				if (!passing) {
					console.error(new Error('Looks like the test suites failed, check your tap.xml for more info'));
					process.exit(1);
				}
				console.log('Finished! tap.xml created');
			});
		});
	}

	/**
	 * Formats test names for our array of suites
	 * @param  {String} name The test name brought back from the tap parse
	 * @return {String}        Returns the formatted name
	 */
	function formatTestName(name) {
		// Full width unicode dot
		const unicodeDot = '\uFF0E';
		let formattedName = name;

		name.replace(/\./g, unicodeDot);
		if (name.indexOf('#') === 0) {
			formattedName = name.substr(1);
		}

		return formattedName.trim();
	}

	/**
	 * Creates a new test object and pushes it into our suites
	 * @param  {String} testName Test name
	 * @return {Object}            Returns the newly created test object
	 */
	function newTest(testName) {
		testSuites.push({
			id: testSuites.length,
			extra: [],
			asserts: [],
			testName: formatTestName(testName)
		});

		return testSuites[testSuites.length - 1];
	}

	/* Parser Event listening */

	tap.on('comment', function(res) {
		if (finished) {
			return;
		}
		testCase = newTest(res);
	});

	tap.on('assert', function(res) {
		if (!testCase) {
			testCase = newTest('Default');
		}
		testCase.asserts.push(res);

	});

	tap.on('extra', extra => {
		if (testCase && extra) {
			testCase.extra.push(extra);
		}
	});

	tap.on('plan', () => {
		finished = true;
	});

	tap.on('results', res => {
		const xmlString = serialize(testSuites);

		out.push(xmlString);
		writeOutput(xmlString, res.ok);
	});

	return dup;
};
