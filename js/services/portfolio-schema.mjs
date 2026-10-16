export function hasPortfolioReviewLink(project) {
  return typeof project?.reviewId === "string" && Boolean(project.reviewId.trim());
}

export function flattenPortfolioProjects(catalog) {
  return (catalog?.categories ?? []).flatMap((category) => [
    ...(category.projects ?? []),
    ...(category.subcategories ?? []).flatMap((subcategory) => subcategory.projects ?? [])
  ]);
}

export function getPortfolioBranch(category, subcategoryId = null) {
  if (!category) return { subcategory: null, items: [] };
  const subcategory = category.subcategories?.find((item) => item.id === subcategoryId) ?? null;
  return {
    subcategory,
    items: subcategory
      ? (subcategory.projects ?? [])
      : category.subcategories?.length
        ? category.subcategories
        : (category.projects ?? [])
  };
}
