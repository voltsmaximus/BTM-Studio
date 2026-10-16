import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { flattenPortfolioProjects, getPortfolioBranch, hasPortfolioReviewLink } from "../js/services/portfolio-schema.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "data/portfolio.json"), "utf8"));

test("portfolio catalog contains the configured categories and supplied Minecraft work", async () => {
  assert.deepEqual(catalog.categories.map(({ id }) => id), ["minecraft-builds", "web-studio"]);
  assert.deepEqual(catalog.categories.map(({ name }) => name.en), ["Minecraft Builds", "Web Studio"]);
  const projects = catalog.categories[0].projects;
  assert.deepEqual(projects.map(({ id }) => id), ["gothic-angel", "heavenly-spawn", "mountain-spawn"]);
  assert.deepEqual(flattenPortfolioProjects(catalog).map(({ id }) => id), ["gothic-angel", "heavenly-spawn", "mountain-spawn"]);
  for (const project of projects) {
    assert.ok(project.name.ru && project.name.en);
    assert.ok(project.description.ru && project.description.en);
    assert.ok(project.dimensions);
    assert.equal(project.photos.length, 1);
    assert.match(project.photos[0], /^assets\/images\/portfolio\/.+\.jpg$/i);
    await access(path.join(root, project.photos[0]));
  }
});

test("project review links are opt-in", () => {
  assert.equal(hasPortfolioReviewLink({}), false);
  assert.equal(hasPortfolioReviewLink({ reviewId: "" }), false);
  assert.equal(hasPortfolioReviewLink({ reviewId: "review-1" }), true);
});

test("portfolio navigation resolves subcategories and projects from nested data", () => {
  const fixture = {
    id: "category",
    subcategories: [{ id: "subcategory", projects: [{ id: "project" }] }]
  };
  assert.deepEqual(getPortfolioBranch(fixture).items.map(({ id }) => id), ["subcategory"]);
  assert.deepEqual(getPortfolioBranch(fixture, "subcategory").items.map(({ id }) => id), ["project"]);
  assert.deepEqual(getPortfolioBranch(fixture, "missing").items.map(({ id }) => id), ["subcategory"]);
  const directProjects = { id: "direct", subcategories: [], projects: [{ id: "direct-project" }] };
  assert.deepEqual(getPortfolioBranch(directProjects).items.map(({ id }) => id), ["direct-project"]);
});

test("every configured portfolio photo resolves to an original local file", async () => {
  const photos = flattenPortfolioProjects(catalog).flatMap((project) => project.photos ?? []);
  for (const photo of photos) {
    assert.match(photo, /^assets\/images\/portfolio\//);
    await access(path.join(root, photo));
  }
});
