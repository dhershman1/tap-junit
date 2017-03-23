/* Modules */

const test = require('tape');

/* Tests */

test('1 === 2', function(assert) {
	assert.equal(1, 2);
	assert.end();
});

test('2 === 1', function(assert) {
	assert.equal(2, 1);
	assert.end();
});
