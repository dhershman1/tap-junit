/* Modules */

const test = require('tape');

/* Tests */

test('1 === 1', function(assert) {
	assert.equal(1, 1);
	assert.notEqual(1, 0);
	assert.end();
});

test('2 === 2', function(assert) {
	assert.equal(2, 2);
	assert.end();
});
