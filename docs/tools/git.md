---
title: Git 版本控制
description: 常用命令、分支协作与提交规范
---

# Git 版本控制

Git 是当前最主流的分布式版本控制系统，理解它的核心命令足以覆盖日常开发。

## 本地基础

```bash
git init                 # 初始化仓库
git add .                # 暂存所有改动
git commit -m "feat: 新增文档中心"   # 提交
git status               # 查看工作区状态
git log --oneline        # 查看提交历史
```

## 分支与合并

```bash
git branch feature/login   # 新建分支
git checkout feature/login # 切换分支
git switch feature/login   # 切换（新写法）

git merge feature/login    # 合并到当前分支
git branch -d feature/login # 删除已合并分支
```

## 远程协作

```bash
git remote add origin <url>   # 关联远程仓库
git push -u origin main       # 首次推送
git pull                      # 拉取并合并远端改动
git fetch                     # 仅拉取远端信息
git clone <url>               # 克隆仓库
```

::: tip
推送前先 `git pull`，避免提交被拒绝。
:::

## 提交信息规范（Conventional Commits）

统一的提交前缀让历史可读、可检索：

| 前缀 | 含义 |
| --- | --- |
| `feat:` | 新功能 |
| `fix:` | 修复缺陷 |
| `docs:` | 文档变更 |
| `refactor:` | 重构（不改变行为） |
| `style:` | 格式调整 |
| `chore:` | 构建/工具链变更 |

```bash
git commit -m "docs: 新增 Git 使用文档"
```

## 撤销与回退

```bash
git restore <file>          # 丢弃工作区改动
git restore --staged <file> # 取消暂存
git reset --soft HEAD~1     # 撤销最近一次提交（保留改动）
git revert <commit>         # 生成反向提交（推荐用于已推送的历史）
```

::: warning 注意
`git reset --hard` 会丢弃所有本地改动，不可恢复，谨慎使用。
:::

## 资源推荐

- [Pro Git 中文版](https://git-scm.com/book/zh/v2) — 权威书籍
- [Git 官方文档](https://git-scm.com/doc)
