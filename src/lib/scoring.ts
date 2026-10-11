export interface ScoreCalculationInput {
  totalMonsters: number;
  correctPlacements: number;
  incorrectAttempts: number;
  hintsUsed: number;
}

export interface ScoreResult {
  score: number;
  stars: number;
  accuracy: number; // 0-100%
  gradeDescription: string;
}

/**
 * Calculates score, stars (1-3), and accuracy for a completed level.
 */
export function calculateLevelScore(input: ScoreCalculationInput): ScoreResult {
  const { correctPlacements, incorrectAttempts, hintsUsed } = input;
  const totalTries = correctPlacements + incorrectAttempts;
  const accuracy = totalTries > 0 ? Math.round((correctPlacements / totalTries) * 100) : 100;

  // Base score: 10 points per monster
  const baseScore = correctPlacements * 10;

  // Accuracy bonus
  const accuracyBonus = Math.round((accuracy / 100) * 30);

  // Small penalty for hints (without punishing excessively)
  const hintPenalty = Math.min(hintsUsed * 5, 20);

  const finalScore = Math.max(10, baseScore + accuracyBonus - hintPenalty);

  // Stars:
  // 3 stars: >= 90% accuracy and <= 1 hint
  // 2 stars: >= 60% accuracy and <= 3 hints
  // 1 star: otherwise
  let stars = 1;
  if (accuracy >= 85 && hintsUsed <= 1) {
    stars = 3;
  } else if (accuracy >= 60 && hintsUsed <= 2) {
    stars = 2;
  } else {
    stars = 1;
  }

  let gradeDescription = 'Monster Apprentice!';
  if (stars === 3) {
    gradeDescription = 'Flawless Master of Logic! ⭐⭐⭐';
  } else if (stars === 2) {
    gradeDescription = 'Superb Sorting Skills! ⭐⭐';
  } else {
    gradeDescription = 'Good Effort, Keep Exploring! ⭐';
  }

  return {
    score: finalScore,
    stars,
    accuracy,
    gradeDescription,
  };
}
