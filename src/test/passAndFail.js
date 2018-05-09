/* Modules */

const test = require('tape')

/* Tests */

test('1 === 2', function (t) {
  t.plan(1)
  t.equal(1, 2)
})

test('1 === 1', function (t) {
  t.plan(1)
  t.equal(1, 1)
})
