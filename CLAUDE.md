# Dunyi Zhou — Academic Homepage

周敦奕的个人学术主页（纯英文），用于海外研究生申请。学术风 + 高级感设计，静态站点，部署于 GitHub Pages。

## Tech Stack

| 项目 | 用途 |
|---|---|
| [Astro](https://astro.build) 7 | 静态站点生成（Node ≥ 22，Windows 原生友好） |
| [Tailwind CSS](https://tailwindcss.com) 4 | 样式（`@tailwindcss/vite` 插件，token 化设计系统） |
| TypeScript | 类型安全（`astro/tsconfigs/strict`） |
| Fontsource（npm 自托管） | Inter（正文）+ Newsreader（衬线标题）+ JetBrains Mono（标注），变体字体，不依赖 Google Fonts CDN |

## Design Reference（参考的开源项目）

- **[alshedivat/al-folio](https://github.com/alshedivat/al-folio)**（16k+ ★，MIT）— 主要参考。参考站 chengle-fan.github.io 即此主题。借用的设计语言：About/Projects/Publications/CV 页面结构、首页大幅人像 intro、eyebrow 领域词、section kicker、论文条目列表（年份栏 + 标题 + 作者 + 链接徽章）、news 时间线、暗色/亮色切换、滚动进度条、contact strip。
- **[academicpages/academicpages.github.io](https://github.com/academicpages/academicpages.github.io)**（17k+ ★）— 内容组织参考（Markdown 数据驱动、内容与代码分离）。
- **[mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)** — Jekyll 老牌主题，排版细节参考。
- 技术栈参考：[withastro/astro](https://github.com/withastro/astro)、[tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)。

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server (hot reload)
npm run build        # production build → dist/
npm run preview      # preview the production build
```

## Directory Structure

```
├── astro.config.mjs            # site URL + base path（部署前必须改，见下）
├── .github/workflows/deploy.yml# GitHub Pages 自动部署
├── public/                     # 静态资源：favicon.svg、cv.pdf（待放）、照片（待放）
└── src/
    ├── data/profile.ts         # ★ 个人信息单一数据源（姓名/邮箱/简介/教育/兴趣/技能/奖项）
    ├── content.config.ts       # ★ Content Collections schema（内容文件的字段定义）
    ├── content/                # ★ 内容库 —— 增删内容只改这里，不动代码
    │   ├── publications/*.md   #   论文（每篇一个文件）
    │   ├── projects/*.md       #   研究项目（featured: true 会出现在首页）
    │   ├── news/*.md           #   动态时间线
    │   └── experience/*.md     #   实习/工作经历（CV 页 + 正文 Markdown）
    ├── layouts/BaseLayout.astro# 全局框架：SEO/字体/主题初始化脚本/Nav/Footer
    ├── components/             # Nav, Footer, ThemeToggle, ScrollProgress,
    │                           #   SectionHeading, ProjectCard, PublicationItem,
    │                           #   NewsList, Portrait
    ├── pages/                  # 路由：index(About) / research/ / publications / cv / news
    └── styles/global.css       # ★ 设计 token（颜色/字体/暗色模式）+ 组件类（.btn/.card/.kicker…）
```

## 如何新增内容

**论文**：在 `src/content/publications/` 新建 `xxx.md`，frontmatter：`title / authors（第一位加粗显示）/ venue / venueAbbr / year / status / summary / links[]`。自动出现在 Publications 页。

**项目**：在 `src/content/projects/` 新建 `yyy.md`，frontmatter：`title / tag / status / start / end / summary / featured / links[]`，正文为 Markdown。自动生成 `/projects/yyy/` 详情页。

**新闻**：在 `src/content/news/` 新建 `YYYY-MM-DD-xxx.md`，frontmatter：`date / text / link?`。

**经历**：在 `src/content/experience/` 新建文件，frontmatter：`role / org / start / end`，正文为项目符号。

**个人资料**（姓名、邮箱、教育、兴趣、技能、奖项、羽毛球荣誉、IELTS）：改 `src/data/profile.ts`。

改完 frontmatter 字段结构时需要同步 `src/content.config.ts` 的 zod schema。

## Design System（改外观从这里入手）

全部视觉 token 集中在 `src/styles/global.css`：

- **颜色**：`:root` 亮色 / `[data-theme="dark"]` 暗色 两组 CSS 变量（`--bg / --surface / --ink / --ink2 / --line / --accent / --accent-strong / --accent-soft`）。强调色 = 深皇家蓝（亮色 `#1e40af`，暗色 `#8fa8f0`）。换主题色只需改这两个 `--accent`。
- **字体**：`--font-sans`（Inter Variable）/ `--font-serif`（Newsreader Variable）/ `--font-mono`（JetBrains Mono Variable），npm 包 `@fontsource-variable/*` 自托管，`BaseLayout.astro` 中 import（无需外网 CDN，国内访问也正常）。
- **复用类**：`.kicker`（眉标小字）、`.display`（衬线标题）、`.btn-solid` / `.btn-outline`、`.card`、`.link-underline`、`.prose-body`（Markdown 正文）。
- **暗色模式**：`data-theme` 属性驱动；`BaseLayout` 内联脚本首帧前初始化（系统偏好 + localStorage），`@custom-variant dark` 使 `dark:` 工具类跟随该属性。

## Deployment（GitHub Pages）

1. 改 `astro.config.mjs` 的 `site` 为真实地址；用户站仓库（`<username>.github.io`）`base: '/'`，项目站仓库则 `base: '/<repo>/'`。
2. GitHub 建仓库 → `git init && git add -A && git commit && git remote add origin … && git push -u origin main`。
3. Settings → Pages → Source 选 **GitHub Actions**（workflow 已就绪，push 自动构建发布）。
4. 首次部署后访问 `https://<username>.github.io`。

## TODO（内容待补）

- [x] **项目页配图**：Fig. 1–5 全部就位（`public/projects/lpa-moe/`）
- [ ] `public/portrait.jpg` 放正式照片，并把 `src/data/profile.ts` 的 `photo` 设为 `'/portrait.jpg'`
- [ ] `public/cv.pdf` 放简历 PDF（CV 页下载按钮指向它）
- [ ] 论文摘要（`summary`）与项目页正文为基于 CV 的草稿，请核对措辞
- [ ] 页脚引语（Galileo）可换成自己的座右铭
- [ ] 部署前替换 `site.url` 与 `profile.ts` 顶部 TODO 标注的 URL
