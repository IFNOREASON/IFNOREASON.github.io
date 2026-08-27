---
title: 学习路线
description: AI应用开发从0-1学习路线
---

# AI 应用开发从 0 到 1 学习计划

目标：从基础编程、Web 全栈、模型 API、RAG、向量数据库、Agent，到 AI 工程化落地，逐步掌握完整 AI 应用开发能力。

推荐主技术栈：

`Python + FastAPI + TypeScript/React/Next.js + PostgreSQL + Redis + Milvus/Qdrant + Docker + LangChain/LlamaIndex + OpenAI/通义/智谱/Azure OpenAI`

---

## 总体路线

1. 编程与 Web 基础
2. 大模型 API 与 Prompt
3. AI 应用后端
4. RAG 与向量数据库
5. Agent 与工具调用
6. 前端交互与流式响应
7. 评估、监控、安全、部署
8. 企业级工程化落地

---

## 阶段 1：基础能力，2-4 周

目标：能写后端服务、理解 HTTP/API、掌握基础 Python 工程。

### 学习内容

- Python 基础：函数、类、异常、类型标注、虚拟环境
- HTTP / REST / JSON / SSE / WebSocket
- FastAPI：路由、请求体、响应模型、依赖注入、异步
- 数据库：SQL、PostgreSQL、ORM、事务
- Git、环境变量、日志、单元测试

### 官方中文资料

