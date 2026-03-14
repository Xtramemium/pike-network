# Project Context

Last updated: 2026-03-14

## Purpose

Local workspace for the new multi-bar website project.

This project is separate from the legacy single-bar `Pike` landing page.
The old project remains unchanged and serves only as a visual/content reference.

## Product Direction

- build a multi-bar platform, not a single landing page
- use Next.js as the frontend foundation
- keep the premium cinematic first-screen feel, including hero background video
- move editable content and production media out of the frontend repository
- support a CMS/admin panel for non-developer content updates

## Architecture Baseline

Recommended stack:

- Next.js
- Directus
- PostgreSQL
- S3-compatible object storage

## Source Documents

Main planning docs for this project:

- [multi-bar-project-prompt.md](/Users/km/Documents/GitHub/pike-network/docs/multi-bar-project-prompt.md)
- [multi-bar-project-context.md](/Users/km/Documents/GitHub/pike-network/docs/multi-bar-project-context.md)

## Working Rules

- all new context for the multi-bar project belongs in this repository, not in `Pike`
- do not store bar photos/videos in `src/assets` as source of truth
- treat media as remote assets managed outside the repo
- preserve mobile hero video behavior where browser policy allows muted autoplay
