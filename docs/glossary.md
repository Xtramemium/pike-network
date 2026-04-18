# Glossary

## Purpose

Shared vocabulary for developers, designers, editors, and AI agents working in this repository.

## Terms

### Network page

The root page at `/`. It presents the bar network and links users to specific bar pages.

### Bar page

A page at `/bars/[slug]` for one exact bar location.

### Bar slug

The route-safe identifier used in `/bars/[slug]`. In the current codebase it is stored in each bar object and used for route generation, lookup, and sitemap entries.

### Network settings

Shared brand-level content used by the network page and footer, such as display name, main phone, socials, and network-level hero content.

### Bar entity

One structured content record representing a single bar location.

### Content adapter

The code layer that reads from a content source and returns the normalized shape used by frontend routes. In the current codebase, this role is handled by `src/lib/content/get-site-data.js`.

### Mock content

Temporary structured content stored in the frontend repository for development. In this repo, the current mock content file is `src/lib/content/mock-site-data.js`.

### Temporary mock media

Repository-local images or videos stored under `public/mock` for frontend development. These are not intended to become the long-term editorial source of truth.

### Source of truth

The system that should be treated as authoritative for a class of data. Today the repo contains mock content, but the target direction is for editable content and media to have an external source of truth.

### CMS-first

A project direction where non-developer content editing is a first-class requirement, not an afterthought.

### External media

Photos, videos, posters, PDFs, and similar assets stored outside the frontend repository, typically through a CMS and object storage.

### Data contract

The explicit field shape the frontend expects to receive from the content layer.

### Static params

The list returned by `generateStaticParams()` in Next.js App Router. In this project it currently determines which `/bars/[slug]` pages are generated.

### Publish state

The editorial status of a record, such as draft or published. This is a target CMS concern and is not yet implemented in the current mock data flow.

## Open Questions

- Should "bar" always mean a physical location, or could it later include temporary concepts such as pop-ups?
- Should "network settings" remain a singleton, or split into separate global content groups later?
