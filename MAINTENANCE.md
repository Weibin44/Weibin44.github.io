# 个人网站维护说明

网站基于 al-folio v1，保留首页、科研成果、项目、简历四个栏目。当前所有个人信息都明确标为待补充；没有编造论文、职位或经历。网站页面、项目模板及 README 使用英文；本文件是独立的中文操作说明。

## 1. 先打开网站

在本目录运行（需要 Docker 和 Docker Compose）：

```bash
bash scripts/preview.sh
```

打开 http://localhost:8088 。首次启动需要下载镜像和依赖，请通过 `docker compose logs -f` 查看进度；出现 `Server running` 后即可访问。按 Ctrl+C 退出日志不会停止网站。

- 停止预览：`docker compose down`
- 修改 `_config.yml` 后：`docker compose restart jekyll`
- 修改 Markdown、图片、数据文件后：等待自动构建，再刷新浏览器。
- 生产构建：`bash scripts/build.sh`，生成的 `_site/` 是发布产物，不要直接编辑。
- 如果在远程服务器使用本目录，需要将服务器的 8088 端口转发到电脑，例如 VS Code 的 Ports 面板。预览只绑定服务器的 127.0.0.1。

## 2. 组件与文件对照

| 组件                 | 内容                                   | 修改位置                                         |
| -------------------- | -------------------------------------- | ------------------------------------------------ |
| 网站名称与浏览器标题 | 姓名、介绍、站点网址、语言             | `_config.yml`                                    |
| 顶部导航             | 栏目名称、显示开关、顺序               | `_pages/*.md` 开头的 `title`、`nav`、`nav_order` |
| 首页介绍             | 简介、研究兴趣、代表工作入口、合作意向 | `_pages/about.md`                                |
| 首页头像             | 目前是中性的 SVG 占位                  | 图片放 `assets/img/`，修改首页的 `profile.image` |
| 联系方式与社交图标   | 邮箱、GitHub、Scholar、ORCID、LinkedIn | `_data/socials.yml`                              |
| 首页联系方式说明     | 图标旁的简短说明                       | `_config.yml` 的 `contact_note`                  |
| 科研成果列表         | 按年份组织的论文信息                   | `_bibliography/papers.bib`                       |
| 科研成果页文案       | 标题、说明、空状态                     | `_pages/publications.md`                         |
| 项目列表             | 自动收集项目详情并生成卡片             | `_pages/projects.md`                             |
| 每个项目             | 标题、简介、封面、贡献、成果           | `_projects/` 中一项目一个 `.md`                  |
| 简历内容             | 教育、经历、技能、语言                 | `_data/cv.yml`                                   |
| 简历页面设置         | 标题、说明、PDF 下载按钮               | `_pages/cv.md`                                   |
| PDF 与附件           | 简历、论文、海报等                     | `assets/pdf/`                                    |
| 论文缩略图           | 论文卡片的配图                         | `assets/img/publication_preview/`，需要时创建    |
| 网站页脚             | 技术署名或自己的简短文字               | `_config.yml` 的 `footer_text`                   |
| 明暗模式、页面宽度   | 原生 al-folio 功能                     | `_config.yml` 的 `enable_darkmode`、`max_width`  |
| 找不到页面           | 404 文案与返回链接                     | `_pages/404.md`                                  |
| 自动发布             | 推送 main 后构建和更新 gh-pages        | `.github/workflows/deploy.yml`                   |

多数 Markdown 文件开头的两行 `---` 之间是 YAML 配置，后面才是正文。YAML 用空格缩进，不要用 Tab；值中含冒号时最好加引号。文件名建议使用小写英文和连字符。

## 3. 推荐填写顺序

1. 在 `_config.yml` 填姓名：可以把中文全名写入 `first_name`，让 `middle_name`、`last_name` 留空。`title: blank` 表示自动使用姓名，不是让标题显示为 blank。
2. 把首页中所有待补充文字替换为自己的介绍；不需要的段落直接删掉。
3. 上传自己的照片，例如 `assets/img/profile.jpg`，把 `_pages/about.md` 的 `image` 改为 `profile.jpg`。
4. 填联系方式。打开 `_data/socials.yml`，**删除末尾的 `{}`**，取消需要字段前面的 `#` 并填写真实值。例如：

   ```yaml
   email: your-real-email@example.com
   github_username: your-github-name
   scholar_userid: your-scholar-id
   ```

   `scholar_userid` 是 Google Scholar 主页 URL 中 `user=` 后的字符串。没有对应账号就保持注释；不要填示例人物的账号。然后修改 `_config.yml` 的 `contact_note`。

