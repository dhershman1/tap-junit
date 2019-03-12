const test = require('tape')

test('a + b = ab', t => {
  t.same('a' + 'b', 'ab')
  t.end()
})

test('skipped', { skip: true }, t => {
  t.same('ab' + 'c', 'abc')
  t.end()
})
