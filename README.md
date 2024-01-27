[![CircleCI](https://circleci.com/gh/dhershman1/tap-junit.svg?style=svg)](https://circleci.com/gh/dhershman1/tap-junit)
[![npm](https://img.shields.io/npm/v/tap-junit.svg?style=flat-square)](https://www.npmjs.com/package/tap-junit)
[![Downloads](https://img.shields.io/npm/dm/tap-junit.svg?style=flat-square)](https://www.npmjs.com/package/tap-junit)

# tap-junit

Silly small, silly easy junit output formatter for tap.

Works with [tape](https://github.com/substack/tape) and other tap based tests just pipe it into tap-junit

## Parameters

- `-c, --classname` - The name you want to apply to the `testsuite` element (if not set no name is given to the output testsuite)
- `-o, --output` - designate where you want the .xml results to output
  - If you do not specify an output then results will be displayed within the terminal
- `-n, --name` - value provided will be the name of the `output.xml` file, otherwise defaults to `tap.xml`
- `-s, --suite` - sets the main test suite name defaults to Tap-Junit if not passed
- `-v, --version` - displays the current tap-junit version
- `-i, --input` - Specify a specific tap txt input file to transform
- `-p, --pretty` - Specify if you want the output xml to be prettified or not this is `false` by default

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

You can now use custom extensions (in version 3.1.0+) simply add the extension to the end of your file name. If none is provided `tap-junit` will still default to `.xml`

`tape test/*.js | tap-junit -o output/tests -n tape.xuni`

The above will create a file called `tape.xuni` in the `output/tests` directory with the results inside.

## Output

Tap-Junit currently follows [this spec](https://github.com/junit-team/junit5/blob/main/platform-tests/src/test/resources/jenkins-junit.xsd) on junit syntax/layout

```xml
<testsuites tests="4" name="Tap-Junit" failures="2">
  <testsuite tests="4" failures="2" skipped="1">
    <testcase id="1" name="test is equal"/>
    <testcase id="2" name="test skip extra # SKIP">
      <skipped/>
    </testcase>
    <testcase id="3" name="should not be equal"/>
    <testcase id="4" name="should be equal"/>
  </testsuite>
</testsuites>
```

## Comments

So Tap Junit takes a [tape]() style assumption when it comes to comments. That being, when a comment appears before a test (because that's how tape labels its tap output) it will be registered as a comment for that test, but the issue here is that you may lose placed comments in your tap files.

At the moment, I'm still trying to figure out a decent way to handle comments and record them. Keep this in mind that only a single comment before each test will currently be recorded for a system-out tag.

If you have ideas on how to better handle this, don't hesitate to reach out!
