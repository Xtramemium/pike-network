# AGENTS.md

## Runtime

- Prefer Node 20 from `.nvmrc`.
- Use `npm` in this repo (`package-lock.json` is committed).

## Verified Commands

- `npm ci` installs dependencies from the committed lockfile.
- `npm run dev` starts the Next.js dev server.
- `npm run lint` runs ESLint.
- `npm run build` creates the production build and currently prerenders `/` plus `/bars/[slug]` pages.
- `npm run start` serves the production build after `npm run build`.

## Current Workflow

- Site content is currently sourced from `src/lib/content/mock-site-data.js`.
- Read helpers in `src/lib/content/get-site-data.js` feed the root page and the bar route at `src/app/bars/[slug]/page.js`.
- Adding or changing a bar currently means updating `mockSiteData.bars`; `generateStaticParams()` builds the `/bars/[slug]` routes from that list.
- Temporary frontend media belongs in `public/mock` and should be referenced by URL string paths, per `docs/mock-media.md`.

## TODO

- CMS/admin integration is described in the project docs, but this repository does not yet contain an implemented CMS workflow or sync command.