- [FastAPI 中文官方教程](https://fastapi.tiangolo.com/zh/learn/)
- [FastAPI 第一步](https://fastapi.tiangolo.com/zh/tutorial/first-steps/)
- [PyTorch 中文教程](https://docs.pytorch.ac.cn/tutorials/)

### 阶段项目

做一个普通 Web API：

- 用户登录
- 文章 CRUD
- 文件上传
- 数据库存储
- 接口文档

---

## 阶段 2：大模型应用入门，2-3 周

目标：能接入模型 API，做出聊天、总结、分类、结构化输出等基础 AI 功能。

### 学习内容

- LLM 基本概念：Token、上下文窗口、temperature、top_p
- Chat Completions / Responses API
- System / User / Assistant 消息结构
- 流式输出 SSE
- 函数调用 / 工具调用
- 结构化输出 JSON Schema
- Prompt 基础：角色、任务、约束、示例、输出格式
- 多模态：文本、图片、文件输入

### 官方中文资料

- [Azure OpenAI 中文文档](https://learn.microsoft.com/zh-cn/azure/ai-services/openai/how-to/completions)
- [阿里云百炼官方文档](https://www.alibabacloud.com/help/zh/model-studio/)
- [智谱 AI 开放平台快速开始](https://docs.bigmodel.cn/cn/api/introduction)
- [腾讯混元 API 概览](https://cloud.tencent.cn/document/product/1729/101848)
- [百度千帆官方文档](https://aca.bce.baidu.com/doc/qianfan/index.html)
- [提示词工程指南](https://www.promptingguide.ai/zh) 

### 视频资料

- [AI大模型全套教程（入门版本）](https://www.bilibili.com/video/BV1h1VbzHER2/?vd_source=303df5ce9331c9fcf92c870b3283e6a8)

### 阶段项目

做一个 AI 对话后端：

- 支持多轮对话
- 支持流式输出
- 保存聊天历史
- 支持“总结 / 翻译 / 结构化提取”等工具接口

---

## 阶段 3：AI 应用全栈，3-4 周

目标：做出一个真正可用的 AI Chat App。

### 学习内容

- 前端：React / Next.js / TypeScript
- Chat UI：消息列表、输入框、Markdown 渲染、代码高亮
- 流式响应展示
- 文件上传
- 登录态与用户隔离
- 后端任务队列：长任务、重试、超时
- Redis：缓存、限流、会话
- API Key 安全管理

### 推荐实践

- 前端不要直接暴露模型 API Key
- 后端统一封装模型调用
- 所有请求记录 request_id
- 对用户输入、模型输出做日志与审计
- 对超时、限流、内容安全做兜底

### 阶段项目

做一个类 ChatGPT 的 Web 应用：

- 用户登录
- 多会话管理
- 流式回答
- Markdown 渲染
- 文件上传
- 历史记录
- 模型切换
- 用量统计

---

## 阶段 4：Embedding、RAG 与向量数据库，4-5 周

目标：掌握企业知识库问答、文档检索、语义搜索。

### 学习内容

- Embedding 是什么
- 向量相似度：cosine / dot product / L2
- 文档解析：PDF、Word、Markdown、HTML
- Chunk 切分策略：按标题、段落、Token、语义切分
- Metadata 设计
- 向量数据库 Collection / Index / Search
- Top-K 检索
- Hybrid Search：关键词 + 向量
- Rerank 重排序
- RAG 质量优化
- 多轮 RAG
- 引用来源与可追溯回答

### 向量数据库重点

- 本地学习：Chroma / Milvus Lite / Qdrant Docker
- 生产推荐：Milvus、Qdrant、pgvector、Elasticsearch dense vector
- 大规模场景：分片、副本、索引构建、冷热数据、监控

### 官方中文资料

- [Milvus 中文官方文档](https://milvus.io/docs/zh)
- [Qdrant 中文文档](https://qdrant.org.cn/documentation/)
- [Hugging Face的RAG文档,详细介绍了如何实现和应用RAG](https://huggingface.co/docs/transformers/main/en/model_docfrag)
- [基于RAG的知识库管理](https://github.com/rag-web-ui/rag-web-ui)

### 视频资料

- [手把手实现一个Rag](https://www.bilibili.com/video/BV1YaRhY9EqV/?vd_source=303df5ce9331c9fcf92c870b3283e6a8)

### 阶段项目

做一个企业知识库问答系统：

- 上传 PDF / Markdown / Word
- 自动切分
- 生成 Embedding
- 入库 Milvus 或 Qdrant
- 问答时检索 Top-K
- 支持引用来源
- 支持重新索引
- 支持检索结果调试页

---

## 阶段 5：框架：LangChain / LlamaIndex / LangGraph，3-4 周

目标：理解框架能解决什么问题，而不是被框架绑架。

### 学习内容

- Chain / Runnable / Tool / Agent / Retriever
- Memory
- Output Parser
- Tool Calling
- LangGraph 状态机与多步骤工作流
- LlamaIndex 数据连接器、索引、查询引擎
- 框架与原生 SDK 的取舍

### 建议

- 初学先用原生 API 写一遍
- RAG 用 LlamaIndex 或 LangChain 实现一遍
- Agent 编排用 LangGraph 学
- 生产中不要盲目堆框架，核心链路要可控

### 中文资料

- [LangChain 中文文档镜像](https://langchain-doc.cn/)
- [LangChain 中文网概念指南](https://www.langchain.com.cn/docs/concepts/)
- [LlamaIndex 中文组件指南](https://docs.llamaindex.org.cn/en/stable/module_guides/)
- [马士兵全套AI教程](https://www.bilibili.com/video/BV128cUe6EU2/?vd_source=303df5ce9331c9fcf92c870b3283e6a8)

### 阶段项目

做一个 Agent 助手：

- 能查知识库
- 能调用天气 / 数据库 / 内部 API
- 能生成结构化结果
- 能把复杂任务拆成多步
- 每一步有日志和可观察 trace

---

## 阶段 6：AI 工程化落地，4-6 周

目标：从 Demo 走向生产。

### 核心主题

- Prompt 版本管理
- Dataset 构建
- 自动化评估
- RAG 评估：召回率、命中率、引用准确率、幻觉率
- LLM-as-Judge
- A/B Test
- 可观测性：trace、latency、token、cost、error rate
- 缓存：语义缓存、响应缓存、Embedding 缓存
- 限流与熔断
- 内容安全与越权防护
- 多租户隔离
- 权限控制：用户只能检索自己有权限的文档
- 灰度发布
- 回滚策略
- 人工审核 Human-in-the-loop

### 必须掌握的生产问题

- 模型输出不稳定怎么办
- RAG 检索不到怎么办
- 检索到了但答错怎么办
- Prompt 被注入怎么办
- 用户上传恶意文件怎么办
- 成本突然升高怎么办
- 模型供应商不可用怎么办
- 多模型切换如何设计
- 如何评估新模型是否真的更好

### 阶段项目

把前面的知识库问答系统生产化：

- 加评估集
- 加自动化评测脚本
- 加日志与 trace
- 加 token 成本统计
- 加用户权限过滤
- 加 Docker 部署
- 加 CI 测试
- 加异常告警

---

## 阶段 7：高级方向，持续学习

可以按兴趣选择：

- 多模态 RAG：图片、表格、音频、视频
- Graph RAG：知识图谱 + 向量检索
- Long Context 应用设计
- 多 Agent 协作
- MCP 工具生态
- 私有化部署开源模型
- 模型微调 SFT / LoRA
- 推理优化：vLLM、TensorRT-LLM、量化
- AI Coding Agent
- 企业内部 Copilot
- AI Workflow / AI Automation

### 相关资料

- [Hugging Face 中文 LLM/NLP 课程](https://huggingface.co/learn/llm-course/zh-CN/chapter7/8)
- [PyTorch 中文教程](https://docs.pytorch.ac.cn/tutorials/)
- [智谱平台介绍：模型调用、微调、评测、知识库](https://docs.bigmodel.cn/cn/guide/start/introduction)

---

## 推荐 16 周学习节奏

| 周数 | 学习重点 |
|---|---|
| 第 1-2 周 | Python、HTTP、FastAPI、数据库 |
| 第 3-4 周 | LLM API、Prompt、流式输出、结构化输出 |
| 第 5-6 周 | React/Next.js 聊天前端、文件上传、会话管理 |
| 第 7-9 周 | Embedding、RAG、Milvus/Qdrant、文档切分 |
| 第 10-11 周 | LangChain、LlamaIndex、Agent、工具调用 |
| 第 12-13 周 | 评估、日志、监控、成本、权限、安全 |
| 第 14-15 周 | Docker 部署、CI/CD、灰度、异常处理 |
| 第 16 周 | 做一个完整毕业项目并写技术文档 |

---

## 毕业项目建议：企业私有知识库 AI 助手

最终做一个完整的“企业私有知识库 AI 助手”。

### 功能清单

- Web 前端聊天界面
- 后端 FastAPI
- 用户登录
- 文档上传
- 文档解析与切分
- Embedding 入库
- Milvus / Qdrant 检索
- Rerank
- RAG 回答
- 引用来源
- 流式输出
- 对话历史
- 管理后台
- 权限隔离
- 评估集
- 日志与成本统计
- Docker 一键启动

---

## 掌握标准

能完整做完这个项目，你就已经具备 AI 应用开发全栈能力的骨架。

接下来再补：

- 多模态
- Agent
- 私有化部署
- 自动化评估体系
- 成本与性能优化
- 企业权限与安全

就可以继续往 AI 工程化落地方向深入。