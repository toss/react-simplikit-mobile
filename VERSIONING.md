# Versioning Policy

## Overview

Both `react-simplikit` and `@react-simplikit/mobile` are currently in **0.x (pre-1.0)** status. This means the packages are production-ready but the API may evolve based on feedback.

We follow the **"0.minor = breaking change"** convention, which is widely adopted by popular open source projects (Vite, SWC, etc.).

## Version Number Meaning (0.MINOR.PATCH)

### PATCH (0.x.Y → 0.x.Y+1)

Non-breaking changes:

- Bug fixes
- New features (backward-compatible additions)
- Performance improvements
- Internal refactoring

### MINOR (0.X.0 → 0.X+1.0)

Breaking changes:

- Removing or renaming exports
- Changing function signatures
- Changing default behaviors
- Changing return value structures

### MAJOR (→ 1.0.0)

Reserved for the stable release. Do not use until 1.0.0 criteria are met.

## npm Semver Behavior with 0.x

npm treats `^` ranges specially for 0.x packages:

```
^0.3.0  →  >=0.3.0 <0.4.0   (minor bumps are NOT included)
^0.3.1  →  >=0.3.1 <0.4.0   (only patches are included)
```

This means users are **automatically protected** from breaking changes — `npm install` will never auto-upgrade across minor versions.

## For Contributors: Choosing Changeset Type

When running `yarn changeset`, select based on this table:

| Your Change | Changeset Type | Version Result |
| --- | --- | --- |
| Bug fix | `patch` | 0.x.Y → 0.x.Y+1 |
| New feature (backward-compatible) | `patch` | 0.x.Y → 0.x.Y+1 |
| Breaking change | `minor` | 0.X.0 → 0.X+1.0 |
| Stable release | `major` | → 1.0.0 (don't use) |

> **Note**: This mapping is different from post-1.0 semver, where new features use `minor`.

### Decision Tree

```
Is your change breaking existing user code?
├─ YES → minor changeset (0.X → 0.X+1)
└─ NO  → patch changeset (0.x.Y → 0.x.Y+1)
```

### Breaking Change Changeset Requirements

Every breaking change changeset **must** include:

1. `⚠️ BREAKING CHANGE:` prefix in the summary
2. Migration guide with before/after code examples
3. Rationale for the change

**Example changeset file** (`.changeset/rename-use-toggle.md`):

````markdown
---
"react-simplikit": minor
---

⚠️ BREAKING CHANGE: Rename `useToggle` to `useBooleanState`

**Migration:**

```diff
- import { useToggle } from 'react-simplikit';
+ import { useBooleanState } from 'react-simplikit';

- const [value, toggle] = useToggle(false);
+ const [value, toggle] = useBooleanState(false);
```

**Rationale**: Improved clarity — "toggle" implies UI component, while "booleanState" clearly indicates state management.
````

## Package Status

| Package | Current Version | Status |
| --- | --- | --- |
| `react-simplikit` | 0.x | Pre-1.0, API evolving |
| `@react-simplikit/mobile` | 0.x | Pre-1.0, API evolving |

## Roadmap to 1.0.0

The 1.0.0 release will be data-driven, not date-driven. Criteria:

- [ ] API design finalized (no planned breaking changes)
- [ ] 100% test coverage maintained
- [ ] Comprehensive documentation and examples
- [ ] Production usage validated in real-world applications
- [ ] Major community feedback addressed
