# Post and project templates

Copy `post.md.example` into `_posts/YYYY-MM-DD-your-title.md`, or copy `project.md.example` into `_projects/your-project.md`, then replace the example fields and text. The existing post and project layouts remain unchanged.

The shared Contents sidebar is generated automatically from `##`, `###`, and `####` headings. It highlights the current section while scrolling and follows the reader on wide screens. Pages with fewer than two section headings do not show an unnecessary sidebar. Set `article_toc: false` in a page's front matter to opt out.

For Distill-specific features such as citations, sidenotes, and interactive figures, use `layout: distill` and follow `_posts/2018-12-22-distill.md`. Its `toc:` list is still maintained in that post's front matter; the shared sidebar code handles the sticky and active-section behavior.

On `layout: distill` pages, optional `paper_url:` and `github:` front-matter fields add Paper and GitHub links below the title description. Omit either field to hide that link.
