---
id: design
title: Design
---

Kratos v3 is a Go framework with HTTP and gRPC transports, application lifecycle management, protobuf tooling, and composable core abstractions for configuration, logging, errors, registry, middleware, and encoding. Infrastructure integrations live in independent contrib modules, so an application chooses the registry, telemetry, configuration backend, and persistence library it needs.

`kratos-layout` is a reference template, not a framework requirement. Its `api`, `internal/biz`, `internal/data`, `internal/service`, and `internal/server` directories create explicit dependency boundaries and make generation, testing, and replacement of infrastructure practical.

The CLI creates and maintains projects; the template Makefile runs configured generation. Generated protobuf and Wire files are outputs, not handwritten application code.

## Application model

An application is constructed with `kratos.New` and owns one or more `transport.Server` implementations. `app.Run()` starts registered servers, handles process shutdown, and stops them in an orderly way. HTTP and gRPC servers share the same middleware model, error contract, configuration sources, and service discovery abstractions.

Core packages define contracts; they do not prescribe a database, registry, metrics backend, or deployment platform. This permits a service to use local configuration in development and a contrib config source in production without changing business logic.

## Reference layout

The layout's dependencies flow toward business code:

- `api` contains protobuf contracts and generated bindings.
- `internal/service` adapts transport requests to use cases.
- `internal/biz` contains entities, use cases, and repository interfaces.
- `internal/data` implements repositories and external clients.
- `internal/server` constructs HTTP/gRPC servers and registers services.
- `cmd/server` assembles dependencies and starts the application.

This is guidance, not an architectural gate enforced by Kratos. Keep transport and storage details at the edges so business tests can substitute dependencies directly.

## Extension boundaries

Use core interfaces before choosing a provider: `registry.Registrar` and `Discovery` for service location, `config.Source` for configuration, `middleware.Middleware` for cross-cutting request behavior, and standard `slog` handlers for logging. Select a contrib module only after its versioned module path and lifecycle fit the service.

Generated code is intentionally replaceable: change proto definitions, configuration schemas, or Wire provider sets at the source, run the layout generator, and review the resulting diff. The framework should make dependency choices explicit rather than hide them in global initialization.

## Core capabilities and ecosystem

Use protobuf to define HTTP/gRPC APIs, `metadata` to propagate request values, `errors` for a uniform public error contract, and `config` sources for runtime settings. Registrars and discovery integrate service location; the selector balances discovered endpoints; middleware provides recovery, logging, validation, rate limiting, and circuit breaking. v3 uses standard `slog` for logs and OpenTelemetry contrib modules for tracing and metrics.

Contrib is an ecosystem of independently versioned Go modules. Use it for provider integrations, but keep its SDK types behind core interfaces or the data layer. The framework repository and current layout are the primary examples; validate an example's module version before adopting it.

## Community and evolution

The v3 migration is a framework API upgrade, not a requirement to adopt a particular database, ORM, message queue, or architecture. Preserve explicit boundaries and test contracts while incrementally upgrading imports, generated code, logging, encoding, and middleware integrations. See the migration guide for changes that require more than an import-path rewrite.

```go
app := kratos.New(
	kratos.Name("todo"),
	kratos.Version(version),
	kratos.Logger(logger),
	kratos.Server(httpServer, grpcServer),
)
```