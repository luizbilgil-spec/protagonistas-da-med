import { SM2Data, ReviewRating } from '../types';

export function calculateSM2(
  current: SM2Data,
  rating: ReviewRating
): SM2Data {
  let { repetitions, interval, easeFactor, lapseCount, totalReviews } = current;

  // Map review rating to quality score (0 to 5)
  let quality: number;
  switch (rating) {
    case 'again':
      quality = 1;
      break;
    case 'hard':
      quality = 2;
      break;
    case 'good':
      quality = 4;
      break;
    case 'easy':
      quality = 5;
      break;
  }

  totalReviews += 1;

  if (quality < 3) {
    // Failure (Again / Hard lapse)
    repetitions = 0;
    interval = 1; // 1 day
    lapseCount += 1;
  } else {
    // Successful recall
    if (repetitions === 0) {
      interval = rating === 'easy' ? 3 : 1;
    } else if (repetitions === 1) {
      interval = rating === 'easy' ? 6 : 4;
    } else {
      const bonus = rating === 'easy' ? 1.3 : 1.0;
      interval = Math.max(1, Math.round(interval * easeFactor * bonus));
    }
    repetitions += 1;
  }

  // Update ease factor (minimum 1.3)
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    repetitions,
    interval,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate: nextDate.toISOString(),
    lastReviewedDate: new Date().toISOString(),
    totalReviews,
    lapseCount,
  };
}

export function isCardDue(nextReviewDate: string): boolean {
  return new Date(nextReviewDate) <= new Date();
}

export function getDaysUntilReview(nextReviewDate: string): number {
  const diff = new Date(nextReviewDate).getTime() - new Date().getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}
