# Task Spec: Define Bar Content Schema

## Goal

Define the CMS schema required to support the current bar-page experience and near-term editorial needs without guessing hidden field behavior.

## Current State

- Bar data currently lives as JavaScript objects in `src/lib/content/mock-site-data.js`.
- The frontend already depends on explicit fields such as `slug`, `shortLabel`, `addressLine`, `hours`, `bestFor`, `menuLinks`, `gallery`, `mapUrl`, and SEO fields.
- Some fields exist in mock data but are not yet rendered, such as `summary`, `vibe`, `features`, and `events`.

## Scope

In scope:

- field inventory for bar content
- required versus optional field rules
- relationships for gallery items, menu links, events, and socials
- validation rules and editorial constraints

Out of scope:

- frontend adapter implementation
- final CMS product selection
- deployment and infrastructure setup

## Deliverables

1. A schema definition for the `bars` content type.
2. Definitions for related entities or repeatable components used by a bar.
3. Validation rules for slug, media references, publish state, and sort order.
4. Clear mapping from current mock fields to target schema fields.

## Required Field Coverage

The schema definition must account for every field currently used by:

- `src/app/bars/[slug]/page.js`
- `src/components/network-points.js`
- `src/app/sitemap.js`

It should also explicitly classify existing mock-only fields that are not yet rendered.

## Acceptance Criteria

- Every currently rendered bar-page field has a defined upstream schema field.
- Each schema field is marked as required, optional, or conditionally required.
- `slug` uniqueness is explicitly defined.
- Media fields are modeled as asset references or managed URLs, not repo-local file paths as the long-term source of truth.
- Gallery items include required alt text.
- Menu links support both a present URL and a known empty-URL state with a visible status label.
- The schema supports adding a new published bar without editing frontend code.
- Non-rendered current fields are either retained intentionally or marked for removal with rationale.

## Suggested Output Format

Prefer a schema table with:

- field name
- type
- required status
- validation notes
- current frontend usage

## Verification

- Cross-check the schema against `src/lib/content/mock-site-data.js`.
- Cross-check the schema against the fields referenced in bar page and network listing code.
- Confirm that no currently used field is left implicit.

## Provisional Assumptions

- The first schema version should favor explicit structured fields over rich page-builder blocks.
- Ordered arrays such as hours, gallery items, menu links, and preview chips remain ordered data structures in the CMS.

## Open Questions

- Should `hours` stay as ordered text lines in v1, or be modeled as structured day/time pairs?
- Should socials be stored per bar only, or support inheritance from network settings?
- Are coordinates required in the first schema, or can map links remain the only location output?
