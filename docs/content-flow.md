# Content Flow

## Purpose

This document explains how content moves through the system today and how it is expected to move after CMS integration.

## Current Flow

### Current Source of Truth

- Structured content lives in `src/lib/content/mock-site-data.js`.
- Temporary frontend media lives in `public/mock`.

### Current Read Path

1. `src/lib/content/get-site-data.js` reads from `mock-site-data.js`.
2. `src/app/page.js` calls `getSiteData()` and renders the network page.
3. `src/app/bars/[slug]/page.js` calls `getBarBySlug(slug)` and `getBars()`.
4. `generateStaticParams()` derives bar routes from the current slug list.
5. `src/app/sitemap.js` derives sitemap entries from the same bar list.

### Current Media Path

1. Mock media files are placed in `public/mock/...`.
2. Content objects reference those files as URL strings such as `/mock/bars/...`.
3. Components render those URLs through `next/image` or `<video>`.

### Current Limitations

- Content edits require code changes.
- Adding a bar requires editing the frontend repository.
- Media files inside `public/mock` are repository-local and therefore not a suitable long-term editorial workflow.
- Some content exists in mock data but is not yet rendered by the current UI.

## Target Flow

### Target Source of Truth

- Structured editorial content should live in a CMS.
- Binary media should live in CMS-managed storage or an external object storage service.
- The frontend repository should only keep code and small non-editorial assets.

### Target Read Path

1. Editor creates or updates network content and bar content in the CMS.
2. CMS stores structured records and media references.
3. Frontend content adapter fetches published content.
4. Adapter maps CMS-specific fields into the frontend contract.
5. Routes render the normalized contract.
6. Sitemap and route generation use the same published bar source.

### Target Media Path

1. Editor uploads hero media, gallery images, and menu files through the CMS.
2. CMS stores metadata and file references.
3. Frontend receives stable URLs or asset descriptors from the adapter.
4. UI components render remote assets without knowing storage internals.

## Transition Rules

- Keep the content access boundary in `src/lib/content`.
- Replace the data source behind the adapter before changing component props.
- Preserve the current internal bar-page contract until a deliberate contract change is approved.
- Treat `public/mock` as temporary fixture data only.

## Current vs Target

| Question | Current | Target |
| --- | --- | --- |
| Where does text live? | repo mock file | CMS |
| Where do bar slugs come from? | `mockSiteData.bars` | CMS-backed published records |
| Where do hero and gallery assets live? | `public/mock` | external media storage |
| Who can edit content? | developers | editors and admins |
| What triggers updates? | code change and deploy | content publish flow |

## Operational Constraints

- The frontend should not require component rewrites just because the upstream CMS field names differ.
- Media replacement should not require a Git commit.
- Bar route generation and sitemap generation must continue to use the same published list of slugs.

## Provisional Assumptions

- The first CMS integration will expose published content in a way that can be fetched during build and during page rendering.
- Remote asset URLs will be directly renderable by the frontend after any required Next.js image configuration is added.

## Open Questions

- Is preview mode required before the first public CMS launch?
- Should unpublished bars be excluded from route generation entirely, or support preview-only access?
- Will the first integration fetch directly from the CMS, or through a thin backend adapter service?
