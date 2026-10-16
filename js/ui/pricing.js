import { t } from "../localization.js?v=20261013-visible-text";
import { modalContent, openModal } from "./modal.js";

const openButton = document.querySelector("#pricing-open");
let isOpen = false;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderPricing() {
  const sizes = ["50 × 50", "100 × 100", "200 × 200", "300 × 300"];
  const prices = [["~$5", "~$10", "~$15"], ["~$15", "~$20", "~$30"], ["~$25", "~$40", "~$60"], ["~$35", "~$50", "~$80"]];
  const levels = [
    { title: t("pricing.simple"), items: [t("pricing.simplePoint1"), t("pricing.simplePoint2")] },
    { title: t("pricing.standard"), items: [t("pricing.standardPoint1"), t("pricing.standardPoint2")] },
    { title: t("pricing.premium"), items: [t("pricing.premiumPoint1"), t("pricing.premiumPoint2")] }
  ];
  const services = [
    { title: t("pricing.interior"), amount: "~+10%" },
    { title: t("pricing.urgent"), amount: "~+50%" }
  ];

  return `<div class="pricing-modal" aria-labelledby="modal-title">
    <div class="modal-heading pricing-modal-heading"><p class="eyebrow">${escapeHtml(t("pricing.eyebrow"))}</p><h2 id="modal-title">${escapeHtml(t("pricing.modalTitle"))}</h2></div>
    <section class="pricing-group" aria-labelledby="pricing-spawns-title">
      <h3 id="pricing-spawns-title">${escapeHtml(t("pricing.spawns"))}</h3>
      <div class="pricing-table-scroll" role="region" tabindex="0" aria-label="${escapeHtml(t("pricing.tableLabel"))}">
        <table class="pricing-table"><thead><tr><th scope="col">${escapeHtml(t("pricing.size"))}</th><th scope="col">${escapeHtml(t("pricing.simple"))}</th><th scope="col">${escapeHtml(t("pricing.standard"))}</th><th scope="col">${escapeHtml(t("pricing.premium"))}</th></tr></thead>
        <tbody>${sizes.map((size, index) => `<tr><th scope="row">${size}</th>${prices[index].map((price) => `<td>${price}</td>`).join("")}</tr>`).join("")}</tbody></table>
      </div>
    </section>
    <section class="pricing-group" aria-labelledby="pricing-levels-title">
      <h3 id="pricing-levels-title">${escapeHtml(t("pricing.levels"))}</h3>
      <div class="pricing-detail-grid">${levels.map((level) => `<article class="pricing-detail-card"><h4>${escapeHtml(level.title)}</h4><ul>${level.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`).join("")}</div>
    </section>
    <section class="pricing-group" aria-labelledby="pricing-services-title">
      <h3 id="pricing-services-title">${escapeHtml(t("pricing.services"))}</h3>
      <p class="pricing-note">${escapeHtml(t("pricing.addonNote"))}</p>
      <div class="pricing-service-grid">${services.map((service) => `<article class="pricing-service-card"><h4>${escapeHtml(service.title)}</h4><p>${service.amount} ${escapeHtml(t("pricing.orderPrice"))}</p></article>`).join("")}</div>
    </section>
    <section class="pricing-group" aria-labelledby="pricing-individual-title">
      <h3 id="pricing-individual-title">${escapeHtml(t("pricing.individual"))}</h3>
      <ul class="pricing-individual-list"><li>${escapeHtml(t("pricing.largeProjects"))}</li><li>${escapeHtml(t("pricing.otherProjects"))}</li></ul>
    </section>
    <p class="pricing-note pricing-disclaimer">${escapeHtml(t("pricing.approximateNote"))}</p>
  </div>`;
}

export function initializePricing() {
  if (!openButton) return;
  openButton.addEventListener("click", () => {
    isOpen = true;
    openModal(renderPricing(), { variant: "portfolio" });
  });
  document.addEventListener("volt:languagechange", () => {
    if (!isOpen || !modalContent().querySelector(".pricing-modal")) return;
    modalContent().innerHTML = renderPricing();
  });
  document.addEventListener("site:modalclosed", () => { isOpen = false; });
}
