# Agent guidelines

This repository is a JavaScript React application built with Vite. Keep changes focused, preserve unrelated work, and follow the current repository structure. `prompts.md` contains reusable task prompts; keep it aligned with these project conventions when updating it.

## Repository map

- `src/App.jsx` - current top-level application component. Keep expense records, selected category, and application-level state here; pass data and event handlers to child components as props.
- `src/components/` - component directory for reusable or substantial UI components. This directory does not exist yet; create it when a component is extracted. Keep one component per file.
- `src/utils/` - shared non-UI logic such as reusable validation and expense-total calculations. This directory does not exist yet; create it when such logic is introduced.
- `cypress/e2e/` - intended location for Cypress end-to-end specs. This directory does not exist yet and Cypress is not configured in the current package.
- `prompts.md` - reusable prompts for feature work, bug fixes, refactors, tests, reviews, and related tasks.
- `AGENTS.md` - this file; repository-wide instructions for agents and contributors.

## Implementation conventions

- Use one React component per file. Give components, handlers, state variables, and utilities descriptive names.
- Keep expense data, selected category, and application-level state in `App.jsx`. Pass data and event handlers down through props rather than duplicating application state in children.
- Add a short comment to every retained component explaining its props and where its state is owned. For example, note that `App` has no props and owns application state, or that a child receives data and callbacks through props while its state is owned by `App`.
- Use stable, descriptive `data-cy` selectors for Cypress interactions. Prefer selectors based on an element's purpose, not styling or position.
- Put reusable validation and total-calculation logic in `src/utils/` rather than embedding it in presentation components.
- Format displayed monetary amounts to exactly two decimal places.
- Do not add dependencies without asking for approval.

## Task and review workflow

- Work on a dedicated branch for each scoped task. Never push directly to `main`; use a pull request on GitHub.
- Before editing code, inspect the relevant files and propose a concise plan with observable acceptance criteria. Wait for approval before making code edits.
- Before committing, inspect the complete diff and run the relevant checks available in this repository. Do not commit until those checks and the diff review are complete.
- In each pull request, summarize the changes, tests and commands run, and known limitations.

## Commands

The scripts below are the ones currently present in `package.json`. Update this section when scripts are added or changed; do not claim that an unavailable test or coverage command exists.

| Purpose | Current command | Availability |
| --- | --- | --- |
| Install dependencies | `npm ci` | Available; uses the committed `package-lock.json`. |
| Development server | `npm run dev` | Available (`dev` script). |
| Lint | `npm run lint` | Available (`lint` script). |
| Production build | `npm run build` | Available (`build` script). |
| Unit tests (Vitest) | `npm test` | Available (`test` script). |
| Coverage | n/a | No coverage script or coverage setup is present yet. |
| End-to-end tests (Cypress) | n/a | No Cypress script or Cypress setup is present yet. |

`npm run preview` is also available to serve a built Vite app locally. When Vitest or Cypress scripts are introduced, record their exact `package.json` commands here.
