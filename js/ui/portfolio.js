import { currentLocale, t } from "../localization.js?v=20261016-professionals";
import { modalContent, openModal } from "./modal.js";
import { getPortfolioBranch } from "../services/portfolio-schema.mjs";

const content = document.querySelector("#portfolio-content");
let categories = [];
let activeView = null;
let photoIndex = 0;
const categoryImages = {
  "minecraft-builds": "assets/images/portfolio/minecraft-builds.svg",
  "web-studio": "assets/images/portfolio/web-studio.svg"
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function localized(value) {
  if (typeof value === "string") return value;
  return value?.[currentLocale()] ?? value?.ru ?? "";
}

function renderHome() {
  if (!content) return;
  content.innerHTML = `<div class="portfolio-grid">${categories.map((category) => {
    const image = categoryImages[category.id];
    return `<button class="portfolio-card portfolio-category-card" type="button" data-category-id="${escapeHtml(category.id)}">${image ? `<img class="portfolio-category-image" src="${image}" alt="" aria-hidden="true">` : ""}<span class="portfolio-card-title">${escapeHtml(localized(category.name))}</span><span class="portfolio-card-arrow" aria-hidden="true">→</span></button>`;
  }).join("")}</div>`;
  content.querySelectorAll("[data-category-id]").forEach((button) => button.addEventListener("click", () => {
    const category = categories.find((item) => item.id === button.dataset.categoryId);
    if (category) showCategory(category, null, { open: true });
  }));
}

function renderCategoryMarkup(category, subcategory) {
  const branch = getPortfolioBranch(category, subcategory?.id);
  const hasSubcategories = Boolean(category.subcategories?.length);
  const heading = subcategory?.name ?? category.name;
  const items = branch.items;
  const isMinecraftProjectList = category.id === "minecraft-builds" && !hasSubcategories;
  const itemMarkup = items.length
    ? `<div class="portfolio-modal-projects${isMinecraftProjectList ? " is-spoiler-list" : ""}">${items.map((item) => {
      if (isMinecraftProjectList) {
        const photos = Array.isArray(item.photos) ? item.photos.filter((photo) => typeof photo === "string" && photo.trim()) : [];
        const photoContent = photos.length
          ? photos.map((photo) => `<img class="portfolio-spoiler-photo" src="${escapeHtml(new URL(photo, document.baseURI).href)}" alt="${escapeHtml(localized(item.name))}" loading="lazy">`).join("")
          : `<p class="portfolio-spoiler-photo-pending">${escapeHtml(t("portfolio.photoPending").replace("{file}", `assets/images/portfolio/${item.photoFile ?? ""}`))}</p>`;
        return `<details class="portfolio-spoiler"><summary class="portfolio-spoiler-title">${escapeHtml(localized(item.name))}</summary><div class="portfolio-spoiler-content"><p class="portfolio-spoiler-description">${escapeHtml(localized(item.description))}</p><p class="portfolio-spoiler-dimensions"><strong>${escapeHtml(t("portfolio.dimensions"))}:</strong> ${escapeHtml(item.dimensions)}</p>${photoContent}</div></details>`;
      }
      return `<button class="portfolio-card" type="button" data-${hasSubcategories && !subcategory ? "subcategory" : "project"}-id="${escapeHtml(item.id)}"><span class="portfolio-card-title">${escapeHtml(localized(item.name))}</span><span class="portfolio-card-arrow" aria-hidden="true">→</span></button>`;
    }).join("")}</div>`
    : `<p class="portfolio-empty portfolio-modal-empty">${escapeHtml(t("portfolio.emptyCategory"))}</p>`;
  const backButton = subcategory
    ? `<button class="text-button portfolio-modal-back" type="button" data-portfolio-back>← ${escapeHtml(t("portfolio.backToSubcategories"))}</button>`
    : "";
  return `<section class="portfolio-modal-page" aria-labelledby="modal-title">${backButton}<div class="modal-heading portfolio-modal-heading"><p class="eyebrow">${escapeHtml(t("portfolio.categoryMenu"))}</p><h2 id="modal-title">${escapeHtml(localized(heading))}</h2></div>${itemMarkup}</section>`;
}

function showCategory(category, subcategory = null, { open = false, focusProjectId = null, focusSubcategoryId = null } = {}) {
  activeView = { type: "category", category, subcategory };
  const markup = renderCategoryMarkup(category, subcategory);
  if (open) openModal(markup, { variant: "portfolio" });
  else modalContent().innerHTML = markup;

  const modal = modalContent();
  modal.querySelector("[data-portfolio-back]")?.addEventListener("click", () => showCategory(category));
  modal.querySelectorAll("[data-subcategory-id]").forEach((button) => button.addEventListener("click", () => {
    const next = category.subcategories?.find((item) => item.id === button.dataset.subcategoryId);
    if (next) showCategory(category, next);
  }));
  modal.querySelectorAll("[data-project-id]").forEach((button) => button.addEventListener("click", () => {
    const project = getPortfolioBranch(category, subcategory?.id).items.find((item) => item.id === button.dataset.projectId);
    if (project) showProject(project, category, subcategory);
  }));
  if (focusProjectId) [...modal.querySelectorAll("[data-project-id]")].find((button) => button.dataset.projectId === focusProjectId)?.focus();
  else if (focusSubcategoryId) [...modal.querySelectorAll("[data-subcategory-id]")].find((button) => button.dataset.subcategoryId === focusSubcategoryId)?.focus();
}

function showProject(project, category, subcategory) {
  activeView = { type: "project", project, category, subcategory };
  const photos = Array.isArray(project.photos) ? project.photos.filter((photo) => typeof photo === "string" && photo.trim()) : [];
  const title = localized(project.name);
  const description = localized(project.description);
  photoIndex = 0;
  const photoMarkup = photos.length
    ? `<div class="portfolio-project-gallery"><div class="portfolio-project-stage"><img src="${escapeHtml(new URL(photos[0], document.baseURI).href)}" alt="${escapeHtml(title)}" data-portfolio-stage>${photos.length > 1 ? `<button class="review-gallery-nav is-previous" type="button" data-portfolio-step="-1" aria-label="${escapeHtml(t("portfolio.photoPrevious"))}">‹</button><button class="review-gallery-nav is-next" type="button" data-portfolio-step="1" aria-label="${escapeHtml(t("portfolio.photoNext"))}">›</button>` : ""}</div>${photos.length > 1 ? `<p class="portfolio-photo-counter" data-portfolio-counter>1/${photos.length}</p><div class="review-photo-thumbnails">${photos.map((photo, index) => `<button class="review-photo-thumbnail" type="button" data-portfolio-photo="${index}" aria-label="${escapeHtml(title)} ${index + 1}"><img src="${escapeHtml(new URL(photo, document.baseURI).href)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}</div>`
    : "";
  modalContent().innerHTML = `<section class="portfolio-modal-page portfolio-project" aria-labelledby="modal-title"><button class="text-button portfolio-modal-back" type="button" data-project-back>← ${escapeHtml(t("portfolio.backToProjects"))}</button><div class="modal-heading portfolio-modal-heading"><p class="eyebrow">${escapeHtml(t("portfolio.project"))}</p><h2 id="modal-title">${escapeHtml(title)}</h2></div>${photoMarkup}<p class="portfolio-project-description">${escapeHtml(description)}</p></section>`;
  const modal = modalContent();
  modal.querySelector("[data-project-back]")?.addEventListener("click", () => showCategory(category, subcategory, { focusProjectId: project.id }));
  const updatePhoto = (nextIndex) => {
    if (!photos.length) return;
    photoIndex = (nextIndex + photos.length) % photos.length;
    const image = modal.querySelector("[data-portfolio-stage]");
    if (!image) return;
    image.src = new URL(photos[photoIndex], document.baseURI).href;
    image.alt = `${title} ${photoIndex + 1}`;
    const counter = modal.querySelector("[data-portfolio-counter]");
    if (counter) counter.textContent = `${photoIndex + 1}/${photos.length}`;
  };
  modal.querySelectorAll("[data-portfolio-step]").forEach((button) => button.addEventListener("click", () => updatePhoto(photoIndex + Number(button.dataset.portfolioStep))));
  modal.querySelectorAll("[data-portfolio-photo]").forEach((button) => button.addEventListener("click", () => updatePhoto(Number(button.dataset.portfolioPhoto))));
}

export function initializePortfolio(catalog) {
  categories = Array.isArray(catalog?.categories) ? catalog.categories : [];
  renderHome();
  document.addEventListener("volt:languagechange", () => {
    if (!activeView || modalContent().childElementCount === 0) {
      renderHome();
      return;
    }
    if (activeView.type === "category") showCategory(activeView.category, activeView.subcategory);
    else showProject(activeView.project, activeView.category, activeView.subcategory);
  });
  document.addEventListener("site:modalclosed", () => {
    const returnCategoryId = document.activeElement?.dataset?.categoryId;
    activeView = null;
    photoIndex = 0;
    renderHome();
    if (returnCategoryId) [...content.querySelectorAll("[data-category-id]")].find((button) => button.dataset.categoryId === returnCategoryId)?.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const gallery = modalContent().querySelector(".portfolio-project-gallery");
    if (!gallery || !gallery.querySelector("[data-portfolio-stage]")) return;
    const button = gallery.querySelector(`[data-portfolio-step="${event.key === "ArrowRight" ? 1 : -1}"]`);
    if (button) {
      event.preventDefault();
      button.click();
    }
  });
}
