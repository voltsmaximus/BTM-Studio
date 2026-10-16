const backdrop = document.querySelector("#modal-backdrop");
const modal = backdrop.querySelector(".site-modal");
const content = document.querySelector("#modal-content");
let returnFocus = null;
let closeTimer = 0;
let previousBodyOverflow = "";

export function openModal(markup, { variant = null } = {}) {
  window.clearTimeout(closeTimer);
  returnFocus = document.activeElement;
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  modal.classList.toggle("is-portfolio-modal", variant === "portfolio");
  content.innerHTML = markup;
  backdrop.hidden = false;
  requestAnimationFrame(() => {
    backdrop.classList.add("is-open");
    modal.querySelector("input, button, textarea")?.focus();
  });
}

export function closeModal() {
  backdrop.classList.remove("is-open");
  window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(() => {
    backdrop.hidden = true;
    document.body.style.overflow = previousBodyOverflow;
    content.replaceChildren();
    modal.classList.remove("is-portfolio-modal");
    returnFocus?.focus();
    document.dispatchEvent(new CustomEvent("site:modalclosed"));
  }, 180);
}

export function modalContent() {
  return content;
}

export function bindModalControls() {
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop || event.target.closest(".modal-close")) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (backdrop.hidden) return;
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => element.getClientRects().length > 0);
    if (!focusable.length) {
      event.preventDefault();
      modal.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });
}

export function notify(message, action) {
  const region = document.querySelector("#toast-region");
  const toast = document.createElement("div");
  toast.className = "toast";

  const text = document.createElement("span");
  text.textContent = message;
  toast.append(text);

  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.addEventListener("click", () => {
      action.run();
      toast.remove();
    });
    toast.append(button);
  }

  region.append(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 180);
  }, 6000);
}
