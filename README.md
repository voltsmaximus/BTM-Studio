# Site Studio

This repository contains the standalone static BTM public website. It uses the existing local CSS, RU/EN translations, approved review content, accessible review dialogs, and Telegram contact links. It has no account, admin, portfolio, chat, or backend integration.

## Run locally

Install the small static-server dependency with `npm ci`, then run `npm run dev` and open `http://127.0.0.1:4173/`. The site loads its assets and review data by relative URLs, so it works both at the domain root and from a repository subpath.

## Build for GitHub Pages

Run `npm run pages:build`. The build creates `dist/pages` from an explicit allowlist of public files; backend code, environment files, dependencies, build output, admin files, and portfolio data are not copied. The GitHub Actions workflow publishes this folder when changes are pushed to `main` or `master`. In GitHub repository settings, select **Settings → Pages → GitHub Actions**. After the workflow deploys, open the page URL shown in the workflow summary or Pages settings.

## Review photo placeholders

The review gallery uses real Minecraft screenshots `review-1-1.jpg` and `review-1-2.jpg` for review 1. Six clearly labeled SVG illustrations are still used as temporary placeholders for review 2 (`review-2-1.svg` through `review-2-3.svg`) and review 3 (`review-3-1.svg` through `review-3-3.svg`); they are not client photos or real project screenshots. The old `review-1-1.svg` and `review-1-2.svg` files remain in the source folder but are no longer referenced or published. Review author avatars are stored separately in `assets/images/reviews/avatars/`: `gerosmp.jpg` for GeroSMP and `illrapirka.jpg` for Illrapirka. Review 1 (`xvii`) has no author avatar.

## Current limits

The published site is static. Sign-in, registration, profile editing, review submission/moderation, portfolio, orders, and chat are unavailable. Reviews are the approved content in `data/approved-reviews.json`; this site does not create or persist new reviews. The review gallery currently uses labeled SVG placeholders rather than client photographs. Telegram contact links use the centralized `js/config.js` URL.

There is no backend or database in this project. If server-backed features are needed later, add them as a separate deployment project and configure a public API URL without placing credentials in frontend files.
