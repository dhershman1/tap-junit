/* Modules */

const path = require('path');
const parser = require('tap-parser');
const through = require('through2');
const duplexer = require('duplexer');
const fse = require('fs-extra');
const parsedArgs = require('minimist')(process.argv.slice(2));

/* Helpers */

function writeOutput(json) {
	fse.mkdirp(parsedArgs.output, (err) => {
		if (err) {
			throw err;
		}
		fse.writeJson(path.join(parsedArgs.output, 'tap.json'), json, {spaces: 2}, (jsonErr) => {
			if (jsonErr) {
				throw jsonErr;
			}
		});
	});
}

/* Parser */

module.exports = () => {
	const tap = parser();
	let out = through.obj();
	let dup = duplexer(tap, out);
	let duration = 0;
	let initialTime = new Date();
	let json = {
		stats: {
			tests: 0,
			passes: 0,
			failures: 0,
			pending: 0,
			duration: 0
		},
		failures: [],
		passes: []
	};
	let data = {
		failures: [],
		passes: []
	};
	let cmt = null;

	tap.on('comment', function(res) {
		cmt = res;
	});

	tap.on('assert', function(res) {
		const assert = {
			fullTitle: cmt,
			title: res.name,
			duration: new Date() - initialTime
		};

		if (!res.ok) {
			assert.error = res.name;
			assert.title = cmt;
			data.failures.push(assert);
		} else {
			data.passes.push(assert);
		}
	});

	tap.on('results', res => {
		json.stats.duration += duration;
		json.stats.tests += res.asserts.length;
		json.stats.passes += res.pass.length;
		json.stats.failures += res.fail.length;
		json.stats.pending += res.todo.length;
		json.failures = json.failures.concat(data.failures);
		json.passes = json.passes.concat(data.passes);
		out.push(json);
	});

	tap.on('finish', () => {
		writeOutput(json);
	});

	return dup;
};
