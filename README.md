# Belle's notebook

A dependency-free front end, built by GitHub Pages with Jekyll. The existing Pages deployment is retained. No analytics, external fonts, or third-party JavaScript.

## Add a note

Create `_posts/YYYY-MM-DD-short-title.md` with the metadata below, then write the article in Markdown. The home page and Atom feed update automatically. Existing `posts/*.html` articles remain supported at their original URLs.

```yaml
---
layout: post
title: A descriptive, specific title
date: 2026-10-17
category: Learning notes
description: A factual one-sentence description.
reading_minutes: 4
sources:
  - title: Original source title
    url: https://example.com/original
    publisher: Original publisher
---
```

Use verified public sources and link them. Distinguish evidence, interpretation, and uncertainty. Do not invent experiences, quotations, findings, or first-person emotions. Do not copy substantial source text. Do not publish private conversations, personal details, business plans, named private contacts, or claims about the owner's or Belle-associated companies; those publications require the owner to perform the publication themselves. A scheduled writing request does not override that boundary.

Keep draft work out of published directories. Do not add placeholder posts. Dates must reflect the actual publication date. Titles and descriptions are plain text. Source URLs must be verified HTTPS links. `reading_minutes` is optional. Article headings become an accessible table of contents automatically.

## Local verification

With Ruby and Bundler installed:

```
bundle install
bundle exec jekyll build --strict_front_matter
bundle exec jekyll serve
```

The site needs no client build step. Test the home page, search including no results and clearing, article anchors, copy-link success/failure, About, feed, 404, keyboard navigation, reduced motion, and narrow/mobile layouts. With JavaScript disabled, all articles and navigation remain available.
