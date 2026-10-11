import { describe, it, expect } from 'vitest';
import {
  validatePlacement,
  checkLevelCompletion,
  getExpectedRegion,
} from '@/lib/game-engine';
import { calculateLevelScore } from '@/lib/scoring';
import {
  recordLevelCompletion,
  INITIAL_GAME_PROGRESS,
  loadGameProgress,
} from '@/lib/progress-storage';
import { GROUND_TRUTH_MONSTERS } from '@/data/monsters';
import { LevelConfig, Monster } from '@/types/game';

describe('Game Engine & Mechanics Tests', () => {
  const mockLevel: LevelConfig = {
    id: 'test-level-1',
    worldId: 2,
    levelNumber: 1,
    title: 'Venn Valley Trial',
    subtitle: 'Red & Horns',
    mission: 'Sort monsters into Red vs Horned Venn Diagram',
    instruction: 'Drag each monster to its correct zone.',
    storyTip: 'Look at colors and horns!',
    conceptTitle: 'Two-Set Venn Diagrams',
    conceptExplanation: 'Intersecting sets divide the world into 4 parts.',
    formalMath: 'R ∩ H',
    type: 'two_set_venn',
    monsters: GROUND_TRUTH_MONSTERS,
    sets: [
      {
        id: 'R',
        symbol: 'R',
        label: 'Red Monsters',
        color: '#ef4444',
        predicate: (m: Monster) => m.color === 'red',
        predicateDescription: 'is red',
        mathNotation: 'R = {x ∈ U | x.color = red}',
      },
      {
        id: 'H',
        symbol: 'H',
        label: 'Horned Monsters',
        color: '#3b82f6',
        predicate: (m: Monster) => m.horns,
        predicateDescription: 'has horns',
        mathNotation: 'H = {x ∈ U | x.horns = true}',
      },
    ],
    explanation: 'M1 and M6 belong in the center intersection.',
    hints: ['Check whether the monster has horns and is red.'],
  };

  it('accepts correct placements and rejects incorrect placements', () => {
    // M1 belongs in INTERSECTION_AB
    const correctTry = validatePlacement(mockLevel, GROUND_TRUTH_MONSTERS[0], 'INTERSECTION_AB');
    expect(correctTry.isCorrect).toBe(true);

    const wrongTry = validatePlacement(mockLevel, GROUND_TRUTH_MONSTERS[0], 'A_ONLY');
    expect(wrongTry.isCorrect).toBe(false);
    expect(wrongTry.feedbackMessage).toBeDefined();
  });

  it('verifies level completion only when all monsters are in correct regions', () => {
    const incompletePlacements: Record<string, string> = {
      M1: 'INTERSECTION_AB',
      M2: 'B_ONLY',
    };
    expect(checkLevelCompletion(mockLevel, incompletePlacements)).toBe(false);

    // Complete placements
    const completePlacements: Record<string, string> = {};
    for (const m of mockLevel.monsters) {
      completePlacements[m.id] = getExpectedRegion(mockLevel, m);
    }
    expect(checkLevelCompletion(mockLevel, completePlacements)).toBe(true);

    // With one incorrect placement
    completePlacements['M1'] = 'OUTSIDE';
    expect(checkLevelCompletion(mockLevel, completePlacements)).toBe(false);
  });

  it('calculates score and stars consistently', () => {
    // Perfect run: 6 correct, 0 mistakes, 0 hints -> 3 stars
    const perfect = calculateLevelScore({
      totalMonsters: 6,
      correctPlacements: 6,
      incorrectAttempts: 0,
      hintsUsed: 0,
    });
    expect(perfect.stars).toBe(3);
    expect(perfect.accuracy).toBe(100);
    expect(perfect.score).toBeGreaterThan(60);

    // Run with several mistakes -> 2 stars
    const okay = calculateLevelScore({
      totalMonsters: 6,
      correctPlacements: 6,
      incorrectAttempts: 3,
      hintsUsed: 1,
    });
    expect(okay.stars).toBe(2);

    // Run with heavy mistakes -> 1 star
    const struggling = calculateLevelScore({
      totalMonsters: 6,
      correctPlacements: 6,
      incorrectAttempts: 8,
      hintsUsed: 4,
    });
    expect(struggling.stars).toBe(1);

    // Scholar Mode formula: S = max(0, 1000 - 10t - 50m)
    const scholarFast = calculateLevelScore({
      totalMonsters: 6,
      correctPlacements: 6,
      incorrectAttempts: 1, // m = 1
      hintsUsed: 0,
      difficultyMode: 'scholar',
      elapsedSeconds: 20, // t = 20 -> 1000 - 200 - 50 = 750
    });
    expect(scholarFast.score).toBe(750);
    expect(scholarFast.stars).toBe(3);

    const scholarSlow = calculateLevelScore({
      totalMonsters: 6,
      correctPlacements: 6,
      incorrectAttempts: 4, // m = 4
      hintsUsed: 0,
      difficultyMode: 'scholar',
      elapsedSeconds: 50, // t = 50 -> 1000 - 500 - 200 = 300
    });
    expect(scholarSlow.score).toBe(300);
    expect(scholarSlow.stars).toBe(1);

    const scholarFloor = calculateLevelScore({
      totalMonsters: 6,
      correctPlacements: 6,
      incorrectAttempts: 10,
      hintsUsed: 0,
      difficultyMode: 'scholar',
      elapsedSeconds: 120, // 1000 - 1200 - 500 = -700 -> max(0, -700) = 0
    });
    expect(scholarFloor.score).toBe(0);
  });

  it('records level completion and handles world unlocks and badges', () => {
    let progress = { ...INITIAL_GAME_PROGRESS };

    // Record completing level 1 with 3 stars
    progress = recordLevelCompletion(progress, 'level-1-1', 1, {
      score: 90,
      stars: 3,
      accuracy: 100,
      attempts: 6,
      hintsUsed: 0,
    });

    expect(progress.completedLevels['level-1-1']).toBeDefined();
    expect(progress.totalStars).toBe(3);
    expect(progress.totalScore).toBe(90);
    expect(progress.badges).toContain('first_sort');
    // Total stars >= 3 unlocks World 2
    expect(progress.unlockedWorlds).toContain(2);
  });

  it('gracefully handles empty or missing stored progress without crashing', () => {
    const loaded = loadGameProgress();
    expect(loaded).toBeDefined();
    expect(loaded.unlockedWorlds).toContain(1);
    expect(loaded.completedLevels).toBeDefined();
  });
});
