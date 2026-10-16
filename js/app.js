import { TELEGRAM_URL } from "./config.js";
import { currentLocale, initializeLocalization, setLanguage, t, translateMarkup } from "./localization.js?v=20261016-professionals";
import { personAvatarMarkup } from "./ui/avatar.js";
import { bindModalControls, closeModal, modalContent, notify, openModal } from "./ui/modal.js";
import { getPublicReviews } from "./services/reviews.js";
import { getPortfolioCatalog } from "./services/portfolio.js";
import { initializePortfolio } from "./ui/portfolio.js";
import { initializePricing } from "./ui/pricing.js";
import { getReviewPage, REVIEWS_PER_PAGE } from "./services/review-pagination.mjs";

const reviewGrid = document.querySelector("#review-grid");
const socialsOpenButton = document.querySelector("#socials-open");
const contactSocialsOpenButton = document.querySelector("#contact-socials-open");
let approvedReviews = [];
let reviewPage = 0;
let socialsModalOpen = false;

function renderSocialsModal() {
  return `<div class="socials-modal">
    <div class="modal-heading"><p class="eyebrow">BTM</p><h2 id="modal-title">${escapeHtml(t("socials.title"))}</h2></div>
    <div class="socials-modal-list">
      <a class="socials-modal-card" href="https://vt.tiktok.com/ZSgNqtVau/" target="_blank" rel="noopener noreferrer"><span class="socials-modal-mark" aria-hidden="true"><img src="assets/images/socials/tiktok-logo.png" alt=""></span><span>${escapeHtml(t("socials.tiktok"))}</span><span class="button-arrow" aria-hidden="true">↗</span></a>
      <a class="socials-modal-card" href="https://t.me/builderstomove" target="_blank" rel="noopener noreferrer"><span class="socials-modal-mark" aria-hidden="true"><img src="assets/images/socials/telegram-channel-logo.webp" alt=""></span><span>${escapeHtml(t("socials.channel"))}</span><span class="button-arrow" aria-hidden="true">↗</span></a>
      <a class="socials-modal-card socials-modal-order" href="tg://resolve?domain=stepushkinn"><span class="socials-modal-mark" aria-hidden="true"><img src="assets/images/socials/telegram-direct-logo.webp" alt=""></span><span class="socials-modal-copy"><strong>${escapeHtml(t("socials.order"))}</strong><small>${escapeHtml(t("socials.orderDescription"))}</small></span><span class="button-arrow" aria-hidden="true">↗</span></a>
    </div>
  </div>`;
}

function openSocialsModal() {
  socialsModalOpen = true;
  openModal(renderSocialsModal());
}

function updateReviewCounter() {
  const counter = document.querySelector(".review-counter");
  const { page, totalPages } = getReviewPage(approvedReviews, reviewPage);
  if (counter) counter.textContent = `${totalPages ? page + 1 : 0}/${totalPages}`;
}

