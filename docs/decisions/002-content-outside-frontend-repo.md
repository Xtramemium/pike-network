# ADR 002: Content Outside Frontend Repo

## Status

Accepted as the target architecture. Not fully implemented yet.

## Context

The current repository still contains mock content and temporary mock media:

- `src/lib/content/mock-site-data.js`
- `public/mock/...`

That setup is useful for frontend development, but it does not meet the long-term editorial goal of CMS-managed content and externally managed media.

## Decision

Treat the frontend repository as a rendering application, not the long-term source of truth for editable content or production venue media.

## Rationale

- Non-developers should be able to update content without editing source files.
- Venue photos, videos, and menu files should not require Git commits.
- Repository-local media does not scale well as the number of bars and assets grows.
- Separating content and presentation lowers the risk of accidental frontend-specific constraints leaking into editorial workflow.

## Consequences

Positive:

- better editorial workflow
- cleaner repo history
- smaller frontend repository over time
- clearer media ownership rules

Tradeoffs:

- requires CMS and media infrastructure
- adds integration work
- introduces environment and deployment dependencies outside the frontend app

## Current vs Target

Current:

- mock content and mock media live in the repo
- developers are the only people who can safely edit content

Target:

- structured content lives in a CMS
- production media lives in external storage
- frontend consumes normalized external content

## Guardrails

- `public/mock` may remain for temporary fixtures during development.
- Temporary fixture assets must not be described as the production source of truth.
- New implementation work should avoid creating fresh repo-local editorial content unless it is clearly mock data.

## Open Questions

- Will menu PDFs be stored as first-class managed assets in the CMS, or linked from another system?
- Which storage and CDN setup will own production media?
