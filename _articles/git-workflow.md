---
title: "Git Workflow for Teams"
description: "A practical guide to branching strategy, commit conventions, and pull request etiquette for collaborative teams."
emoji: "🔀"
tags: [git, best-practices, workflow]
difficulty: intermediate
status: published
date: 2024-01-18
author: "KB Team"
related:
  - writing-articles
---

Good Git hygiene reduces friction for the whole team. This guide covers the workflow conventions we use.

## Branching Strategy

We use a simplified trunk-based workflow:

- `main` — always deployable; protected branch
- `feature/<short-description>` — for new features
- `fix/<short-description>` — for bug fixes
- `docs/<short-description>` — for documentation only

```bash
# Start a new feature
git checkout main
git pull origin main
git checkout -b feature/add-dark-mode
```

<div class="callout callout-note" markdown="1">
**📝 Note**

Branch names are lowercase with hyphens. Keep them short but descriptive enough that a stranger can understand the intent.
</div>

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```
<type>(<scope>): <short summary>

[optional body]
```

**Common types:**

| Type     | When to use                       |
|----------|-----------------------------------|
| `feat`   | New feature or capability         |
| `fix`    | Bug fix                           |
| `docs`   | Documentation only                |
| `chore`  | Build, deps, tooling              |
| `test`   | Adding or updating tests          |
| `refactor` | Code change with no behavior change |

**Examples:**

```
feat(auth): add SAML SSO support
fix(api): handle null response from /users endpoint
docs: update Git workflow guide with rebase instructions
chore(deps): bump requests from 2.28 to 2.31
```

## Pull Requests

Keep PRs small and focused — one logical change per PR. Giant PRs are harder to review and more likely to introduce bugs.

```bash
# Push your branch and open a PR
git push -u origin feature/add-dark-mode
gh pr create --fill
```

**PR checklist:**

- [ ] Branch is up to date with `main`
- [ ] Tests pass locally
- [ ] PR description explains *why*, not just *what*
- [ ] Related issues are linked

<div class="callout callout-tip" markdown="1">
**💡 Tip**

Use `gh pr create --draft` to open a PR before it's ready for review. This signals work-in-progress and lets you get early feedback.
</div>

## Keeping Your Branch Up to Date

Prefer `rebase` over `merge` for keeping feature branches current — it produces a cleaner history:

```bash
git fetch origin
git rebase origin/main
```

If you hit conflicts:

```bash
# Resolve conflicts in your editor, then:
git add <resolved-files>
git rebase --continue
```

<div class="callout callout-warn" markdown="1">
**⚠️ Warning**

Never force-push to `main` or any shared branch. Only force-push to your own feature branches, and only when you're sure no one else is working on them.
</div>

## Undoing Mistakes

```bash
# Undo the last commit (keep changes staged)
git reset --soft HEAD~1

# Undo a specific commit already pushed (safe — creates a new commit)
git revert <commit-sha>

# Discard all local changes (irreversible!)
git restore .
```

<div class="callout callout-danger" markdown="1">
**🚨 Danger**

`git restore .` and `git reset --hard` permanently discard uncommitted changes. There is no undo. Make sure you don't need those changes before running them.
</div>
