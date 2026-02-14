# Test Run: Re-run update stability

- test_id: rerun-update-stability
- run_at: 2026-02-14T15:51:34.220Z
- result: fail
- answer: no
- startup_created: false

## Goal
Confirm running startup updates twice in a row does not freeze.

## Expected on glasses
- Stability run @ 2026-02-14T15:51:21.336Z (2/2)

## Notes
I still see the two A/B block lines from the previous “multi container” test. I did not see the expected output of the new test’s replace what was already on my screen. 

Also, regarding the previous test, the example shown in this tester app showed “Block A @ 2026-02-14T15:50:50.906Z” spilled onto two lines, followed by a single line break, and then “Block B @ 2026-02-14T15:50:50.940Z”. There was no empty lines in between the two blocks shown in the example preview here. However, in the glasses, I see Block A all on one line, followed by 2 or 3 lines worth of empty space underneath it, followed by Block B. I’m not sure if that was a “pass” or a “fail” on the previous multi-container test. Please consider reducing the font size of the green example text in the black preview window in this app, or perhaps disable text wrap so the user can scroll left and right to see long text strings. Also, please be specific with regards to features of the test that cannot be easily expressed in the preview window, such as whether the user should expect to potentially see spacing between elements, or borders, or other relevant possibilities.
