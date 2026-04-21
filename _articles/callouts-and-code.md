---
title: "Callouts, Code Blocks, and Visual Elements"
description: "A complete reference for every visual component available in knowledge base articles."
emoji: "🎨"
tags: [documentation]
difficulty: beginner
status: published
date: 2024-01-17
author: "KB Team"
related:
  - writing-articles
---

This article demonstrates every visual element you can use in knowledge base articles.

## Callouts

Callouts draw attention to important information. Four semantic types are available:

### Note

Use for supplementary information the reader should be aware of.

<div class="callout callout-note" markdown="1">
**📝 Note**

This is a `callout-note`. Use it for additional context that enriches the main content but isn't critical.
</div>

### Tip

Use for shortcuts, recommendations, and best practices.

<div class="callout callout-tip" markdown="1">
**💡 Tip**

This is a `callout-tip`. Great for productivity advice, shortcuts, and "you might not know this" moments.
</div>

### Warning

Use when the reader could make a mistake or lose data.

<div class="callout callout-warn" markdown="1">
**⚠️ Warning**

This is a `callout-warn`. Reserve for situations where doing the wrong thing has real consequences — data loss, breaking changes, irreversible actions.
</div>

### Danger

Use for security concerns or destructive actions.

<div class="callout callout-danger" markdown="1">
**🚨 Danger**

This is a `callout-danger`. Use sparingly — for security vulnerabilities, data-destroying commands, or anything you'd highlight in red in a production runbook.
</div>

### Quote / Aside

Use for quotations or thematic asides.

<div class="callout callout-quote" markdown="1">
**💬 Quote**

"Make it work, make it right, make it fast." — Kent Beck

A `callout-quote` for highlighting quotes or tangential context.
</div>

## Code Blocks

All fenced code blocks get syntax highlighting and an auto-injected **copy button**.

### Python

```python
import httpx
from typing import Iterator

def stream_lines(url: str) -> Iterator[str]:
    """Yield lines from a streaming HTTP response."""
    with httpx.stream("GET", url) as r:
        for line in r.iter_lines():
            yield line
```

### JavaScript / TypeScript

```typescript
interface Article {
  title: string;
  tags: string[];
  emoji?: string;
}

async function fetchArticles(baseUrl: string): Promise<Article[]> {
  const res = await fetch(`${baseUrl}/api/articles.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

### Bash

```bash
#!/usr/bin/env bash
set -euo pipefail

# Deploy to GitHub Pages via Actions
git config user.name  "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

bundle exec jekyll build --destination _site
echo "Build complete ✓"
```

### SQL

```sql
-- Find articles updated in the last 30 days
SELECT
    a.title,
    a.slug,
    array_agg(t.label ORDER BY t.label) AS tags
FROM articles a
JOIN article_tags at ON at.article_id = a.id
JOIN tags t          ON t.id = at.tag_id
WHERE a.updated_at >= NOW() - INTERVAL '30 days'
GROUP BY a.id, a.title, a.slug
ORDER BY a.updated_at DESC;
```

## Inline Code

Use backticks for inline `code`, `filenames`, `--flags`, and `variable_names`. They render with a subtle brand-colored tint.

## Tables

| Element        | Class              | Purpose                        |
|----------------|--------------------|--------------------------------|
| Note callout   | `callout-note`     | Supplementary info             |
| Tip callout    | `callout-tip`      | Recommendations                |
| Warn callout   | `callout-warn`     | Caution / potential mistakes   |
| Danger callout | `callout-danger`   | Destructive / security         |
| Quote callout  | `callout-quote`    | Quotes and thematic asides     |

## Emoji Usage

Emoji make articles easier to scan. Use them in:
- Article front matter (`emoji: "🔧"`) — shown on cards and the header
- Callout titles (`**💡 Tip**`)
- List items for visual rhythm

Don't overdo it — one or two per section is plenty.
