# tap-bamboo

XML TAP output formatter. Mainly for use with junit and other bamboo xunit parsers

## Installation

~~~ text
npm install -g tap-bamboo
npm install tap-bamboo --save-dev
~~~

## Usage

~~~ text
tape test/*.js | tap-bamboo
node test.js | ./node_modules/tap-bamboo/bin/tap-bamboo
~~~

## Output

```xml
<testsuites>
  <testsuite tests="3" failures="0" errors="0" name="example tests">
    <testcase name="#1 Results should return val"/>
    <testcase name="#2 results should return newVal"/>
    <testcase name="#3 should not change param should return sameVal"/>
  </testsuite>
</testsuites>
```
