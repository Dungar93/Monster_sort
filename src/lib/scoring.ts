export interface ScoreCalculationInput {
  totalMonsters: number;
  correctPlacements: number;
  incorrectAttempts: number;
  hintsUsed: number;
  difficultyMode?: 'explorer' | 'scholar';
  elapsedSeconds?: number;
}

export interface ScoreResult {
  score: number;
  stars: number;
  accuracy: number; // 0-100%
  gradeDescription: string;
}

/**
 * Calculates score, stars (1-3), and accuracy for a completed level.
 * - Explorer Mode: Friendly, untimed, based on base score + accuracy bonus - hint penalty.
 * - Scholar Mode: Timed challenge, formal formula: S = max(0, 1000 - 10t - 50m)
 *   where t = elapsedSeconds and m = incorrectAttempts.
 */
export function calculateLevelScore(input: ScoreCalculationInput): ScoreResult {
  const {
    correctPlacements,
    incorrectAttempts,
    hintsUsed,
    difficultyMode = 'explorer',
    elapsedSeconds = 0,
  } = input;
  const totalTries = correctPlacements + incorrectAttempts;
  const accuracy = totalTries > 0 ? Math.round((correctPlacements / totalTries) * 100) : 100;

  if (difficultyMode === 'scholar') {
    // Exact Scholar Mode formula: S = max(0, 1000 - 10*t - 50*m)
    const scholarScore = Math.max(0, 1000 - 10 * elapsedSeconds - 50 * incorrectAttempts);

    // Stars based on scholar score:
    // 3 stars: >= 750 points (fast with minimal errors)
    // 2 stars: >= 400 points
    // 1 star: otherwise
    let stars = 1;
    if (scholarScore >= 750) {
      stars = 3;
    } else if (scholarScore >= 400) {
      stars = 2;
    } else {
      stars = 1;
    }

    let gradeDescription = 'Scholar Apprentice!';
    if (stars === 3) {
      gradeDescription = `Flawless Discrete Scholar! (${scholarScore} pts in ${elapsedSeconds}s) ⭐⭐⭐`;
    } else if (stars === 2) {
      gradeDescription = `Proficient Mathematical Sorter! (${scholarScore} pts) ⭐⭐`;
    } else {
      gradeDescription = `Completed with Deductions (${scholarScore} pts) ⭐`;
    }

    return {
      score: scholarScore,
      stars,
      accuracy,
      gradeDescription,
    };
  }

  // Explorer Mode:
  // Base score: 10 points per monster
  const baseScore = correctPlacements * 10;

  // Accuracy bonus
  const accuracyBonus = Math.round((accuracy / 100) * 30);

  // Small penalty for hints (without punishing excessively)
  const hintPenalty = Math.min(hintsUsed * 5, 20);

  const finalScore = Math.max(10, baseScore + accuracyBonus - hintPenalty);

  // Stars:
  // 3 stars: >= 85% accuracy and <= 1 hint
  // 2 stars: >= 60% accuracy and <= 2 hints
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
