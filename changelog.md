# Changelog

## v1.2.5

> - Fix corner-case with testCase initialization by [@hsalokor](https://github.com/hsalokor), thanks!

## v1.2.4

> - Tweaked readme
> - Removed a console that was committed by accident

## v1.2.3

> - Fixed line endings for outputs
> - Fixed/cleaned XML output for proper jUnit XML

## v1.2.2

> - Added a small API to allow this to be used with tools like Karma and webpack
>   - This was mainly for a use case I needed I will happily expand on this if it is requested

## v1.2.1

> - Failures will now build out xml as well to give you more info on failures
> - Outputs will stdout to the console instead of a file if `--output` is not specified

## v1.2.0

> - Continued optimizations
>   - Removed `plan` event listening since it was currently valueless
>   - Removed `extra` event listening since it was currently valueless
>   - If the tests had any failures instead of hard calling `process.exit(1)` we now properly set the exitCode
>   - Better error handling (no more throws because no one is catching them duh)
>   - Added a `failure` counter to eliminate valueless computing
>   - Dropped `console.log` in favor of `process.stdout.write` (since `console.log` uses this anyway)
>   - Now running on `Stream3` instead of `Stream2` to stay on `Stream2` use `v1.1.0` or lower
> - Added the ability to name your xml output file using the `--name` or `-n` options in the command
>   - Values passed into name are sanitized to avoid passing paths or other weird things
> - Added a shorthand for `--output` which is `-o` (soooo original)
> - Removed our `^` on module versions in case someone releases a bad version
> - Made Skip regex more strict when checking if an assert or test is skipped
> - Did some structure reorg
>   - Moved everything into a `src` folder and added a `lint` command for the module
>   - Removed the makefile because I don't actually remember why it was there to begin with

## v1.1.0

> - Dropped `tap-parser` in favor of `tap-out` module
> - `tap-junit` will successfully record `skipped` tests now
> - `skipped` main test suites now supported (not just skipped asserts)
> - Added internal counting to make things process faster
> - Should now properly record `comments` from both `console.log` and `t.comment`
> - Currently none of the tap parsers properly support `Skips` or `TODOs`
> - Lots of performance optimizations
> - Added some messages for other errors if a write fails for the output

## v1.0.3
> - Removed Tape Dependency
> - Swapped stuff over to github
> - Readme Tweaks
