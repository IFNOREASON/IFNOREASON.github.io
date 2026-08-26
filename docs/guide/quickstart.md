---
title: 快速上手
description: 本地运行、构建与部署 VitePress 文档站
---

# 快速上手

## 环境要求

- Node.js **18+**（推荐 20+）
- npm / pnpm / yarn 任一包管理器

## 安装依赖

在项目根目录执行：

```bash
npm install
```

## 本地开发

```bash
npm run dev
```

启动后访问 `http://localhost:5173`，修改 Markdown 或主题文件会**热更新**。

## 生产构建

```bash
npm run build
```

构建产物输出到 `docs/.vitepress/dist/`，可直接部署到任意静态托管（GitHub Pages、CloudStudio、Nginx 等）。

本地预览构建结果：

```bash
npm run preview
```

## 功能页面的说明

登录、注册、门户、管理后台等页面位于 `docs/public/`，它们是独立 HTML 页面，构建时会**原样复制**到产物根目录：

- 访问路径与源码路径一致，如 `/portal.html`、`/admin.html`
- 页面样式引用 `/css/style.css` 与 `/js/common.js`，无需额外处理
- 当前登录为**假登录**（不调用后端接口），详见 [新增文档与模块](./add-content) 中的说明
