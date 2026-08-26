---
title: 新增文档与模块
description: 文档分类集中管理 · 扩展机制说明
---

# 新增文档与模块

本站的核心理念是**分类集中管理、按需扩展**：新增一篇文档或一个功能模块，都不需要改动站点框架代码。

## 一、新增一篇文档

在任意分类目录下新建一个 Markdown 文件即可，例如 `docs/frontend/react.md`：

```markdown
---
title: React 入门
description: 组件、状态与 Hooks
---

# React 入门

正文内容……
```

约定：

- 文件头部建议写 `title`，会作为侧边栏和导航的显示名；不写则回退为文件名
- `index.md` 是该分类的首页，始终排在侧边栏第一位
- **侧边栏与顶部导航自动更新**，无需修改任何配置

## 二、新增一个分类

1. 在 `docs/` 下新建目录，例如 `docs/ai/`
2. 在目录内创建 `index.md` 和若干文档
3. 如需自定义侧边栏显示名，在 `docs/.vitepress/config.mts` 的 `GROUP_LABELS` 中加一行映射：

```ts
const GROUP_LABELS = {
  // ...
  ai: '人工智能',
}
```

> 未映射的目录会直接用目录名作为分组标题，所以**不加配置也能用**。

## 三、新增一个功能模块（页面）

功能模块是独立 HTML 页面，放入 `docs/public/` 即可随构建发布：

1. 将页面文件放入 `docs/public/`（如 `docs/public/tools.html`）
2. 页面中通过 `/css/style.css`、`/js/common.js` 引用现有样式与工具函数，保持视觉一致
3. 其他页面通过 `/tools.html` 链接访问

如需在顶部导航加入口，修改 `docs/.vitepress/config.mts` 中的 `nav` 数组：

```ts
const nav = [
  // ...
  { text: '工具页', link: '/tools.html' },
]
```

## 四、切换真实登录（当前为假登录）

当前登录不调用后端接口，直接写入本地 token 跳转。恢复真实登录需两步：

1. `docs/public/js/common.js` 中 `MOCK_AUTH` 置为 `false`
2. `docs/public/login.html` 的提交逻辑改回 `API.post('/auth/login', ...)`

## 五、常用配置速查

| 需求 | 位置 |
| --- | --- |
| 站点标题 / 描述 | `docs/.vitepress/config.mts` |
| 顶部导航 | 同上，`nav` 数组 |
| 侧边栏分组名映射 | 同上，`GROUP_LABELS` |
| 全局主题样式 | `docs/.vitepress/theme/style.css` |
| 首页视觉 | `docs/.vitepress/theme/components/HomePage.vue` |
| 功能页面资源 | `docs/public/` |
