const test = require('tape')

/* eslint-disable */

test('good test', t => {
  t.ok(true);
  t.end();
});

test('bad test', t => {
  t.ok(undefined.length);
  t.end();
});
