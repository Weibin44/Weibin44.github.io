# 个人网站维护说明

当前保留 al-folio 原版英文页面结构及布局，每类示例最多保留两项，包括 News、Latest Posts、Selected Publications 和完整示例页面。演示人物、论文、项目、社交账号和简历均是模板示例，供你逐项替换，不是你的真实资料。你已填写的姓名和网址保留在 `_config.yml`。

本站已恢复原版配色：浅色模式为紫色，深色模式为青蓝色；没有本地样式覆盖。导航增加了一个本地模板覆盖，以支持 CV 直接下载。Docker、本地脚本与 GitHub Pages 发布流程沿用之前的配置。远程文章自动导入仍关闭，本地博客仅保留文字排版和图片两篇示例。

## 1. VS Code 远程预览

在服务器终端运行：

```bash
cd /home/weibin/websites/personal
bash scripts/preview.sh
```

VS Code Remote SSH 连接服务器后，在底部 **Ports / 端口** 面板点击 **Forward a Port / 转发端口**，输入 `8088`，点击该行的浏览器图标打开。一般地址是 http://localhost:8088 ，若 VS Code 分配了其他本地端口，以面板为准。

- 首次启动/恢复大量示例内容后，等待 `docker compose logs -f` 中出现 `Server running`。
- Markdown 修改后自动构建，刷新浏览器查看；修改 `_config.yml` 后执行 `docker compose restart jekyll`。
- 需要 LiveReload 自动刷新时，可额外转发 `35729` 到相同的本地端口。
- 停止预览：`docker compose down`。
- 生产构建：`bash scripts/build.sh`，输出到 `_site/`；不要编辑生成文件。

也可以在**自己电脑**的终端建立 SSH 隧道：

```bash
ssh -N -L 8088:127.0.0.1:8088 your-user@your-server
```

替换服务器登录信息后保持终端打开，访问 http://localhost:8088 。电脑端口已被占用时，将第一个 `8088` 改为 `18088`，然后访问 http://localhost:18088 。无需开放服务器公网端口。

## 2. 各组件在哪里修改

| 组件                   | 修改位置                                               | 说明                                                     |
| ---------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| 姓名、网址、语言、页脚 | `_config.yml`                                          | 当前姓名和网址已保留你的设置                             |
| 首页简介与布局开关     | `_pages/about.md`                                      | `profile.social` 控制照片下的社交图标；示例地址已注释    |
| 头像                   | `assets/img/prof_pic.jpg`                              | 或修改首页的 `profile.image`                             |
| News 动态              | `_news/`                                               | 一条动态一个 Markdown，按 date 排序                      |
| 首页动态显示           | 首页的 `announcements`                                 | `enabled`、`limit`、`scrollable`                         |
| Latest Posts           | `_posts/`                                              | 文件名为 `YYYY-MM-DD-title.md`                           |
| 首页最新文章显示       | 首页的 `latest_posts`                                  | 原版已启用                                               |
| Selected Publications  | `_bibliography/papers.bib`                             | 条目设 `selected = {true}`，首页 `selected_papers: true` |
| 完整论文列表           | `_pages/publications.md` 与 `_bibliography/papers.bib` | 保留原版搜索与分组功能                                   |
| Projects               | `_projects/` 与 `_pages/projects.md`                   | 原版项目卡片、分类与详情示例                             |
| CV                     | `_data/cv.yml` 与 `_pages/cv.md`                       | 当前恢复的是模板示例简历                                 |
| 简历 PDF               | `assets/pdf/`                                          | 下载路径在 `_pages/cv.md` 的 `cv_pdf` 中                 |
| 邮箱与社交账号         | `_data/socials.yml`                                    | 当前启用 GitHub 和 Scholar，其余示例账号已注释           |
| Repositories           | `_data/repositories.yml`                               | 填写自己的 GitHub 用户名与仓库                           |
| Teaching               | `_teachings/` 与 `_pages/teaching.md`                  | 保留原版示例                                             |
| Books                  | `_books/` 与 `_pages/books.md`                         | 保留原版示例                                             |
| People                 | `_pages/profiles.md`                                   | 保留原版示例                                             |
| 导航文字与顺序         | `_pages/*.md`                                          | 页首 `title`、`nav`、`nav_order`                         |
| Dropdown 导航          | `_pages/dropdown.md`                                   | 原版下拉导航                                             |
| 强调色                 | `assets/css/main.scss`                                 | 下方说明浅色、深色模式的颜色                             |

## 3. 添加 News

复制 `_news/` 中的一条动态，使用不同文件名并修改日期、正文。例如：

```markdown
---
layout: post
date: 2026-09-28 09:00:00-0400
inline: true
related_posts: false
---

Add your actual update here.
```

`inline: true` 会在首页直接展示正文；较长的动态可参考原版 `inline: false` 的示例，使用标题链接到详情页。

## 4. 论文、项目和简历