5. 填真实论文与项目，删除暂时用不到的占位项目。
6. 填写简历、上传 PDF，并完成站点地址配置。

## 4. 添加一篇论文

在 `_bibliography/papers.bib` 末尾粘贴论文的 BibTeX。可以从出版社、Google Scholar 或文献管理工具导出。每条记录的引用键必须唯一。

`docs/content-templates/paper.bib` 是可复制的结构示例，**不参与网站构建**。先替换为真实信息，再放入正式论文库。

常用字段：

- `title`、`author`、`year`、`journal` 或 `booktitle`：基本文献信息。
- `abstract`：摘要，可展开查看。
- `pdf`：`paper.pdf` 对应 `assets/pdf/paper.pdf`，也可以用完整外部 URL。
- `code`、`html`、`website`：代码、论文网页和项目页面的真实 URL。
- `preview`：缩略图文件名，对应 `assets/img/publication_preview/`。
- `selected = {true}`：标记为精选；同时在 `_pages/about.md` 设置 `selected_papers: true`，即可在首页展示。
- `bibtex_show = {true}`：提供 BibTeX 查看按钮。

没有 PDF、代码或图就省略相应字段，不要留下不存在的链接。自己的姓名高亮规则在 `_config.yml` 的 `scholar.first_name` 和 `scholar.last_name` 中设置，按论文署名填写。

## 5. 添加一个项目

复制 `docs/content-templates/project.md` 到 `_projects/my-project.md`，或直接修改现有的两个占位项目。

```yaml
---
layout: page
title: "真实项目名称"
description: "一句话说清楚问题与结果"
img: assets/img/my-project.jpg
importance: 1
category: research
related_publications: false
---
```

- `importance` 越小排序越靠前。
- `img` 是项目列表封面；上传对应图片。没有图片可以删除这一行。
- `category` 暂不影响分组，当前列表不分类。
- 文件名参与默认页面地址，发布后尽量不要随意更改。
- 正文建议按“背景与问题 → 我的贡献 → 方法与实现 → 结果与局限 → 相关资料”组织。

添加图片可使用模板原生组件：

```liquid
{% include figure.liquid path="assets/img/my-project.jpg" title="图片说明" class="img-fluid rounded" %}
```

站内链接用 `relative_url`，这样将来部署到子路径仍能正常访问：

```liquid
[科研成果]({{ '/publications/' | relative_url }})
```

完成真实项目替换后，删除 `_pages/projects.md` 的 “The following entries are placeholders” 提示。

## 6. 更新简历

网页简历由 `_data/cv.yml` 渲染。保留 `Education`、`Experience`、`Skills` 等英文分组键，内部内容可用中文或英文。不同分组有对应的显示方式；不要随意改字段名称。

- 教育：`institution`、`area`、`studyType`、`highlights`。
- 经历：`company`、`position`、`summary`、`highlights`。
- 时间：需要时添加 `start_date: "2023-09"` 和 `end_date: "present"` 等真实日期。
- 技能：`name` 和 `keywords`。
- 没有的经历直接删除整个条目或分组。

PDF 与网页简历是分别维护的，当前不自动生成 PDF：

1. 将真实简历放到 `assets/pdf/cv.pdf`。
2. 取消 `_pages/cv.md` 中 `cv_pdf: /assets/pdf/cv.pdf` 的注释。
3. 如需首页也显示下载图标，在 `_data/socials.yml` 加上同一行。
4. 删除简历页 description 中的 “Profile details to be added”。

## 7. 发布到 GitHub Pages

自动发布配置已经准备好，但目前没有创建 GitHub 仓库或上传内容。

1. 在自己的 GitHub 账号下创建**空的公开仓库**，命名为 `你的用户名.github.io`。此目录已包含完整模板，不需要再从远端模板创建一份，也不要勾选初始化 README。
2. 修改 `_config.yml`：

   ```yaml
   url: "https://你的用户名.github.io"
   baseurl: ""
   ```

   若使用普通项目仓库（例如 `personal`），则 `url` 不变、`baseurl: "/personal"`。

