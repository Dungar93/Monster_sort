import { GameProgress, LevelProgress } from '@/types/game';

const STORAGE_KEY = 'monster_sort_game_progress_v1';

export const INITIAL_GAME_PROGRESS: GameProgress = {
  currentWorldId: 1,
  completedLevels: {},
  totalScore: 0,
  totalStars: 0,
  unlockedWorlds: [1], // World 1 is always unlocked initially
  badges: [],
  soundEnabled: true,
  difficultyMode: 'explorer',
};

let storeProgress: GameProgress = INITIAL_GAME_PROGRESS;
const listeners = new Set<() => void>();

function notifyListeners() {
  for (const listener of listeners) {
    listener();
  }
}

/**
 * Safely load progress from localStorage with robust error handling.
 */
export function loadGameProgress(): GameProgress {
  if (typeof window === 'undefined') {
    return INITIAL_GAME_PROGRESS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      storeProgress = INITIAL_GAME_PROGRESS;
      return INITIAL_GAME_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      storeProgress = INITIAL_GAME_PROGRESS;
      return INITIAL_GAME_PROGRESS;
    }

    const loaded: GameProgress = {
      currentWorldId: typeof parsed.currentWorldId === 'number' ? parsed.currentWorldId : 1,
      completedLevels: parsed.completedLevels && typeof parsed.completedLevels === 'object' ? parsed.completedLevels : {},
      totalScore: typeof parsed.totalScore === 'number' ? parsed.totalScore : 0,
      totalStars: typeof parsed.totalStars === 'number' ? parsed.totalStars : 0,
      unlockedWorlds: Array.isArray(parsed.unlockedWorlds) && parsed.unlockedWorlds.length > 0 ? parsed.unlockedWorlds : [1],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      difficultyMode: parsed.difficultyMode === 'scholar' ? 'scholar' : 'explorer',
    };
    storeProgress = loaded;
    return loaded;
  } catch (err) {
    console.error('Failed to parse saved progress from localStorage:', err);
    storeProgress = INITIAL_GAME_PROGRESS;
    return INITIAL_GAME_PROGRESS;
  }
}

/**
 * Save progress safely to localStorage and notify store subscribers.
 */
export function saveGameProgress(progress: GameProgress): void {
  storeProgress = progress;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('Failed to save progress to localStorage:', err);
    }
  }
  notifyListeners();
}

/**
 * Clear/reset all progress back to pristine state.
 */
export function resetGameProgress(): GameProgress {
  storeProgress = { ...INITIAL_GAME_PROGRESS };
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear localStorage:', err);
    }
  }
  notifyListeners();
  return storeProgress;
}

/**
 * React 18+ useSyncExternalStore subscribe handler
 */
export function subscribeProgress(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

let hasHydrated = false;

export function getProgressSnapshot(): GameProgress {
  if (!hasHydrated && typeof window !== 'undefined') {
    hasHydrated = true;
    loadGameProgress();
  }
  return storeProgress;
}

export function getProgressServerSnapshot(): GameProgress {
  return INITIAL_GAME_PROGRESS;
}

/**
 * Update progress when a level is completed, recalculating totals and badges.
 */
export function recordLevelCompletion(
  currentProgress: GameProgress,
  levelId: string,
  _worldId: number,
  result: { score: number; stars: number; accuracy: number; attempts: number; hintsUsed: number }
): GameProgress {
  const existing = currentProgress.completedLevels[levelId];
  
  // Keep best score and best stars
  const bestScore = existing ? Math.max(existing.score, result.score) : result.score;
  const bestStars = existing ? Math.max(existing.stars, result.stars) : result.stars;

  const newLevelProgress: LevelProgress = {
    completed: true,
    score: bestScore,
    stars: bestStars,
    accuracy: result.accuracy,
    attempts: (existing ? existing.attempts : 0) + result.attempts,
    hintsUsed: result.hintsUsed,
    dateCompleted: new Date().toISOString(),
  };

  const updatedCompletedLevels = {
    ...currentProgress.completedLevels,
    [levelId]: newLevelProgress,
  };

  // Recalculate totals
  let totalScore = 0;
  let totalStars = 0;
  for (const lvl of Object.values(updatedCompletedLevels)) {
    totalScore += lvl.score;
    totalStars += lvl.stars;
  }

  // Determine unlocked worlds based on stars
  const unlocked = new Set<number>(currentProgress.unlockedWorlds);
  unlocked.add(1);
  if (totalStars >= 3) unlocked.add(2);
  if (totalStars >= 7) unlocked.add(3);
  if (totalStars >= 11) unlocked.add(4);
  if (totalStars >= 15) unlocked.add(5);

  // Check badges
  const badges = new Set<string>(currentProgress.badges);
  badges.add('first_sort');

  const count3Stars = Object.values(updatedCompletedLevels).filter((l) => l.stars === 3).length;
  if (count3Stars >= 5) badges.add('perfectionist');
  if (totalStars >= 15) badges.add('stargazer');
  if (unlocked.has(2)) badges.add('garden_champion');
  if (unlocked.has(3)) badges.add('venn_virtuoso');
  if (unlocked.has(4)) badges.add('castle_master');
  if (unlocked.has(5)) badges.add('triple_champion');

  const updated: GameProgress = {
    ...currentProgress,
    completedLevels: updatedCompletedLevels,
    totalScore,
    totalStars,
    unlockedWorlds: Array.from(unlocked).sort((a, b) => a - b),
    badges: Array.from(badges),
  };

  saveGameProgress(updated);
  return updated;
}
