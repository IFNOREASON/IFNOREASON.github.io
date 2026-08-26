---
title: HTML 基础
description: 语义化标签、文档结构与表单
---

# HTML 基础

HTML（HyperText Markup Language）是网页的结构语言，它决定了页面上"有什么"。

## 文档基本结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>页面标题</title>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

- `<!DOCTYPE html>` 声明文档类型，触发标准模式
- `<head>` 存放元信息（编码、视口、标题、样式引用）
- `<body>` 存放用户可见的内容

## 语义化标签

语义化让页面结构"自解释"，对 SEO 和无障碍更友好：

| 标签 | 含义 | 使用场景 |
| --- | --- | --- |
| `<header>` | 页头 | 导航、Logo、标题区 |
| `<nav>` | 导航 | 主导航链接集合 |
| `<main>` | 主体 | 页面唯一主内容 |
| `<section>` | 分区 | 按主题划分的内容块 |
| `<article>` | 文章 | 可独立分发的内容 |
| `<aside>` | 侧栏 | 补充说明、广告 |
| `<footer>` | 页脚 | 版权、联系方式 |

::: tip 经验
能用语义标签表达的，就不要用无意义的 `<div>` 套娃。
:::

## 常用表单控件

```html
<form action="/submit" method="post">
  <label for="username">用户名</label>
  <input type="text" id="username" name="username" required>

  <label for="email">邮箱</label>
  <input type="email" id="email" name="email">

  <label for="level">难度</label>
  <select id="level" name="level">
    <option value="beginner">入门</option>
    <option value="advanced">进阶</option>
  </select>

  <button type="submit">提交</button>
</form>
```

要点：

- `label` 的 `for` 与控件的 `id` 关联，点击标签可聚焦控件
- 根据输入类型选择合适的 `type`（`email`、`number`、`password` 等），浏览器会提供原生校验与键盘
- `required` 声明必填，前端兜底校验

## 资源推荐

- [MDN HTML 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML) — 权威参考
