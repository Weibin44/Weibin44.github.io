# Shared article components

These components belong to this personal site and are available in posts and projects. Their styles live in `assets/css/article-components.css`, loaded by `_includes/header.liquid`. Articles do not need a `_styles` block to use them.

## Author information

Distill pages share the same author and affiliation layout. Affiliations receive more space than author names. Below 1000px, the publication date moves beneath the authors and affiliations. Multiple authors, project view counts, and the existing Last modified field remain supported.

Continue to provide author information through the usual front matter:

```yaml
authors:
  - name: Weibin Cai
    affiliations:
      name: Syracuse University, Data Lab
```

## Publication and modification dates

Keep `date` as the original publication date and update `last_modified_at` when revising an article:

```yaml
date: 2026-10-26
last_modified_at: 2026-10-27
```

Distill posts and projects automatically show **Last modified** beneath **Published** when this field is present. The shared header loads the existing `assets/js/project-last-modified.js` for either collection; there is no need to insert a script into each article. Regular posts already support this field through their standard metadata template.

The blog list and featured cards use `_includes/post_date.liquid`: they show **Last modified** when available and otherwise show **Published**. The legacy `last_updated` field is also supported. Publication dates still determine post URLs, year archives, and list order. Dates are maintained in front matter, not inferred from file modification times.

## Note box

Use the include for a short note:

```liquid
{% include article_note.liquid content="This is a **highlighted note**." %}
```

An optional `title` adds a heading inside the box. For several paragraphs, capture the Markdown first:

```liquid
{% capture note %}
This note supports **bold text**, [links](https://example.com), and math such as $m_2$.

A second paragraph can provide more context.
{% endcapture %}
{% include article_note.liquid title="About this article" content=note %}
```

The box follows the site's light and dark theme colors. Existing `<div class="contribution-note">` blocks still work. The new class name is `article-note`; the include supplies it automatically.

## Wide tables

Wrap a wide Markdown table to keep it within the article and allow horizontal scrolling:

```markdown
<div class="article-table" role="region" aria-label="Results comparison" tabindex="0" markdown="1">

| Method | Score |
| ------ | ----: |
| A      |  0.85 |
| B      |  0.81 |

</div>
```

Normal tables do not need this wrapper. The wrapper uses a minimum table width of 850px for wide comparisons; override it with `style="--article-table-min-width: 600px;"` on the wrapper if needed. The older `contribution-metrics` class remains supported.

## Math

Display equations share the same vertical padding and overflow behavior. Long equations can scroll horizontally. Keep blank lines around each `$$` block so Markdown recognizes it as a display equation.

## Compatibility

- Existing posts and projects keep their front matter and content.
- The author layout applies only to `layout: distill`; regular post author metadata is unchanged.
- Note and table styles apply only to their explicit component classes.
- Page-specific `_styles` remain supported for genuinely unique content.
- `assets/css/distill-title-links.css` continues to handle the optional Paper and GitHub buttons.

When changing shared styles, preview a regular post, a Distill post, and a project with multiple authors at desktop and phone widths. Check both light and dark themes, the project view-count badge, equations, and any wide tables.
