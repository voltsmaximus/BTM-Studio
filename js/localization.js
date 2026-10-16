const LANGUAGE_KEY = "volt.language";
const fallbackTranslations = {
  ru: {
    "page.title": "BTM — Builds To Move: постройки в Minecraft и разработка сайтов",
    "page.description": "Строим уникальные миры в Minecraft и разрабатываем современные сайты.",
    "header.navigation": "Основная навигация",
    "header.about": "О нас",
    "header.portfolio": "Портфолио",
    "header.reviews": "Отзывы",
    "header.contact": "Контакты",
    "header.language": "Выбор языка",
    "header.menu": "Открыть меню",
    "hero.eyebrow": "Строим ваши идеи",
    "hero.title": "Уникальные постройки",
    "hero.titleAccent": "в Minecraft",
    "hero.description": "Мы создаём детализированные постройки, локации и целые миры для серверов, проектов и личного использования. А также разрабатываем современные сайты под ваши задачи.",
    "hero.cta": "Наши соцсети",
    "socials.title": "Мы в соцсетях",
    "socials.tiktok": "Наш TikTok",
    "socials.channel": "Наш Telegram-канал",
    "socials.order": "Заказать услугу",
    "socials.orderDescription": "Напишите нам напрямую, чтобы обсудить ваш проект.",
    "socials.contactTiktok": "TikTok",
    "socials.contactChannel": "Telegram-канал",
    "hero.image": "Мрачная средневековая крепость среди гор",
    "about.eyebrow": "О нас",
    "about.title": "Кто мы?",
    "about.description": "Мы — команда профессионалов, которая занимается созданием качественного контента в Minecraft и разработкой сайтов. Наша цель — воплощать ваши идеи в реальность, соблюдая сроки, стиль и высокое качество.",
    "about.cta": "Узнать больше",
    "about.quality": "Качество",
    "about.qualityDescription": "Детали, которые делают разницу.",
    "about.deadlines": "Соблюдение сроков",
    "about.deadlinesDescription": "Всегда на связи и в срок.",
    "about.personal": "Индивидуальный подход",
    "about.personalDescription": "Учитываем все ваши пожелания.",
    "about.reliability": "Надёжность",
    "about.reliabilityDescription": "Работаем честно и прозрачно.",
    "portfolio.eyebrow": "Портфолио",
    "portfolio.title": "Наши работы",
    "portfolio.loadFailed": "Не удалось загрузить портфолио.",
    "portfolio.project": "Проект",
    "portfolio.backToCategories": "Назад к категориям",
    "portfolio.backToWorks": "Назад к работам",
    "portfolio.backToSubcategories": "Назад к подкатегориям",
    "portfolio.backToProjects": "Назад к проектам",
    "portfolio.emptyCategory": "Проекты скоро появятся.",
    "portfolio.categoryMenu": "Категория портфолио",
    "portfolio.photoPrevious": "Предыдущая фотография проекта",
    "portfolio.photoNext": "Следующая фотография проекта",
    "portfolio.dimensions": "Масштабы",
    "portfolio.photoPending": "Фотография не предоставлена. Поместите файл сюда: {file}",
    "portfolio.reviewLink": "Читать отзыв",
    "pricing.eyebrow": "Прайс-лист",
    "pricing.title": "Стоимость работ",
    "pricing.description": "Стоимость постройки спавна зависит от размера и выбранной детализации.",
    "pricing.open": "Посмотреть прайс",
    "pricing.modalTitle": "Прайс-лист",
    "pricing.spawns": "Спавны — стоимость постройки",
    "pricing.tableLabel": "Стоимость постройки спавнов по размеру и уровню детализации",
    "pricing.size": "Размер",
    "pricing.simple": "Простая детализация",
    "pricing.standard": "Стандартная детализация",
    "pricing.premium": "Премиум",
    "pricing.levels": "Виды детализации",
    "pricing.simplePoint1": "Простые, повторяющиеся детали.",
    "pricing.simplePoint2": "Общий вид постройки остаётся простым.",
    "pricing.standardPoint1": "Более сложные и разнообразные детали.",
    "pricing.standardPoint2": "Постройка выглядит живой и проработанной.",
    "pricing.premiumPoint1": "Индивидуальные детали.",
    "pricing.premiumPoint2": "Высокая степень проработки и выразительный внешний вид постройки.",
    "pricing.services": "Дополнительные услуги",
    "pricing.addonNote": "Проценты начисляются дополнительно к основной стоимости заказа.",
    "pricing.interior": "Интерьер",
    "pricing.urgent": "Срочный заказ",
    "pricing.orderPrice": "к стоимости заказа",
    "pricing.individual": "Индивидуальные проекты",
    "pricing.largeProjects": "Размеры более 300 × 300 — стоимость обсуждается индивидуально.",
    "pricing.otherProjects": "Постройки, не относящиеся к спавнам, лобби и хабам, — стоимость обсуждается индивидуально.",
    "reviews.eyebrow": "Отзывы",
    "reviews.title": "Что говорят клиенты",
    "reviews.controls": "Управление отзывами",
    "reviews.previous": "Предыдущие отзывы",
    "reviews.next": "Следующие отзывы",
    "reviews.customer": "Клиент BTM",
    "reviews.readReview": "Читать отзыв",
    "reviews.photoAlt": "Фотография: {name}",
    "reviews.photoPrevious": "Предыдущая фотография",
    "reviews.photoNext": "Следующая фотография",
    "reviews.rating": "Оценка",
    "cta.title": "Готовы к новому проекту?",
    "cta.description": "Напишите нам, и мы обсудим вашу идею!",
    "cta.button": "Написать в Telegram",
    "footer.navigation": "Навигация в подвале",
    "footer.copyright": "© 2026 BTM. Все права защищены.",
    "footer.social": "Социальные сети",
    "common.close": "Закрыть",
    "common.translationsUnavailable": "Не удалось загрузить переводы.",
    "common.unknownError": "Что-то пошло не так. Попробуйте ещё раз."
  },
  en: {
    "page.title": "BTM — Builds To Move | Minecraft builds and website development",
    "page.description": "We build unique Minecraft worlds and develop modern websites.",
    "header.navigation": "Main navigation",
    "header.about": "About",
    "header.portfolio": "Portfolio",
    "header.reviews": "Reviews",
    "header.contact": "Contact",
    "header.language": "Choose language",
    "header.menu": "Open navigation",
    "hero.eyebrow": "Building your ideas",
    "hero.title": "Unique builds",
    "hero.titleAccent": "in Minecraft",
    "hero.description": "We create detailed builds, locations, and entire worlds for servers, projects, and personal use. We also develop modern websites tailored to your needs.",
    "hero.cta": "Our Socials",
    "socials.title": "Find Us Online",
    "socials.tiktok": "Our TikTok",
    "socials.channel": "Our Telegram Channel",
    "socials.order": "Order a Service",
    "socials.orderDescription": "Message us directly to discuss your project.",
    "socials.contactTiktok": "TikTok",
    "socials.contactChannel": "Telegram Channel",
    "hero.image": "A dark medieval fortress among the mountains",
    "about.eyebrow": "About us",
    "about.title": "Who are we?",
    "about.description": "We are a team of professionals creating quality Minecraft content and developing websites. Our goal is to bring your ideas to life with care for deadlines, style, and quality.",
    "about.cta": "Learn more",
    "about.quality": "Quality",
    "about.qualityDescription": "Details that make a difference.",
    "about.deadlines": "On schedule",
    "about.deadlinesDescription": "Always responsive and on time.",
    "about.personal": "Personal approach",
    "about.personalDescription": "Your preferences come first.",
    "about.reliability": "Reliability",
    "about.reliabilityDescription": "Honest and transparent work.",
    "portfolio.eyebrow": "Portfolio",
    "portfolio.title": "Our work",
    "portfolio.loadFailed": "Couldn't load the portfolio.",
    "portfolio.project": "Project",
    "portfolio.backToCategories": "Back to categories",
    "portfolio.backToWorks": "Back to subcategories",
    "portfolio.backToSubcategories": "Back to subcategories",
    "portfolio.backToProjects": "Back to projects",
    "portfolio.emptyCategory": "Projects coming soon.",
    "portfolio.categoryMenu": "Portfolio category",
    "portfolio.photoPrevious": "Previous project photo",
    "portfolio.photoNext": "Next project photo",
    "portfolio.dimensions": "Dimensions",
    "portfolio.photoPending": "Photo not provided. Place the file here: {file}",
    "portfolio.reviewLink": "Read review",
    "pricing.eyebrow": "Pricing",
    "pricing.title": "Our pricing",
    "pricing.description": "The cost of a spawn build depends on its size and chosen level of detail.",
    "pricing.open": "View pricing",
    "pricing.modalTitle": "Price List",
    "pricing.spawns": "Spawns — build cost",
    "pricing.tableLabel": "Spawn build prices by size and level of detail",
    "pricing.size": "Size",
    "pricing.simple": "Simple detail",
    "pricing.standard": "Standard detail",
    "pricing.premium": "Premium",
    "pricing.levels": "Levels of detail",
    "pricing.simplePoint1": "Simple, repeating details.",
    "pricing.simplePoint2": "The overall build remains simple.",
    "pricing.standardPoint1": "More complex and varied details.",
    "pricing.standardPoint2": "The build looks lively and carefully developed.",
    "pricing.premiumPoint1": "Custom details.",
    "pricing.premiumPoint2": "A high level of detail and an expressive overall appearance.",
    "pricing.services": "Additional services",
    "pricing.addonNote": "These percentages are added to the base order price.",
    "pricing.interior": "Interior",
    "pricing.urgent": "Rush order",
    "pricing.orderPrice": "of the order price",
    "pricing.individual": "Custom projects",
    "pricing.largeProjects": "Sizes over 300 × 300 — price discussed individually.",
    "pricing.otherProjects": "Builds other than spawns, lobbies, and hubs — price discussed individually.",
    "reviews.eyebrow": "Reviews",
    "reviews.title": "What our clients say",
    "reviews.controls": "Review controls",
    "reviews.previous": "Previous reviews",
    "reviews.next": "Next reviews",
    "reviews.customer": "BTM client",
    "reviews.readReview": "Read review",
    "reviews.photoAlt": "Photo: {name}",
    "reviews.photoPrevious": "Previous photo",
    "reviews.photoNext": "Next photo",
    "reviews.rating": "Rating",
    "cta.title": "Ready for a new project?",
    "cta.description": "Get in touch and let's discuss your idea!",
    "cta.button": "Message us on Telegram",
    "footer.navigation": "Footer navigation",
    "footer.copyright": "© 2026 BTM. All rights reserved.",
    "footer.social": "Social media",
    "common.close": "Close",
    "common.translationsUnavailable": "Couldn't load translations.",
    "common.unknownError": "Something went wrong. Please try again."
  }
};

