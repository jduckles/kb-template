---
title: "Writing and Publishing Articles"
description: "How to write, format, and publish knowledge base articles using front matter, callouts, and code blocks."
emoji: "✍️"
tags: [documentation, onboarding, best-practices]
difficulty: beginner
status: published
date: 2024-01-16
author: "KB Team"
related:
  - getting-started
  - callouts-and-code
---

Articles are plain Markdown files in the `_articles/` folder. They build automatically when pushed to the main branch via GitHub Actions.

## Creating an Article

Create a new file in `_articles/` with a descriptive filename (this becomes the URL slug):

```
_articles/my-topic-name.md
```

Every article starts with a front matter block:

```yaml
---
title: "Your Article Title"
description: "One sentence describing this article."
emoji: "🔧"              # shown on cards and the article header
tags: [git, best-practices]   # use slugs from _data/tags.yml
difficulty: beginner     # beginner | intermediate | advanced
status: published        # published | draft | outdated
date: 2024-01-15
author: "Your Name"      # optional
related:                 # optional: filenames without extension
  - other-article
---
```

## Tags

Tags come from `_data/tags.yml`. Use existing tag slugs where possible — this keeps the taxonomy coherent. To add a new tag, edit `_data/tags.yml` and give it a `name`, `label`, `color`, and `emoji`.

<div class="callout callout-tip" markdown="1">
**💡 Tip**

Keep tags broad enough to be useful across multiple articles. Prefer `git` over `git-rebase` as a tag.
</div>

## Writing the Content

Standard GitHub-flavored Markdown works throughout. A few highlights:

### Headers

Use `##` and `###` for sections — they auto-populate the sidebar table of contents. Avoid `#` headings inside the article body (the title is already `h1`).

### Code blocks

Fenced code blocks with a language identifier get full syntax highlighting and a copy button:

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("world"))
```

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve
```

### Callouts

Wrap content in a `<div>` with a callout class. Use `markdown="1"` to keep Markdown parsing inside:

```html
<div class="callout callout-note" markdown="1">
**📝 Note**

This is a note with **bold** and `inline code` support.
</div>
```

Available types: `callout-note`, `callout-tip`, `callout-warn`, `callout-danger`, `callout-quote`

### Links

Link to other articles by their URL slug:

```markdown
See [Getting Started](/getting-started/) for an overview.
```

## Draft Articles

Set `status: draft` to prevent an article from appearing on the homepage or tag pages while you're working on it. It won't be indexed but is still accessible via direct URL.

<div class="callout callout-warn" markdown="1">
**⚠️ Warning**

Draft articles are not hidden from search engines — they just won't appear in the site's navigation. Don't publish secrets in draft articles.
</div>

## Standalone Articles

Set `standalone: true` to make an article accessible only via its direct URL. It won't appear in the homepage grid, tag pages, or the tag filter bar — it's essentially unlisted.

```yaml
standalone: true
```

Use this for:
- Internal processes or checklists shared with a specific audience
- Draft content you want to preview at its real URL before publishing
- Supplemental material linked from another article but not worth indexing on its own

<div class="callout callout-note" markdown="1">
**📝 Note**

Standalone articles are not password-protected — anyone with the URL can read them. They're simply not discoverable through the site's navigation. Don't put secrets in them.
</div>

## Marking Articles Outdated

Rather than deleting articles, set `status: outdated`. A visual badge will warn readers, and the article will still be findable. Update it when the information becomes current again.

## Publishing

Push your file to the `main` branch. GitHub Actions builds and deploys the site automatically. Changes are usually live within 2–3 minutes.