function renderReviewPage() {
  const { page, reviews } = getReviewPage(approvedReviews, reviewPage, REVIEWS_PER_PAGE);
  reviewPage = page;
  reviewGrid.replaceChildren();
  reviews.forEach(appendPublicReview);
  updateReviewCounter();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function configureTelegramLinks(root = document) {
  root.querySelectorAll("[data-telegram-link]").forEach((link) => {
    if (!TELEGRAM_URL) {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      return;
    }
    link.href = TELEGRAM_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
  });
}

function safeReviewPhoto(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  const source = value.trim();
  if (/^data:image\/(?:png|jpe?g|gif|webp|avif);base64,[a-z0-9+/=]+$/i.test(source)) return source;
  try {
    const url = new URL(source, document.baseURI);
    if (url.protocol === "https:" || url.origin === location.origin) return url.href;
  } catch {
    return "";
  }
  return "";
}

function reviewPhotoMarkup(review, className = "avatar user-review-avatar") {
  const name = review.userName ?? review.projectName ?? t("reviews.customer");
  const photo = safeReviewPhoto(review.image ?? review.userAvatar);
  return photo
    ? `<img class="${className}" data-review-photo src="${escapeHtml(photo)}" alt="${escapeHtml(t("reviews.photoAlt").replace("{name}", name))}" loading="lazy" decoding="async">`
    : personAvatarMarkup(className);
}

function bindReviewPhotoFallbacks(root) {
  root.querySelectorAll("img[data-review-photo]").forEach((image) => {
    image.addEventListener("error", () => {
      const template = document.createElement("template");
      template.innerHTML = personAvatarMarkup(image.className);
      image.replaceWith(template.content.firstElementChild);
    }, { once: true });
  });
}

function ratingMarkup(review) {
  const rating = Number(review.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return "";
  return `<div class="review-stars" role="img" aria-label="${escapeHtml(`${t("reviews.rating")}: ${rating} / 5`)}">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>`;
}

function translationNoteMarkup(review) {
  if (review.translatedFrom !== "Russian" || /translated from russian|перевод с русского/i.test(review.text ?? "")) return "";
  return '<small class="review-translation-note">Translated from Russian</small>';
}

function reviewPhotos(review) {
  const value = review.photos ?? review.images;
  const photos = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  return photos.map(safeReviewPhoto).filter(Boolean);
}

function reviewThumbnailsMarkup(review, photos) {
  if (!photos.length) return "";
  const name = review.userName ?? review.projectName ?? t("reviews.customer");
  return `<div class="review-photo-thumbnails">${photos.map((photo, index) => `<button class="review-photo-thumbnail" type="button" data-review-photo-index="${index}" aria-label="${escapeHtml(`${t("reviews.photoAlt").replace("{name}", name)} ${index + 1}`)}"><img src="${escapeHtml(photo)}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div>`;
}

function openReviewDetails(review, selectedPhoto = 0) {
  const title = review.userName ?? review.projectName ?? t("reviews.customer");
  const project = review.projectName ? `<p class="review-detail-project">${escapeHtml(review.projectName)}</p>` : "";
  const photos = reviewPhotos(review);
  const photoIndex = Math.min(Math.max(selectedPhoto, 0), Math.max(photos.length - 1, 0));
  const gallery = photos.length ? `<div class="review-gallery" data-photo-index="${photoIndex}" data-photo-count="${photos.length}">
    <div class="review-gallery-stage"><img class="review-gallery-image" src="${escapeHtml(photos[photoIndex])}" alt="${escapeHtml(`${t("reviews.photoAlt").replace("{name}", title)} ${photoIndex + 1}`)}">${photos.length > 1 ? `<button class="review-gallery-nav is-previous" type="button" data-photo-step="-1" aria-label="${escapeHtml(t("reviews.photoPrevious"))}">‹</button><button class="review-gallery-nav is-next" type="button" data-photo-step="1" aria-label="${escapeHtml(t("reviews.photoNext"))}">›</button>` : ""}</div>
    ${photos.length > 1 ? `<div class="review-gallery-meta"><span class="review-photo-count" aria-live="polite">${photoIndex + 1} / ${photos.length}</span>${reviewThumbnailsMarkup(review, photos)}</div>` : ""}
  </div>` : "";
  openModal(`<article class="review-detail">
    <div class="modal-heading"><p class="eyebrow" data-i18n="reviews.eyebrow"></p><h2 id="modal-title">${escapeHtml(title)}</h2></div>
    <div class="review-detail-author">${reviewPhotoMarkup(review, "review-detail-photo")}<div>${project}${ratingMarkup(review)}</div></div>
    ${gallery}
    <blockquote class="review-detail-text">${escapeHtml(review.text)}</blockquote>
    ${translationNoteMarkup(review)}
  </article>`);
  translateMarkup(modalContent());
  bindReviewPhotoFallbacks(modalContent());
  const galleryElement = modalContent().querySelector(".review-gallery");
  if (!galleryElement) return;
  const showPhoto = (index) => {
    const count = photos.length;
    const nextIndex = (index + count) % count;
    galleryElement.dataset.photoIndex = String(nextIndex);
    const image = galleryElement.querySelector(".review-gallery-image");
    image.src = photos[nextIndex];
    image.alt = `${t("reviews.photoAlt").replace("{name}", title)} ${nextIndex + 1}`;
    const countLabel = galleryElement.querySelector(".review-photo-count");
    if (countLabel) countLabel.textContent = `${nextIndex + 1} / ${count}`;
    galleryElement.querySelectorAll(".review-photo-thumbnail").forEach((thumbnail, thumbnailIndex) => {
      thumbnail.classList.toggle("is-selected", thumbnailIndex === nextIndex);
      thumbnail.setAttribute("aria-current", String(thumbnailIndex === nextIndex));
    });
  };
  galleryElement.addEventListener("click", (event) => {
    const stepButton = event.target.closest("[data-photo-step]");
    if (stepButton) {
      showPhoto(Number(galleryElement.dataset.photoIndex) + Number(stepButton.dataset.photoStep));
      return;
    }
    const thumbnail = event.target.closest("[data-review-photo-index]");
    if (thumbnail) showPhoto(Number(thumbnail.dataset.reviewPhotoIndex));
  });
  galleryElement.querySelector(".review-gallery-image").addEventListener("error", () => galleryElement.remove(), { once: true });
  galleryElement.querySelectorAll(".review-photo-thumbnail img").forEach((image) => {
    image.addEventListener("error", () => {
      const strip = image.closest(".review-photo-thumbnails");
      image.closest(".review-photo-thumbnail").remove();
      if (!strip.children.length) strip.remove();
    }, { once: true });
  });
  showPhoto(photoIndex);
}

function appendPublicReview(review) {
  const card = document.createElement("article");
  card.className = "review-card user-review-card";
  const title = review.userName ?? review.projectName ?? t("reviews.customer");
  const fullText = String(review.text ?? "");
  const characters = Array.from(fullText);
  const excerpt = characters.slice(0, 90).join("");
  const excerptText = characters.length > Array.from(excerpt).length
    ? `${excerpt.slice(0, Math.max(excerpt.lastIndexOf(" "), 65)).trimEnd()}…`
    : excerpt;
  const project = review.projectName ? `<p>${escapeHtml(review.projectName)}</p>` : "";
  const photos = reviewPhotos(review);
  card.innerHTML = `<div class="review-author">${reviewPhotoMarkup(review)}<div><h3>${escapeHtml(title)}</h3>${project}</div></div>
    ${ratingMarkup(review)}
    ${reviewThumbnailsMarkup(review, photos)}
    <blockquote>${escapeHtml(excerptText)}</blockquote>
    ${translationNoteMarkup(review)}
    <button class="text-button review-read-button" type="button" aria-haspopup="dialog" data-i18n="reviews.readReview"></button>`;
  card.querySelector(".review-read-button").addEventListener("click", () => openReviewDetails(review));
  card.querySelectorAll(".review-photo-thumbnail").forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => openReviewDetails(review, Number(thumbnail.dataset.reviewPhotoIndex)));
    thumbnail.querySelector("img").addEventListener("error", () => {
      const strip = thumbnail.parentElement;
      thumbnail.remove();
      if (!strip.children.length) strip.remove();
    }, { once: true });
  });
  translateMarkup(card);
  bindReviewPhotoFallbacks(card);
  reviewGrid.append(card);
}

