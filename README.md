*🚧 Vibe coded with no offer of ongoing maintenence or support, take it and do what you will with it under the MIT license on it*

# KB Template

A Jekyll knowledge base template for communities of practice. Deploy to GitHub Pages in minutes.

**Features:** tag-filtered article grid · copy-code buttons · auto-generated TOC · callout boxes · difficulty badges · responsive design · zero-build-step branding via `_config.yml`

---

## Quick Start

```bash
git clone https://github.com/your-org/kb-template.git my-kb
cd my-kb
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

---

## Branding

Edit the `brand:` section in `_config.yml`:

```yaml
brand:
  logo: "/assets/images/logo.svg"   # leave blank for text logo
  primary: "#6366f1"                # any CSS color
  accent:  "#f59e0b"
  header_dark: false                # true = dark header using primary color
  org_name: "Your Organization"
```

For deeper CSS overrides, add custom properties to `assets/css/main.scss`:

```scss
:root {
  --bg:     #f0f4ff;   # change the page background
  --border: #c7d2fe;
}
```

---

## Writing Articles

Create a file in `_articles/`:

```markdown
---
title: "Your Article Title"
description: "One sentence."
emoji: "🔧"
tags: [git, best-practices]
difficulty: beginner        # beginner | intermediate | advanced
status: published           # published | draft | outdated
date: 2024-01-15
author: "Your Name"
related:
  - other-article-slug
---

Article body in GitHub-flavored Markdown...
```

The filename (without `.md`) becomes the URL: `_articles/my-article.md` → `/my-article/`

### Callout boxes

```html
<div class="callout callout-tip" markdown="1">
**💡 Tip**
Your content here — supports **bold**, `code`, and [links](#).
</div>
```

Types: `callout-note` · `callout-tip` · `callout-warn` · `callout-danger` · `callout-quote`

---

## Tags

Tags are defined in `_data/tags.yml`. After adding or removing tags, run:

```bash
ruby bin/sync-tags
```

This creates/removes the `_tags/*.md` stub files that Jekyll needs to generate individual tag pages at `/tags/<name>/`. Commit both the `_data/tags.yml` change and any new `_tags/` files together.

Tags are defined in `_data/tags.yml`:

```yaml
- name: python          # slug used in article front matter
  label: Python         # display label
  color: "#3776ab"      # pill color (any CSS color)
  emoji: "🐍"
  description: "Python programming language"
```

Any tag used in an article but not in `_data/tags.yml` will still display — just without a color. This lets you use ad-hoc tags freely and promote them to curated tags later.

---

## Standalone (Unlisted) Articles

Set `standalone: true` in an article's front matter to make it accessible only via direct URL. It won't appear in the homepage grid, tag pages, or tag filter bar.

```yaml
standalone: true
```

Good for internal checklists, preview drafts, or supplementary material linked from other articles but not worth indexing on its own.

---

## Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. Push to `main` — the site builds and deploys automatically

For a project site (e.g., `yourorg.github.io/my-kb`), set `baseurl: "/my-kb"` in `_config.yml`.

---

## Project Layout

```
_articles/       ← knowledge base articles (flat, one .md per article)
_data/tags.yml   ← curated tag registry
_layouts/        ← default, home, article
_includes/       ← head, header, footer, article-card, tag-pill
_sass/           ← variables, base, layout, components, syntax
assets/
  css/main.scss  ← entry point; add brand overrides here
  js/kb.js       ← copy-code, TOC, search, tag filter (vanilla JS)
pages/           ← tags index, about
```

---

## License

MIT — see [LICENSE](LICENSE). Use it, fork it, sell it, rebrand it.
