---
title: VS Code 高效配置
description: 主题、快捷键与常用插件
---

# VS Code 高效配置

Visual Studio Code 是目前最流行的代码编辑器之一，简单配置即可大幅提升效率。

## 视觉与主题

在 `settings.json`（`Ctrl+,` → 右上角文件图标）中配置：

```json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "'Cascadia Code', Consolas, monospace",
  "editor.lineHeight": 1.6,
  "workbench.colorTheme": "One Dark Pro",
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "none"
}
```

## 高频快捷键

| 快捷键 | 功能 |
| --- | --- |
| `Ctrl+P` | 快速打开文件 |
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+Shift+L` | 选中所有匹配项 |
| `Alt+↑/↓` | 上下移动行 |
| `Shift+Alt+F` | 格式化文档 |
| `F2` | 重命名符号 |

## 常用插件

| 插件 | 用途 |
| --- | --- |
| **Prettier** | 代码格式化 |
| **ESLint** | JS/TS 静态检查 |
| **GitLens** | Git 历史与 blame |
| **Path Intellisense** | 路径自动补全 |
| **Live Server** | 静态页面即时预览 |

## 代码片段

自定义代码片段（`Ctrl+Shift+P` → `Snippets: Configure User Snippets`）：

```json
{
  "Console Log": {
    "scope": "javascript,typescript",
    "prefix": "log",
    "body": ["console.log('$1:', $1);$0"],
    "description": "输出带标签的日志"
  }
}
```

## 资源推荐

- [VS Code 官方文档](https://code.visualstudio.com/docs)