async function refreshPublicReviews() {
  const locale = currentLocale();
  try {
    const reviews = await getPublicReviews(locale);
    if (locale !== currentLocale()) return;
    approvedReviews = reviews;
    reviewPage = 0;
    renderReviewPage();
  } catch {
    approvedReviews = [];
    reviewPage = 0;
    renderReviewPage();
    notify(t("common.unknownError"));
  }
}

function initializeInteractions() {
  bindModalControls();
  initializePricing();
  socialsOpenButton?.addEventListener("click", openSocialsModal);
  contactSocialsOpenButton?.addEventListener("click", openSocialsModal);
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-nav");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("is-open", !expanded);
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    });
  });

  document.querySelectorAll(".reviews__prev, .reviews__next").forEach((button) => {
    button.addEventListener("click", () => {
      const totalPages = getReviewPage(approvedReviews, reviewPage).totalPages;
      if (!totalPages) return;
      const delta = button.classList.contains("next") ? 1 : -1;
      reviewPage = getReviewPage(approvedReviews, reviewPage + delta).page;
      if (!document.querySelector("#modal-backdrop").hidden) closeModal();
      renderReviewPage();
      document.querySelector("#reviews").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const gallery = modalContent().querySelector(".review-gallery");
    if (!gallery || Number(gallery.dataset.photoCount) < 2) return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const button = gallery.querySelector(`[data-photo-step="${step}"]`);
    button?.click();
  });

  document.addEventListener("volt:languagechange", () => {
    document.title = t("page.title");
    if (socialsModalOpen && modalContent().querySelector(".socials-modal")) {
      modalContent().innerHTML = renderSocialsModal();
    }
    refreshPublicReviews();
  });
  document.addEventListener("site:modalclosed", () => { socialsModalOpen = false; });
}

function initialize() {
  configureTelegramLinks();
  initializeInteractions();
  initializeLocalization().then(async () => {
    await refreshPublicReviews();
    try {
      initializePortfolio(await getPortfolioCatalog());
    } catch {
      initializePortfolio({ categories: [] });
      notify(t("portfolio.loadFailed"));
    }
  });
}

initialize();
