import { cp, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist", "pages");
const publishedFiles = [
  "index.html",
  "favicon.svg",
  "assets/images/logo-site.png",
  "css/style.css",
  "data/approved-reviews.json",
  "data/portfolio.json",
  "assets/images/reviews/review-1-1.jpg",
  "assets/images/reviews/review-1-2.jpg",
  "assets/images/reviews/review-2-1.jpg",
  "assets/images/reviews/review-2-2.jpg",
  "assets/images/reviews/review-2-3.jpg",
  "assets/images/reviews/illrapirka-1.jpg",
  "assets/images/reviews/illrapirka-2.jpg",
  "assets/images/reviews/illrapirka-3.jpg",
  "assets/images/reviews/avatars/gerosmp.jpg",
  "assets/images/reviews/avatars/illrapirka.jpg",
  "assets/images/portfolio/minecraft-builds.svg",
  "assets/images/portfolio/web-studio.svg",
  "assets/images/socials/tiktok-logo.png",
  "assets/images/socials/telegram-channel-logo.webp",
  "assets/images/socials/telegram-direct-logo.webp",
  "js/app.js",
  "js/config.js",
  "js/localization.js",
  "js/services/reviews.js",
  "js/services/portfolio.js",
  "js/services/portfolio-schema.mjs",
  "js/services/review-pagination.mjs",
  "js/ui/avatar.js",
  "js/ui/modal.js",
  "js/ui/portfolio.js",
  "js/ui/pricing.js",
  "locales/translations.json"
];

if (!outputDirectory.startsWith(`${projectRoot}${path.sep}`)) {
  throw new Error("Pages output directory must remain inside the project.");
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const relativePath of publishedFiles) {
  const source = path.join(projectRoot, relativePath);
  const destination = path.join(outputDirectory, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const portfolio = JSON.parse(await readFile(path.join(projectRoot, "data/portfolio.json"), "utf8"));
const projectPhotos = (portfolio.categories ?? []).flatMap((category) => [
  ...(category.projects ?? []),
  ...(category.subcategories ?? []).flatMap((subcategory) => subcategory.projects ?? [])
])
  .flatMap((project) => Array.isArray(project.photos) ? project.photos : []);
for (const relativePath of new Set(projectPhotos)) {
  if (typeof relativePath !== "string" || !relativePath.startsWith("assets/images/portfolio/")) {
    throw new Error(`Portfolio photos must be stored under assets/images/portfolio/: ${relativePath}`);
  }
  const source = path.resolve(projectRoot, relativePath);
  const assetRoot = path.resolve(projectRoot, "assets/images/portfolio") + path.sep;
  if (!source.startsWith(assetRoot)) throw new Error(`Invalid portfolio photo path: ${relativePath}`);
  const destination = path.join(outputDirectory, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

console.log(`GitHub Pages static site prepared at ${path.relative(projectRoot, outputDirectory)}.`);
