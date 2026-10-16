const reviewsUrl = new URL("../../data/approved-reviews.json", import.meta.url);

export async function getPublicReviews(locale) {
  const response = await fetch(reviewsUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("reviews.loadFailed");

  const records = await response.json();
  return records
    .filter((review) => review.status === "approved")
    .map((review) => {
      const localized = review.locales?.[locale] ?? review.locales?.ru ?? {};
      return {
        id: review.id,
        userName: localized.name,
        projectName: localized.project,
        text: localized.text,
        translatedFrom: localized.translatedFrom,
        rating: review.rating,
        image: localized.image ?? review.image ?? null,
        photos: localized.photos ?? localized.images ?? review.photos ?? review.images ?? []
      };
    });
}
