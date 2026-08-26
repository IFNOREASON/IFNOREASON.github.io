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

## 登录说明

当前为**前端假登录**：`docs/public/js/common.js` 中 `MOCK_AUTH: true`，任意账号密码直接进入门户。接入真实后端时改回 `false` 并将 `login.html` 的提交逻辑换回 `API.post('/auth/login', ...)` 即可。
