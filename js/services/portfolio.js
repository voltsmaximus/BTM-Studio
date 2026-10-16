const portfolioUrl = new URL("../../data/portfolio.json", import.meta.url);

export async function getPortfolioCatalog() {
  const response = await fetch(portfolioUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("portfolio.loadFailed");

  const catalog = await response.json();
  if (!Array.isArray(catalog.categories)) throw new Error("portfolio.invalidCatalog");
  return catalog;
}
