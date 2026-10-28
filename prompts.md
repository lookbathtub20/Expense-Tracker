# Reusable prompts

Copy a template and replace the bracketed placeholders before using it. In every task, inspect the relevant code and existing project conventions first. Keep changes focused, preserve unrelated work, and report what changed and how it was verified.

## 1. New feature

```text
Implement [feature] in this repository.

First inspect the relevant code, project conventions, and available tests. Before changing code, provide a short implementation plan and a list of observable, testable acceptance criteria. Then implement the feature and add or update tests for those criteria.

Constraints:
- Preserve existing behavior outside this feature.
- Avoid unrelated refactors and new dependencies unless necessary; explain any exception.
- Follow existing patterns and accessibility conventions.

When finished, summarize the implementation, tests added, and commands run. Report any criteria that could not be verified.
```

## 2. Bug fix

```text
Investigate and fix this issue: [describe the issue and expected behavior].

First inspect the relevant code and tests. Reproduce the issue with a focused test or the smallest reliable reproduction, identify and explain the root cause, then make the smallest complete fix. Add a regression test that fails before the fix and passes afterward.

Preserve unrelated behavior and avoid unrelated refactors or new dependencies. Run the relevant tests and report the reproduction, cause, fix, and verification results. If you cannot reproduce the issue, explain what you tried before changing code.
```

## 3. Refactor

```text
Refactor [module, component, or behavior] to [desired structural improvement].

Inspect its callers and existing tests before editing. Keep externally observable behavior unchanged: preserve inputs, outputs, side effects, error handling, and user-facing behavior. Do not add features or make unrelated changes.

Add or adjust tests only as needed to characterize behavior affected by the refactor. Run the relevant tests and report the behavior-preservation evidence, changes made, and any remaining risk.
```

## 4. Generate tests

```text
Review [file, component, or feature] and identify important behavior that is currently untested.

Inspect existing test conventions and the available test runner first. List the uncovered behaviors and prioritize meaningful edge cases, then write focused tests with assertions on observable results—not merely implementation details or that code ran.

Cover relevant success, invalid-input, boundary, and error behavior. Do not change production code unless a test reveals a defect; if that happens, explain the finding separately before making a fix. Run the new tests and report what each group verifies.
```

## 5. Review diff

```text
Review the current diff against its base for actionable issues.

Prioritize correctness defects, regressions, security issues, and scope creep. Trace affected behavior far enough to verify each suspected issue. Report only findings supported by the diff or surrounding code, ordered by severity; for each, give the file and line, impact, and a concise explanation. If there are no actionable findings, say so and mention any important testing gaps.

Do not modify files. Do not report style preferences or speculative concerns as defects.
```

## 6. Commit message

```text
Write one concise commit message for the current staged change.

Inspect the staged diff and summarize its main purpose without claiming work the diff does not contain. Use Conventional Commits format: <type>(<optional scope>): <imperative summary>. Keep the subject brief, specific, and free of a trailing period. Output only the commit message; include a short body only if needed to explain important context.
```

## Five-part prompt: add an expense

```text
Context: This is a React + Vite expense tracker. The current repository is a Vite starter; implement the expense-tracker behavior in App.jsx and keep its state there unless the existing code provides a clear reason to follow a different pattern.

Goal: Build a form that adds an expense with a title, amount, and category.

Constraints:
- Do not add dependencies.
- Do not make unrelated refactors.
- Work on the current feature branch and preserve unrelated working-tree changes.
- Follow existing project patterns and accessible form conventions.
- Use agreed selectors; if none are documented, prefer accessible labels and avoid inventing brittle selectors.
- Inspect the available test setup first. Add focused tests using existing tooling; do not introduce a test dependency just for this task. If no test runner exists, report that behavioral tests could not be run and run the available build or lint checks instead.

Acceptance criteria:
- Submitting a title containing non-whitespace characters, a finite amount greater than 0 and no greater than 100000, and a category adds one expense with those values.
- An empty or whitespace-only title is rejected.
- A non-numeric, non-finite, zero, or negative amount is rejected.
- An amount greater than 100000 is rejected; 100000 itself is accepted.
- A rejected submission does not add an expense, retains the entered values, and displays an error that identifies the invalid field.
- After an invalid field is corrected, its validation error is cleared when that field's value changes.
- After a successful submission, the expense appears in the displayed expense list and the form fields are cleared.

Examples:
- `Lunch`, `250`, `Food` succeeds and adds one expense.
- An empty title with `250` and `Food` fails, adds no expense, retains the entered values, and shows a title error.
- `Dinner`, `-50`, `Food` fails, adds no expense, and shows an amount error.
- `Dinner`, `100001`, `Food` fails, adds no expense, and shows an amount error.
- `Dinner`, `100000`, `Food` succeeds.

Inspect the relevant code before editing. Then implement the form, validation, expense list, and focused tests. Run the relevant checks and report the files changed and their results.
```
