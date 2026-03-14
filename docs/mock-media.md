# Mock Media Structure

Temporary mock media for the frontend should live in `public/mock`.

Use this structure:

- `public/mock/network/logo.png`
- `public/mock/bars/shchuka-8-marta-18k1/hero/hero.webp`
- `public/mock/bars/shchuka-8-marta-18k1/gallery/01.jpg`
- `public/mock/bars/shchuka-8-marta-18k1/gallery/02.webp`
- `public/mock/bars/shchuka-9-marta-19k2/hero/hero.webp`
- `public/mock/bars/shchuka-9-marta-19k2/gallery/01.webp`
- `public/mock/bars/shchuka-9-marta-19k2/gallery/02.webp`

Rules:

- keep production media out of `src/assets`
- store temporary frontend media as URL-addressable files in `public/mock`
- reference media in code by URL strings, not by local JS imports
- later replace `/mock/...` URLs with CMS/CDN URLs without changing component APIs
- keep logo assets outside bar galleries

Recommended minimum per bar:

- 1 hero image
- 4 to 8 gallery images

Suggested formats:

- `jpg`
- `jpeg`
- `png`
- `webp`