- 论文：直接在 `_bibliography/papers.bib` 增删 BibTeX 条目。标题点击后打开该条目的 `html` 链接，悬停显示下划线；页面不显示单独的 HTML/PDF 按钮。`pdf` 可保留在条目中，指向 `assets/pdf/` 中的文件或完整 URL；`preview` 对应 `assets/img/publication_preview/` 中的图片；`code` 是代码链接。此显示方式由本站的 `_layouts/bib.liquid` 覆盖实现，主题升级后可用 `al-folio upgrade overrides audit` 检查。
- 代码状态：在论文条目中使用 `code = {https://github.com/...}` 显示可点击的 Code；准备开源时使用 `code_coming_soon = {true}` 显示不可点击的 “Code coming soon”。发布代码后删除 `code_coming_soon` 并填写 `code`。
- 精选论文：设置 `selected = {true}` 即可在首页展示。
- 作者高亮：修改 `_config.yml` 的 `scholar.first_name`、`scholar.last_name`。
- 项目：复制 `_projects/` 中喜欢的示例，修改标题、简介、`img`、`importance`、`category` 和正文；分类须与项目列表的 `display_categories` 一致。
- 项目正文需要显示 PDF 首页时，写 `{% include pdf_preview.liquid path="/assets/img/projects/LLMs/pace-rag.pdf" caption="PACE-RAG overview." width="600px" %}`，替换 PDF 路径和说明即可。预览图由浏览器直接从 PDF 渲染，无需另外维护 PNG；点击图可打开原文件，caption 显示在图下方。`width` 可省略，默认 600px。
- Project 和 Blog 的详情页正文宽度设为 780px，位于 `_config.yml` 的 `defaults`（分别对应 `projects` 和 `posts`）。修改数值后运行 `docker compose restart jekyll`；列表页宽度不受影响。
- 项目末尾只显示 BibTeX：在 `_bibliography/papers.bib` 中维护论文条目，在项目正文末尾加入 `## BibTeX`、`{% nocite cai2026less %}` 和 `{% bibliography --cited --group_by none --template bibtex_only %}`，将示例键替换为自己的论文键。`_layouts/bibtex_only.liquid` 负责从同一条目生成可复制的代码块。`_projects/pace_rag.md` 是示例；Moment-guided 项目及两篇博客示例目前没有对应论文，因此暂不添加引用。
- 简历：现在导航栏 CV 直接下载 PDF。把自己的文件上传为 `assets/pdf/cv.pdf`，将 `_data/socials.yml` 中 `cv_pdf` 改为 `/assets/pdf/cv.pdf`。目前指向模板的 `example_pdf.pdf`，尚不是你的简历。`_data/cv.yml` 保留备用，修改它不会改变 PDF。旧 `/cv/` 地址自动跳转到同一个 PDF。
- Markdown 文件最上方 `---` 之间是 YAML 配置，用空格缩进；其余部分为正文。
- `docs/content-templates/` 中的简化复制模板仍可使用，但页面当前采用官方原版示例。

## 5. 导航来源与示例数量

导航由主题遍历 `site.pages` 自动生成。`_config.yml` 的 `include: ["_pages"]` 让 Jekyll 读取页面目录；页首 `nav: true` 的页面加入导航，按 `nav_order` 排序。

以 Teaching 为例：

```yaml
# _pages/teaching.md 的页首配置
layout: page
permalink: /teaching/
title: teaching
nav: true
nav_order: 6
```

- 修改 `title`：修改导航名称。
- 修改 `nav_order`：修改导航顺序。
- 改为 `nav: false`：只从导航隐藏，页面仍存在。
- `_config.yml` 的 `collections.teachings.output: true`：注册课程集合并生成课程详情。
- `_pages/teaching.md` 的 `{% include courses.liquid %}`：渲染 `_teachings/` 中的课程。
- 原版教学日历由同页的 `calendar.liquid` 引入，可在该行配置自己的日历 ID。

当前示例数量：News 2、博客 2、项目 2（work / fun 各 1）、论文 2、课程 2、People 2、GitHub 用户 2、仓库 2。Books 原本只有 1 项，保持不变；CV 各分组最多 2 条。论文保留了项目引用需要的条目，避免断开的引用。

配色已恢复主题默认值，原藏蓝色覆盖文件及其追踪记录已移除。

## 6. Git 与发布

本地仓库已建立，主分支为 `main`。本次示例精简和配色恢复修改暂未自动提交，方便你先预览。

```bash
git status
git diff
git add .
git commit -m "Trim examples and restore original palette"
```

首次发布时，在 GitHub 创建自己的空公开仓库（例如 `Weibin44.github.io`），确认 `_config.yml` 中 `url` 正确、个人主页 `baseurl: ""`，再关联自己的仓库：

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

在 GitHub 仓库的 `Settings → Pages → Build and deployment` 中，将 Source 设为 `GitHub Actions`。首次 push 到 `main` 后，等待 `Deploy personal website` 工作流完成；之后更新 `main` 并 push 会自动发布。

发布前逐项替换模板的示例身份、论文、简历和账号。默认 GitHub Pages 域名和公开仓库可以免费托管。

## 7. CV 直接下载

唯一的 PDF 路径配置位于 `_data/socials.yml`：

```yaml
cv_pdf: /assets/pdf/cv.pdf
```

请先上传真实的 `assets/pdf/cv.pdf` 再改路径；当前示例 PDF 仅用于验证功能。以后更新简历时，覆盖同名 PDF 即可。导航 CV 带有 `download` 属性，同站点 PDF 会触发浏览器下载；首页 CV 图标使用相同路径，点击可打开 PDF。

`_pages/cv.md` 现在只保存导航信息和旧地址跳转，不再渲染网页简历。本地 `_includes/header.liquid` 仅为 `download_cv: true` 的导航项设置 PDF 地址及下载属性，其他导航保持原版逻辑。覆盖版本记录在 `.al-folio-overrides.yml`，以后升级主题时需要检查。