let translations;
let currentLanguage = readSavedLanguage();

function readSavedLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "ru";
  } catch {
    return "ru";
  }
}

function getValue(key) {
  return key.split(".").reduce((value, part) => value?.[part], translations?.[currentLanguage]);
}

export function t(key) {
  const translated = getValue(key);
  if (typeof translated === "string" && translated.trim()) return translated;
  return fallbackTranslations[currentLanguage][key] ?? key;
}

function translateText(element, key) {
  const translated = getValue(key);
  const fallback = fallbackTranslations[currentLanguage][key];
  const value = typeof translated === "string" && translated.trim() ? translated : fallback;
  if (value) element.textContent = value;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    translateText(element, element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const translated = t(element.dataset.i18nPlaceholder);
    if (translated) element.placeholder = translated;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const translated = t(element.dataset.i18nAria);
    if (translated) element.setAttribute("aria-label", translated);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const translated = t(element.dataset.i18nAlt);
    if (translated) element.alt = translated;
  });
  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const translated = t(element.dataset.i18nContent);
    if (translated) element.content = translated;
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    const selected = button.dataset.language === currentLanguage;
    button.classList.toggle("lang-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

export async function initializeLocalization() {
  try {
    const response = await fetch(new URL("../locales/translations.json?v=20261016-professionals", import.meta.url), {
      cache: "no-store"
    });
    if (!response.ok) throw new Error("Translation request failed: " + response.status);
    const loadedTranslations = await response.json();
    if (!loadedTranslations?.ru || !loadedTranslations?.en) throw new Error("Translation dictionary is incomplete.");
    translations = loadedTranslations;
  } catch {
    translations = undefined;
  }
  applyTranslations();
  document.title = t("page.title");
  return Boolean(translations);
}

export function setLanguage(language) {
  if (!fallbackTranslations[language]) return;
  currentLanguage = language;
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch {
    // The language still changes for this page view when storage is unavailable.
  }
  applyTranslations();
  document.dispatchEvent(new CustomEvent("volt:languagechange", { detail: language }));
}

export function currentLocale() {
  return currentLanguage;
}

export function translateMarkup(root) {
  root.querySelectorAll("[data-i18n]").forEach((element) => {
    translateText(element, element.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  root.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  root.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = t(element.dataset.i18nAlt);
  });
  root.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.content = t(element.dataset.i18nContent);
  });
}
