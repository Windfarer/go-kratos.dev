---
id: design
title: 设计
---

Kratos v3 是 Go 框架，提供 HTTP/gRPC transport、应用生命周期管理、protobuf 工具链，以及配置、日志、错误、注册中心、middleware、编码等可组合的核心抽象。基础设施集成位于独立 contrib 模块，应用可自行选择注册中心、遥测、配置后端和持久化库。

`kratos-layout` 是参考模板，不是框架要求。其 `api`、`internal/biz`、`internal/data`、`internal/service`、`internal/server` 目录明确依赖边界，方便生成、测试和替换基础设施。

CLI 用于创建和维护项目；模板 Makefile 执行已配置的生成任务。生成的 protobuf 和 Wire 文件是输出，不应手写。

## 应用模型

应用通过 `kratos.New` 构建并持有一个或多个 `transport.Server`。`app.Run()` 启动已注册 server、处理进程退出并有序停止它们。HTTP 和 gRPC server 共享 middleware 模型、错误 contract、配置 source 与服务发现抽象。

核心包定义 contract，不规定数据库、注册中心、metrics 后端或部署平台。因此服务可在开发环境使用本地配置、生产环境使用 contrib config source，而无需改变业务逻辑。

## 参考 layout

layout 的依赖流向业务代码：

- `api` 保存 protobuf contract 和生成 binding。
- `internal/service` 将 transport request 适配为 use case。
- `internal/biz` 保存 entity、use case 和 repository interface。
- `internal/data` 实现 repository 和外部 client。
- `internal/server` 构造 HTTP/gRPC server 并注册 service。
- `cmd/server` 组装依赖并启动应用。

这是指导原则，而非 Kratos 强制的架构限制。将 transport 和存储细节保留在边缘，业务测试才能直接替换依赖。

## 扩展边界

选择 provider 前先使用核心 interface：服务定位使用 `registry.Registrar`/`Discovery`，配置使用 `config.Source`，横切请求行为使用 `middleware.Middleware`，日志使用标准 `slog` handler。只有当 contrib 模块的版本化路径和生命周期适合服务时才选择它。

生成代码应可替换：修改 proto、配置 schema 或 Wire provider set 的源定义，运行 layout generator 并审查输出 diff。框架应使依赖选择显式，而不是隐藏在全局初始化中。

## 核心能力与生态

使用 protobuf 定义 HTTP/gRPC API，使用 `metadata` 传递请求值，使用 `errors` 提供统一公开错误 contract，使用 `config` source 读取运行期设置。registrar/discovery 集成服务定位，selector 均衡发现到的 endpoint，middleware 提供 recovery、logging、validate、ratelimit 和 circuitbreaker。v3 使用标准 `slog` 记录日志，tracing/metrics 使用 OpenTelemetry contrib 模块。

contrib 是独立版本化的 Go module 生态。使用它集成 provider，但将其 SDK type 限制在 core interface 或 data 层之后。框架仓库和当前 layout 是主要示例，采用前先验证示例模块版本。

## 社区与演进

v3 迁移是 framework API 升级，不要求采用指定数据库、ORM、消息队列或架构。增量升级 import、生成代码、日志、编码和 middleware 集成时保持显式边界并测试 contract。需要的不只是 import path 替换的变更见迁移指南。

```go
app := kratos.New(
	kratos.Name("todo"),
	kratos.Version(version),
	kratos.Logger(logger),
	kratos.Server(httpServer, grpcServer),
)
```