# FuckSchools Frontend

## Purpose
The Studio Orchestrator is now a TanStack Start application. The repo is built around end-to-end type safety: typed route modules, typed router context, typed query integration, and typed auth/session boundaries. The old Next.js-style placeholder framing no longer matches the codebase; the main branch is a TanStack Start/TanStack Router app with Vite, React 19, TanStack Query, Clerk, and generated route types.

## Four-Layer Architecture
The current main branch maps cleanly onto four layers:

### 1) Rendering
Responsible for the actual UI output and document shell.
- src/routes/__root.tsx: document shell, head metadata, Scripts, provider nesting, devtools boot.
- src/routes/index.tsx: route-level landing UI.
- src/styles.css: shared styling surface.
- public/: static assets.

### 2) Studio Orchestrator
Coordinates application-wide view state and route composition.
- src/router.tsx: router construction, routeTree wiring, router context, SSR query integration.
- src/routeTree.gen.ts: generated route graph.
- src/routes/: route modules that define the navigable studio surface.
- src/lib/utils.ts: shared UI helpers.

### 3) Streaming
Owns runtime data flow, auth/session plumbing, and query transport.
- src/integrations/tanstack-query/root-provider.tsx
- src/integrations/tanstack-query/devtools.tsx
- src/integrations/clerk/provider.tsx
- src/integrations/clerk/header-user.tsx
- src/env.ts

### 4) Evaluation
Owns derived-state interpretation and transition feedback for the studio runtime.
- src/routeTree.gen.ts: generated evaluation surface for typed route transitions.
- src/router.tsx: SSR query integration and router-level state evaluation hooks.
- src/routes/: route handlers evaluate local UI state from route context and streaming inputs.
- src/lib/: reusable evaluation helpers and guardrails.

The main branch does not yet split evaluation into a large dedicated directory, so the README treats evaluation as a runtime responsibility distributed across the router boundary, route modules, and shared helpers.

## Studio Runtime Loop
1. Boot the TanStack Start document shell.
2. Create the typed router context.
3. Hydrate the TanStack Router tree and SSR query integration.
4. Stream authenticated state and query results through the orchestrator.
5. Derive the current studio state from route + query + auth context.
6. Evaluate transitions and update the rendered surface.
7. Re-render only the affected branch of the studio UI.

State progression is managed by typed route state rather than ad hoc client globals. The router context, query client, and Clerk provider form the minimum contract that keeps the studio coherent.

## Type-Safety Guarantees
- Route modules are typed at the file level.
- Router context is strongly typed through createRootRouteWithContext.
- Query integration is centralized in one provider path.
- Auth/session concerns are isolated in Clerk wrappers.
- UI state should be derived from router and query inputs rather than duplicated in multiple stores.
- TanStack Start + TanStack Router keep navigation and document rendering aligned with the TypeScript graph.

## v3.1 Studio Runtime Notes
- The frontend is now documented as the presentation surface for EventTrace-driven traversal rather than as a generic app shell.
- GoalContext should be treated as an input to the router tree and route loaders so the active frontier can be rendered without recreating backend policy in the browser.
- Native Renderer hooks are a consumer boundary: the frontend should subscribe to renderer-ready events and reflect them, not invent traversal decisions.
- The Passive Observation Layer remains backend-owned; the frontend should only display blocker state, signal provenance, and the current node lifecycle stage.
- Thread history should be paginated so the UI can keep the active conversation window responsive even when the session backlog grows.
- Any payload that crosses from backend to UI should match the Zod-validated contract, keeping route modules and query consumers aligned with the same schema.
- The studio should render the current frontier, completion evidence, and transition history as a replayable runtime story, not as ad hoc local state.
