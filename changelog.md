# Changelog

## v4.0.0

### BREAKING CHANGES

- Converted from [tap-out](https://github.com/scottcorgan/tap-out) to [tap-parser](https://github.com/tapjs/tap-parser)
  - This change means that the xml generated is now "Flat" (see below)
  - This removes the error count as there isn't an event for this anymore
  - Skips are handled WAY better and more naturally with TAP
  - This should flow better with proper tap output
- If a file extension is set in the command, it will be used for the generated file, if not `.xml` will be used
- Error counter removed with new parser
- The `testcase` name no longer has test number, the test number is now provided in the `id` attribute of `testcase`

### New

- Todo support
- Added new argument support `-p` or `--pretty` use this if you want the xml output to be "pretty" (this is `false` by default)

### Improved

- Optimized performance from both parsing and serializing
- Data is built more dynamically, instead of relying on certain keys to exist
- Better JUnit formatting
- Moved from [xmlbuilder](https://github.com/oozcitak/xmlbuilder-js) to [xmlbuilder2](https://github.com/oozcitak/xmlbuilder2)

#### Flat XML

Now `<testsuits>` containes only a singular `<testsuite>` element, within that all of the `<testcase>` elements now live. Here's an example:

v3 tap-junit output:
```xml
<testsuites tests="4" name="suite-name" failures="0" errors="0">
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

v4 tap-junit output:
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


## v3.1.2

### Fixed

- All dependencies have been updated in hopes to address yarn issue
- Fixed linting errors on some tests

## v3.1.1

### Fixed

- Updated minimiist dependency to fix vulnerability [juanpaco](https://github.com/juanpaco)

## v3.1.0

### New
- You can now use custom extensions, just apply then to your file name in the `-n` option (#24)
  - Example: `tape test/*.js | tap-junit -o output/tests -n tape.xuni`
  - If no extension is provided `tap-junit` will default to `.xml` automatically

### Improved

- Slight tweak to the contribution and PR template mark down files

## v3.0.2

- Added two new test cases for failing tap.txt and [bats](https://github.com/sstephenson/bats) tap output.
- Fixed failing output which was causing a hard error within serialization of the output
  - This was happening mainly due to results created by the above (failing tap output & failing bats output)
  - For these types of inputs `tap-junit` will simply omit the type attribute and the stack trace from its output (since they don't technically exist anyway)
- Upped [tape](https://github.com/substack/tape) version to latest
- Swapped travis ci in favor of [circleci](https://circleci.com/)

- TODO Side note
  - I want to revisit the serializer since it is being so lightly used it may be better to just ship a simple rendering engine of our own
    - This would free up a dependency, but also give better control and possibly improved performance
  - The above would also introduce an opportunity to do major cleanup with [Kyanite](https://github.com/dhershman1/kyanite)

## v3.0.1

- Fixed Readme typo

## v3.0.0

### POSSIBLE BREAKING CHANGES

- Output changed slightly, adding attributes to the main wrapper
- Removed `fs-extra` dependency for internal `mkdirp` function
  - Please let me know if you migrate to v3.0.0 and experience any trouble right away so I can address it
  - This should still function the same but I can't plan for every situation

### New

- Added `-i, --input` option which allows you to use tap-junit as a command and specify tap input
- Added `-v, --version` option to output the version of tap-junit
- Added `-s, --suite` which sets the suite name of the testsuites wrapper

### Fixed

- root level output paths

## v2.1.0

### New

- Upon an error (in tap-junit) when either writing or if the tests are not passing we call the `exit` method instead of setting the exitCode

### Improved

- Tweaked the `.travis.yml` file for node 8, linting, and cache
- Updated all current dependencies including dev
- Removed the `through2` dependency as it was no longer needed
- Removed the `duplexer2` dependency as it is no longer needed
- Switched to just using `console.log` vs `process.stdout.write` (flip flop I know)
- Converted to using the promise chain with `fs-extra` vs callbacks

### Fixed

- If you place the extension at the end of a name it will no longer get attached (Fixed in string sanitizer)
  - Example: `tap-junit -n tap.xml` will no longer result in `tapxml.xml` but instead `tap.xml` still

## v2.0.0

### BREAKING CHANGES

- **Dropped the `.setOutput` and `.main` layout (Remove support for API Usage overall)**
- An API system is not technically supported however requiring the module will give you the source `index.js` function

### New

- Convert to use `standard` instead of `eslint` for linting
- Update all of the dependencies

### Improved

- Some bits of the flow are improved to hopefully make things easier to follow
- Slight tweaks and optimizations

## v1.2.11

- `tap-junit` will now exit with an error if an error happens in the code instead of writing anyway
- Added a test set based around bad/erroring code
- Broke apart some testing to keep things organized
- Slight tweak for code cleanup and keeping things consistent
- Brought all of the dependencies up to date

## v1.2.10

- Fix for undefined test names [@jscriptcoder](https://github.com/jscriptcoder)

## v1.2.9

- Added type and message attr. Removed nested system-out elem [@jscriptcoder](https://github.com/jscriptcoder)

## v1.2.8

- Fix initialization of new test-suite - name is not passed correctly by [@hsalokor](https://github.com/hsalokor)
- Use --name passed from command line as default test suite name by [@hsalokor](https://github.com/hsalokor)
- Add lazy initialization to case if the tested software logs before first tap line by [@hsalokor](https://github.com/hsalokor)

## v1.2.7

- Some general cleanup and better practice rules

## v1.2.6

- Relax filename sanitation to allow - and _ and report correct output filename by [@hsalokor](https://github.com/hsalokor)

## v1.2.5

- Fix corner-case with testCase initialization by [@hsalokor](https://github.com/hsalokor), thanks!

## v1.2.4

- Tweaked readme
- Removed a console that was committed by accident

## v1.2.3

- Fixed line endings for outputs
- Fixed/cleaned XML output for proper jUnit XML

## v1.2.2

- Added a small API to allow this to be used with tools like Karma and webpack
  - This was mainly for a use case I needed I will happily expand on this if it is requested

## v1.2.1

- Failures will now build out xml as well to give you more info on failures
- Outputs will stdout to the console instead of a file if `--output` is not specified

## v1.2.0

- Continued optimizations
  - Removed `plan` event listening since it was currently valueless
  - Removed `extra` event listening since it was currently valueless
  - If the tests had any failures instead of hard calling `process.exit(1)` we now properly set the exitCode
  - Better error handling (no more throws because no one is catching them duh)
  - Added a `failure` counter to eliminate valueless computing
  - Dropped `console.log` in favor of `process.stdout.write` (since `console.log` uses this anyway)
  - Now running on `Stream3` instead of `Stream2` to stay on `Stream2` use `v1.1.0` or lower
- Added the ability to name your xml output file using the `--name` or `-n` options in the command
  - Values passed into name are sanitized to avoid passing paths or other weird things
- Added a shorthand for `--output` which is `-o` (soooo original)
- Removed our `^` on module versions in case someone releases a bad version
- Made Skip regex more strict when checking if an assert or test is skipped
- Did some structure reorg
  - Moved everything into a `src` folder and added a `lint` command for the module
  - Removed the makefile because I don't actually remember why it was there to begin with

## v1.1.0

- Dropped `tap-parser` in favor of `tap-out` module
- `tap-junit` will successfully record `skipped` tests now
- `skipped` main test suites now supported (not just skipped asserts)
- Added internal counting to make things process faster
- Should now properly record `comments` from both `console.log` and `t.comment`
- Currently none of the tap parsers properly support `Skips` or `TODOs`
- Lots of performance optimizations
- Added some messages for other errors if a write fails for the output

## v1.0.3
- Removed Tape Dependency
- Swapped stuff over to github
- Readme Tweaks
