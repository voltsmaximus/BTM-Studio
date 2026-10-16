export const REVIEWS_PER_PAGE = 3;

export function getReviewPage(reviews, page, pageSize = REVIEWS_PER_PAGE) {
  const totalPages = Math.ceil(reviews.length / pageSize);
  const currentPage = totalPages
    ? ((Math.trunc(page) % totalPages) + totalPages) % totalPages
    : 0;

  return {
    page: currentPage,
    totalPages,
    reviews: reviews.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  };
}