3. 本地执行 `bash scripts/build.sh`，确认构建成功、占位资料已替换、链接可访问。
4. 首次上传（以下 URL 需要替换为自己的）：

   ```bash
   git init -b main
   git add .
   git commit -m "Create personal website"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git push -u origin main
   ```

5. GitHub 的 Actions 页面查看 `Deploy personal website`。工作流用与本地相同的固定 Docker 镜像构建，并输出到 `gh-pages` 分支。
6. 构建完成后进入 `Settings → Pages`，选择 `Deploy from a branch`，分支选 `gh-pages`、目录选 `/ (root)`。若账号或组织策略禁用了 Actions 写权限，需要允许该工作流写入自己的仓库。
7. 等待 Pages 发布完成，访问自己的网址。源码更新在 `main`，不手工编辑生成的 `gh-pages`。

公开仓库搭配默认 GitHub Pages 域名可以免费使用；域名可之后购买绑定。

## 8. 日常维护与以后扩展

- 改内容 → 本地预览 → `git add` / `git commit` / `git push` → 自动发布。
- 上游来源版本记录在 `TEMPLATE_VERSION`；Ruby 依赖锁在 `Gemfile.lock`；Docker 镜像在 `docker-compose.yml` 固定了摘要。不要在日常内容更新时删除锁文件。
- 保留了 al-folio 自带的插件能力，暂未启用的功能无需配置。外部文章导入、评论、统计与演示站的定时任务已停用或清除。
- 没有新增 `_layouts`、`_includes` 或 `_sass` 的主题覆盖。后续如果要改主题颜色，先阅读 `docs/CUSTOMIZE.md`；v1 的颜色不能通过随便添加一个 `theme_color` 配置生效。
- 如需博客，可新增 `_pages/blog.md` 和 `_posts/YYYY-MM-DD-title.md`；再按官方文档配置分页和归档。当前未显示博客导航。
- `docs/` 保留官方文档；`docs/content-templates/` 放自己的可复制模板。两者都不会发布到网站。
- `_site/`、缓存、`node_modules/` 都在 `.gitignore` 中。

## 9. 上线前需要你补充的资料

- 展示姓名与一句话研究/职业定位。
- 头像、个人简介、研究兴趣。
- 邮箱、GitHub、Scholar 等真实链接。
- 论文 BibTeX、允许公开的 PDF 和论文配图。
- 代表项目：名称、时间、角色、贡献、成果、截图、代码链接。
- 教育与研究/工作经历、技能、PDF 简历。
- GitHub 用户名，以及选择默认域名还是独立域名。

## 10. 远程服务器预览

网站运行在服务器的 `127.0.0.1:8088`。你电脑上的 localhost 默认指向你自己的电脑，需要先做端口转发。

### SSH 转发

先在服务器运行 `bash scripts/preview.sh`。然后在**自己电脑**的终端运行：

```bash
ssh -N -L 8088:127.0.0.1:8088 your-user@your-server
```

把用户名与服务器地址替换为平时 SSH 登录的信息。保持该终端打开，再在电脑浏览器访问 http://localhost:8088 。如果平时使用 SSH 配置别名，例如 `ssh research-server`，直接使用 `ssh -N -L 8088:127.0.0.1:8088 research-server`。非默认 SSH 端口可加 `-p 端口号`。

如果电脑的 8088 已占用，使用 `ssh -N -L 18088:127.0.0.1:8088 your-user@your-server`，随后访问 http://localhost:18088 。这里只改变电脑端口，服务器仍是 8088。

### VS Code Remote SSH

连接服务器后，在底部 Ports（端口）面板选择 Forward a Port（转发端口），输入 `8088`。点击生成的本地地址即可打开网站；如果自动分配了其他本地端口，以面板显示为准。

手动刷新即可看到内容更新。需要 LiveReload 自动刷新时，还需转发 `35729` 到相同的本地端口。修改 `_config.yml` 后仍需 `docker compose restart jekyll`。无需开放服务器公网端口或修改防火墙。
