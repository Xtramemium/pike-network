# ADR 001: Separate Multi-Bar Repo

## Status

Implemented in the current codebase.

## Context

The project is being developed as a multi-bar website, not as an extension of the legacy single-bar site.

This repository already exists as a distinct workspace with its own Next.js application, documentation, and content model direction.

## Decision

Keep the multi-bar website in a dedicated repository rather than building it inside the legacy single-bar frontend.

## Rationale

- The product scope is different: network landing page plus multiple bar pages.
- Route structure and content model needs are different from a single-venue landing page.
- Documentation, implementation tasks, and future CMS integration are easier to manage when they are not mixed into the old project.
- A separate repository makes it clearer that the multi-bar system is its own product surface.

## Consequences

Positive:

- cleaner onboarding
- clearer ownership boundaries
- less coupling to legacy assumptions
- easier future CMS and deployment planning

Tradeoffs:

- duplicated project setup work
- separate maintenance overhead
- shared brand assets and learnings need explicit coordination across repos

## Evidence In Current Repo

- root-level project name: `pike-network`
- dedicated Next.js routes for network and bar pages
- dedicated multi-bar docs under `docs/`

## Open Questions

- Which shared assets or utilities, if any, should be synchronized with the legacy project?
- Should future brand-level components be shared through a package, or copied intentionally when needed?
