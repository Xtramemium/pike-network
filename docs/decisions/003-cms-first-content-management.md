# ADR 003: CMS-First Content Management

## Status

Accepted as a target direction. Not implemented yet.

## Context

The current frontend proves route structure and UI behavior, but it relies on hardcoded content in `src/lib/content/mock-site-data.js`.

Project direction and existing docs indicate that the site should eventually support non-developer content editing.

## Decision

Design the next content iteration around a real CMS workflow rather than extending the hardcoded mock-content approach.

## Rationale

- The project needs repeatable management for multiple bars.
- Bar-level content includes structured repeatable sections such as gallery items, menu links, and events.
- Editors need a workflow that does not require code changes.
- CMS-backed modeling makes slug management, publish state, and media ownership explicit.

## Consequences

Positive:

- content updates become operationally manageable
- schema design becomes explicit
- future additions of bars become less ambiguous

Tradeoffs:

- schema work is required before integration
- frontend needs a content adapter
- preview, publishing, and permissions must be designed deliberately

## Non-Goals

- This decision does not choose a specific CMS product.
- This decision does not commit to a preview implementation.
- This decision does not define the deployment topology in detail.

## Current vs Target

Current:

- content is coded directly in the repo
- no publish workflow exists
- no editor roles exist

Target:

- content is modeled in a CMS
- publish state exists
- editors can manage routine content changes

## Open Questions

- Which CMS product best fits the first production release?
- Does the first release need drafts and preview, or published-only reads?
- Which roles are required beyond admin and editor?
