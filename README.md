# 射手座学习导航 · Sagittarius Nav

基于 **VitePress** 重构的文档中心 + 功能站点。射手座深空紫金主题，文档按分类集中管理，支持后续文档 / 模块功能持续扩展。

## 目录结构

```
my-site/
├── docs/                      # VitePress 站点根目录
│   ├── index.md               # 首页（复刻原 index.html 视觉）
│   ├── .vitepress/
│   │   ├── config.mts         # 站点配置（自动扫描侧边栏）
│   │   └── theme/             # 主题：星空背景 / 样式 / 首页组件
│   ├── guide/                 # 分类：使用指南
│   ├── frontend/              # 分类：前端开发
│   ├── backend/               # 分类：后端开发
│   ├── tools/                 # 分类：开发工具
│   └── public/                # 功能页面（原样保留，零改动发布）
│       ├── index.html（已移除，由 VitePress 首页替代）
│       ├── login.html / register.html / portal.html
│       ├── document.html / admin.html
│       ├── css/style.css      # 原站射手座紫金主题
│       └── js/common.js       # 含 MOCK_AUTH 假登录开关
├── package.json
└── npm-install.log
```

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 本地开发预览 http://localhost:5173
npm run build        # 构建静态站点 → docs/.vitepress/dist
npm run preview      # 预览构建产物
```

## 如何新增文档

1. 在对应分类目录（`guide/`、`frontend/`、`backend/`、`tools/`）下新建 `.md` 文件
2. 文件头部写 `title` 属性，侧边栏自动按文件名排序展示，**无需改任何配置**
3. 新增分类 = 新建一个一级目录 + 写一个 `index.md`，并在 `config.mts` 的 `GROUP_LABELS` 中登记中文名

## 如何新增功能模块页面

把页面（如 `xxx.html`）连同其资源放入 `docs/public/`，在 `config.mts` 的 `nav` 中加导航入口即可。功能页面走独立 HTML，不经过 VitePress 渲染，样式完全不受影响。

## 发布到 GitHub Pages

仓库里已配好 **GitHub Actions 自动部署**（`.github/workflows/deploy.yml`），push 到 `main` / `master` 分支即自动构建发布，无需手动上传构建产物。

### 首次启用

1. 把项目推送到 GitHub 仓库（用户页仓库名 `你的用户名.github.io`，或普通项目仓库如 `my-site`）
2. 打开仓库 **Settings → Pages**，在 **Build and deployment** 的 **Source** 下拉里选 **GitHub Actions**
3. 回到 **Actions** 页，可手动运行一次 `Deploy VitePress to Pages`，或直接 push 触发
4. 发布地址：
   - 用户页：`https://你的用户名.github.io/`
   - 项目页：`https://你的用户名.github.io/<仓库名>/`

### 子路径（base）说明

- 部署脚本会自动识别仓库形态：用户页用 `base=/`，项目页用 `base=/<仓库名>/`
- `config.mts` 通过 `BASE_PATH` 环境变量读取，本地开发/预览默认 `base=/`，不受影响
- **功能页（login / portal / admin 等）内的链接已全部改为相对路径**，在子路径下也能正常跳转；API 请求（`/admin/...`、`/content/...`、`/auth/...`）仍保留根路径，接入真实后端时按后端部署位置调整

### 本地模拟子路径构建（可选）

```bash
BASE_PATH=/my-site/ pnpm run build   # 产物在 docs/.vitepress/dist，资源引用会带 /my-site/ 前缀
```

## 登录说明

当前为**前端假登录**：`docs/public/js/common.js` 中 `MOCK_AUTH: true`，任意账号密码直接进入门户。接入真实后端时改回 `false` 并将 `login.html` 的提交逻辑换回 `API.post('/auth/login', ...)` 即可。
