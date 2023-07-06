# Calculator UI Examples Globber Action

This action finds example files in the provided calculator-ui root. The output may then be used as inputs to [examples test runner](https://github.com/e2grnd/e2g-run-case-file-action).

# Development

Be sure to run `yarn all` before committing!

# Usage

**With exclusions:**

```
- uses: e2grnd/e2g-calculator-ui-examples-globber-action@main
  id: calcs
  with:
    max-files: 5
    exclude-calcs: calcName1, badCalc
```

**With Inclusions:**

```
- uses: e2grnd/e2g-calculator-ui-examples-globber-action@main
  id: calcs
  with:
    calcs: calc1, calc2
    exclude-calcs: badCalc
```