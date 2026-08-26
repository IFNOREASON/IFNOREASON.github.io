---
title: RESTful API 设计
description: 资源、HTTP 方法、状态码与接口版本化
---

# RESTful API 设计

REST 以"资源"为中心，用 HTTP 方法表达操作，用状态码表达结果。本站原有接口（`/api/auth/*`、`/api/content/*`、`/api/admin/*`）即按此风格设计。

## 资源与 URL

URL 只描述**资源**，不描述动作：

| 操作 | 方法 + URL | 说明 |
| --- | --- | --- |
| 列表 | `GET /api/content/documents` | 获取文档列表 |
| 详情 | `GET /api/content/documents/:id` | 获取单篇文档 |
| 新建 | `POST /api/admin/documents` | 创建文档 |
| 更新 | `PUT /api/admin/documents/:id` | 整体更新 |
| 删除 | `DELETE /api/admin/documents/:id` | 删除文档 |

## HTTP 方法语义

| 方法 | 语义 | 是否幂等 |
| --- | --- | --- |
| GET | 读取 | 是 |
| POST | 创建 | 否 |
| PUT | 整体替换 | 是 |
| PATCH | 局部更新 | 是 |
| DELETE | 删除 | 是 |

## 状态码

| 状态码 | 含义 | 典型场景 |
| --- | --- | --- |
| 200 | 成功 | GET / PUT 成功 |
| 201 | 已创建 | POST 成功 |
| 204 | 无内容 | DELETE 成功 |
| 400 | 参数错误 | 校验失败 |
| 401 | 未认证 | token 缺失或无效 |
| 403 | 无权限 | 非管理员访问管理接口 |
| 404 | 不存在 | 资源 ID 错误 |
| 500 | 服务器错误 | 未捕获异常 |

## 统一响应结构

建议所有接口返回统一结构，前端好解析：

```json
{
  "data": { ... },
  "error": null
}
```

或采用列表封装：

```json
{
  "documents": [...],
  "total": 42
}
```

::: tip 错误信息
错误时返回 `{ "error": "人类可读的错误信息" }`，前端直接展示给用户（本项目即如此约定）。
:::

## 鉴权：Bearer Token

```http
GET /api/admin/documents HTTP/1.1
Authorization: Bearer <token>
```

前端在 `common.js` 中统一注入：

```js
const token = API.getToken();
if (token) headers['Authorization'] = `Bearer ${token}`;
```

## 接口版本化

路径前缀中携带版本号，向后兼容：

```text
/api/v1/content/documents
/api/v2/content/documents
```

## 分页与过滤

列表接口建议支持分页与过滤参数：

```text
GET /api/content/documents?page=2&pageSize=20&category=frontend&q=keyword
```

返回示例：

```json
{
  "documents": [...],
  "page": 2,
  "pageSize": 20,
  "total": 156
}
```

## 资源推荐

- [MDN HTTP 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
