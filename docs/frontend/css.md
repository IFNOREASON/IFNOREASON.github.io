---
title: CSS 布局与样式
description: 盒模型、Flexbox、Grid 与响应式设计
---

# CSS 布局与样式

CSS（Cascading Style Sheets）负责页面的"长什么样"。本站的深空紫金主题就是一套完整的 CSS 变量 + 组件样式体系。

## 盒模型

每个元素都是一个盒子，由内容（content）、内边距（padding）、边框（border）、外边距（margin）组成：

```css
.box {
  width: 200px;
  padding: 1rem;      /* 内容与边框之间的距离 */
  border: 1px solid #2D1B4E;
  margin: 0 auto;     /* 外边距，auto 可实现水平居中 */
  box-sizing: border-box; /* 推荐：宽高包含 padding 和 border */
}
```

::: tip
全局开启 `box-sizing: border-box` 可避免大量尺寸计算错误。
:::

## Flexbox：一维布局

适合导航栏、按钮组、卡片列表等"一行"或"一列"的布局：

```css
.navbar {
  display: flex;
  align-items: center;      /* 垂直居中 */
  justify-content: space-between; /* 两端对齐 */
  gap: 1rem;                /* 子项间距 */
}
```

## Grid：二维布局

适合整个页面的栅格与卡片网格：

```css
.doc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}
```

`auto-fill` + `minmax()` 让卡片数随容器宽度自动变化，一行代码实现响应式。

## CSS 变量：主题的基础

本站主题把颜色、字体、圆角全部抽成变量（见 `docs/.vitepress/theme/style.css`）：

```css
:root {
  --bg-void:      #060410;
  --primary:      #8B5CF6;
  --accent-gold:  #FBBF24;
}

.card { background: var(--bg-card); }
.btn-gold { background: var(--accent-gold); }
```

改一处变量，全局生效；这也是"不改变现有页面样式"地统一换肤的关键。

## 响应式设计

```css
@media (max-width: 768px) {
  .doc-grid { grid-template-columns: 1fr; }   /* 移动端单列 */
  .navbar .nav-links { display: none; }        /* 隐藏次要导航 */
}
```

建议按 **移动优先** 思路：先写手机样式，再用 `min-width` 断点增强。

## 资源推荐

- [MDN CSS 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [Flexbox Froggy](https://flexboxfroggy.com/) — 游戏化练习
- [Grid Garden](https://cssgridgarden.com/) — Grid 游戏化练习
