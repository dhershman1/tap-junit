[![Travis](https://img.shields.io/travis/dhershman1/tap-junit.svg?style=flat-square)](https://travis-ci.org/dhershman1/tap-junit)
[![npm](https://img.shields.io/npm/v/tap-junit.svg?style=flat-square)](https://www.npmjs.com/package/tap-junit)
[![Downloads](https://img.shields.io/npm/dm/tap-junit.svg?style=flat-square)](https://www.npmjs.com/package/tap-junit)
[![David](https://img.shields.io/david/dhershman1/tap-junit.svg?style=flat-square)](https://david-dm.org/dhershman1/tap-junit)
[![David](https://img.shields.io/david/dev/dhershman1/tap-junit.svg?style=flat-square)](https://david-dm.org/dhershman1/tap-junit?type=dev)

# tap-junit

Silly small, silly easy junit output formatter for tap.

Works with tape and other tap based tests just pipe it into tap-junit

**This README reflects the development branch, which is under the beta tag for tap-junit**

## Changelog

You can checkout the changelog at: https://github.com/dhershman1/tap-junit/blob/master/changelog.md

## Parameters

- `-o, --output` - designate where you want the .xml results to output
  - If you do not specify an output then results will be displayed within the terminal
- `-n, --name` - value provided will be the name of the `output.xml` file, otherwise defaults to `tap.xml`
- `-s, --suite` - sets the main test suite name defaults to Tap-Junit if not passed
- `-v, --version` - displays the current tap-junit version
- `-i, --input` - Specify a specific tap txt input file to transform

## Installation

```
npm i -D tap-junit
```

## Usage

```
tape test/*.js | tap-junit --output output/test

node test.js | ./node_modules/tap-junit/bin/tap-junit --output output/test

tap-junit -o output/tests -n nontape < src/test/non-tape.tap

tape tests/thing.js | tap-junit > output/thing.xml

tap-junit -i tap.txt -s suite-name
```

## Output

```xml
<testsuites tests="4" name="Tap-Junit" failures="0" errors="0">
  <testsuite tests="3" failures="0" errors="0" name="1 === 1">
    <testcase name="#1 test is equal"/>
    <testcase name="#2 test skip extra # SKIP">
      <skipped/>
    </testcase>
    <testcase name="#3 should not be equal"/>
  </testsuite>
  <testsuite tests="1" failures="0" errors="0" name="2 === 2">
    <testcase name="#4 should be equal"/>
  </testsuite>
  <testsuite tests="0" failures="0" errors="0" name="SKIP skipped test"/>
</testsuites>
```

## Skip Output

**`tap-junit` uses regex currently to determine skipped tests it looks for the `# SKIP` string strictly, so please avoid using this in your test/assert name/msg or you may get incorrect outputs. This is done because none of the current Parsers have solid support for `TODO` or `SKIP` in tap.**

If it is requested I will go back to just having the output write blank testsuites and not writing asserts at all when a value is skipped (due to the feedback from tap itself)

Skipped asserts will show up like so:

```xml
<testcase name="#1 test skip extra # SKIP">
  <skipped/>
</testcase>
```

And Fully skipped tests will show up like so:

```xml
<testsuite skipped="true" tests="0" failures="0" errors="0" name="SKIP skipped test"/>
```
