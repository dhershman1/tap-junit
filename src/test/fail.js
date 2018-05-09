/* Modules */

const test = require('tape')

/* Tests */

test('1 === 2', t => {
  t.equal(1, 2)
  t.end()
})

test('2 === 1', t => {
  t.equal(2, 1)
  t.end()
})
