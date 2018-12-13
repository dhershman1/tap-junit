/* Modules */

const test = require('tape')

/* Tests */

test('1 === 1', t => {
  t.plan(3)
  t.equal(1, 1, 'test is equal', {data: 'cool'})
  t.equal(1, 1, 'test skip extra', {skip: true})
  t.notEqual(1, 0)
  t.end()
})

test('2 === 2', t => {
  t.equal(2, 2)
  t.end()
})

test('skipped test', {skip: true}, t => {
  t.ok(true)
  t.end()
})
