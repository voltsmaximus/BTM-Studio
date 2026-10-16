import test from "node:test";
import assert from "node:assert/strict";
import { getReviewPage } from "../js/services/review-pagination.mjs";

for (const count of [1, 3, 4, 6, 7, 10]) {
  test(`${count} reviews paginate in groups of three`, () => {
    const reviews = Array.from({ length: count }, (_, index) => `review-${index + 1}`);
    const expectedPages = Math.ceil(count / 3);
    const first = getReviewPage(reviews, 0);

    assert.equal(first.totalPages, expectedPages);
    assert.equal(first.page, 0);
    assert.equal(first.reviews.length, Math.min(3, count));

    const second = getReviewPage(reviews, 1);
    if (expectedPages > 1) {
      assert.equal(second.page, 1);
      assert.equal(second.reviews[0], "review-4");
      assert.ok(second.reviews.length <= 3);
      assert.deepEqual(getReviewPage(reviews, -1), getReviewPage(reviews, expectedPages - 1));
    } else {
      assert.equal(second.page, 0);
      assert.deepEqual(second.reviews, first.reviews);
    }
  });
}

test("empty review list returns an empty page without errors", () => {
  assert.deepEqual(getReviewPage([], 0), { page: 0, totalPages: 0, reviews: [] });
});
