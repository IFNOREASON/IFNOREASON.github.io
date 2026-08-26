---
title: JavaScript 核心
description: 语言基础、异步编程与 DOM 操作
---

# JavaScript 核心

JavaScript 为网页带来"交互"。本站的门户星图、搜索筛选、假登录都由它实现。

## 变量与数据类型

```js
const name = 'Sagittarius'; // 常量，优先使用
let count = 0;              // 可变变量
count += 1;

// 常见类型：string / number / boolean / null / undefined / object / array
const user = { username: 'admin', role: 'admin' };
const tags = ['前端', '工具', '教程'];
```

## 函数

```js
// 函数声明
function formatDate(dateStr) { ... }

// 箭头函数（常用于回调与工具函数）
const double = (n) => n * 2;
```

## 异步编程

`async/await` 是当前最主流的异步写法：

```js
async function loadDocs() {
  try {
    const res = await fetch('/api/content/documents');
    const data = await res.json();
    return data.documents;
  } catch (err) {
    console.error('加载失败：', err);
    return [];
  }
}
```

要点：

- `await` 只能在 `async` 函数内使用
- 多个互不依赖的请求用 `Promise.all` 并发执行

```js
const [cats, docs] = await Promise.all([
  fetch('/api/categories').then((r) => r.json()),
  fetch('/api/documents').then((r) => r.json()),
]);
```

## DOM 操作

```js
// 查找
const grid = document.getElementById('docGrid');
const cards = document.querySelectorAll('.doc-card');

// 修改
grid.innerHTML = '<div class="empty-state">暂无内容</div>';

// 事件
document.getElementById('searchInput')
  .addEventListener('input', (e) => handleSearch(e.target.value));
```

::: warning 安全提醒
用 `textContent` 或转义函数（如 `escapeHtml`）插入用户输入，防止 XSS 注入。
:::

## 现代特性速览

| 特性 | 示例 | 说明 |
| --- | --- | --- |
| 解构赋值 | `const { username } = user` | 从对象/数组取值 |
| 模板字符串 | `` `你好，${name}` `` | 字符串拼接 |
| 可选链 | `user?.address?.city` | 安全访问嵌套属性 |
| 展开运算 | `[...arr1, ...arr2]` | 合并数组/对象 |

## 资源推荐

- [MDN JavaScript 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://zh.javascript.info/) — 系统性教程
