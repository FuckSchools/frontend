# FuckSchools Frontend

> **v3.1** — Rendering & Observability Surface

## Purpose

This repository is the **rendering and observability surface** for the FuckSchools studio system. It is a TanStack Start application and is **not** the source of truth for goal completion or session state. Completion authority lives in the backend trace graph; this frontend renders and observes what that graph emits.

The repo is built around end-to-end type safety — typed route modules, typed router context, typed query integration, typed auth/session boundaries, and Zod-validated environment and trace contracts. The main branch is a TanStack Start / TanStack Router app with Vite, React 19, TanStack Query, Clerk, and generated route types.

## Role in the System

| Concern | Owner |
|---|---|
| Goal completion & session truth | Backend trace graph |
| Rendering trace events to the UI | **This repo** (Native Renderer / EventTrace) |
| Structural validation of incoming contracts | **This repo** (Zod Structural Enforcement) |
| Route-level data resolution | **This repo** (DDRT) |
| Goal-scoped state propagation | **This repo** (GoalContext) |
| Passive signal ingestion from the orchestrator | **This repo** (Passive Observation Layer / MCP signals) |

## Four-Layer Architecture

The current main branch maps cleanly onto four layers:

### 1) Native Renderer (EventTrace)

The rendering layer is trace-grounded: route components subscribe to EventTrace payloads emitted by the backend and render them without asserting their own completion semantics. UI state is derived from trace events, not from local approximations.

- `src/routes/__root.tsx` — document shell, head metadata, Scripts, provider nesting, devtools boot.
- `src/routes/index.tsx` — route-level landing UI; renders current trace state.
- `src/styles.css` — shared styling surface.
- `public/` — static assets.

### 2) Studio Orchestrator (DDRT + GoalContext)

Coordinates application-wide view state and route composition. The Dynamic Data Resolution Tree (DDRT) is the mechanism by which TanStack Router resolves loader data per-route in dependency order. GoalContext threads goal-scoped metadata through the router context so every route module can read the active goal without prop drilling.

- `src/router.tsx` — router construction, routeTree wiring, router context (includes GoalContext shape), SSR query integration.
- `src/routeTree.gen.ts` — generated route graph; the structural representation of the DDRT.
- `src/routes/` — route modules that define the navigable studio surface; each module resolves its slice of the DDRT independently.
- `src/lib/utils.ts` — shared UI helpers.

### 3) Streaming & Passive Observation Layer (MCP Signals)

Owns runtime data flow, auth/session plumbing, query transport, and passive ingestion of MCP (Model Context Protocol) signals emitted by the backend orchestrator. The frontend does not act on MCP signals autonomously; it surfaces them for observability only.

- `src/integrations/tanstack-query/root-provider.tsx` — query client setup and context provision.
- `src/integrations/tanstack-query/devtools.tsx` — query devtools.
- `src/integrations/clerk/provider.tsx` — Clerk auth provider.
- `src/integrations/clerk/header-user.tsx` — authenticated user header component.
- `src/env.ts` — environment contract, validated at boot via Zod Structural Enforcement (see below).

### 4) Evaluation (Zod Structural Enforcement)

Owns derived-state interpretation, structural contract validation, and transition feedback for the studio runtime. Zod schemas enforce the shape of all incoming EventTrace payloads, MCP signal envelopes, and environment bindings before they enter the component tree.

- `src/env.ts` — `@t3-oss/env-core` + Zod validates all environment variables at startup; invalid shapes throw rather than silently degrading.
- `src/routeTree.gen.ts` — generated evaluation surface for typed route transitions.
- `src/router.tsx` — SSR query integration and router-level state evaluation hooks.
- `src/routes/` — route handlers evaluate local UI state from route context and streaming inputs against Zod-enforced contracts.
- `src/lib/` — reusable evaluation helpers and guardrails.

## Studio Runtime Loop

1. Boot the TanStack Start document shell.
2. Validate all environment bindings with Zod Structural Enforcement (fail fast on contract violations).
3. Create the typed router context, injecting GoalContext into the root.
4. Hydrate the TanStack Router DDRT and SSR query integration.
5. Stream authenticated state and query results through the orchestrator.
6. Passively ingest MCP signals from the backend; surface them in the observability layer without asserting completion.
7. Render EventTrace payloads through the Native Renderer; derive current studio state from trace events, route context, and query results.
8. Evaluate Zod-validated transitions and update only the affected branch of the studio UI.

State progression is managed by typed route state rather than ad hoc client globals. The router context, query client, GoalContext, and Clerk provider form the minimum contract that keeps the studio coherent.

## Type-Safety & Security Guarantees

- Route modules are typed at the file level.
- Router context is strongly typed through `createRootRouteWithContext`; GoalContext shape is part of that contract.
- Query integration is centralized in one provider path.
- Auth/session concerns are isolated in Clerk wrappers.
- UI state is derived from router, query, and EventTrace inputs rather than duplicated in multiple stores.
- All environment variables are structurally enforced by Zod at boot; any missing or malformed binding throws before the app renders.
- Incoming EventTrace payloads and MCP signal envelopes must pass Zod schema validation before touching component state.
- TanStack Start + TanStack Router keep navigation and document rendering aligned with the TypeScript graph.

## Copilot Security & Performance

The following practices are enforced for all Copilot-assisted contributions to this repository:

- **No secret injection via environment defaults.** All env bindings go through `src/env.ts`; Zod rejects empty strings that would silently produce `undefined` for required values (`emptyStringAsUndefined: true`).
- **No unauthenticated route rendering.** Clerk provider wraps the entire component tree; route modules assume an auth boundary is already established above them.
- **Loader data is validated, not assumed.** Any loader that consumes an external endpoint must validate its response shape with a Zod schema before returning to the route component.
- **EventTrace payloads are read-only.** Components that consume trace events must not mutate or re-emit them; observability is passive.
- **Preload is intent-based.** `defaultPreload: 'intent'` limits unnecessary network requests to routes the user is actually navigating toward; `defaultPreloadStaleTime: 0` ensures stale data is never silently served from cache on navigation.
- **MCP signals are isolated in the Streaming layer.** No MCP signal handling logic lives in route components; signal processing is confined to the integration layer to prevent runaway re-renders.
