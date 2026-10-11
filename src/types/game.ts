export type MonsterColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple';
export type MonsterShape = 'round' | 'square' | 'triangular';
export type MonsterSize = 'small' | 'medium' | 'large';

export interface Monster {
  id: string;
  name: string;
  color: MonsterColor;
  shape: MonsterShape;
  size: MonsterSize;
  horns: boolean;
  wings: boolean;
  tail: boolean;
  spots: boolean;
}

export type PropertyPredicate = (monster: Monster) => boolean;

export interface SetDefinition {
  id: string; // e.g. 'A', 'B', 'C', 'R', 'H', 'W'
  label: string; // e.g. 'Red Monsters', 'Horned Monsters'
  symbol: string; // e.g. 'R', 'H', 'W'
  color: string; // badge / outline hex or tailwind
  predicate: PropertyPredicate;
  predicateDescription: string;
  mathNotation: string;
}

export type TwoSetRegionId = 'A_ONLY' | 'B_ONLY' | 'INTERSECTION_AB' | 'OUTSIDE';

export type ThreeSetRegionId =
  | 'A_ONLY'
  | 'B_ONLY'
  | 'C_ONLY'
  | 'INTERSECTION_AB_ONLY'
  | 'INTERSECTION_AC_ONLY'
  | 'INTERSECTION_BC_ONLY'
  | 'INTERSECTION_ABC'
  | 'OUTSIDE_ALL';

export type SingleSetRegionId = 'INSIDE_TARGET' | 'OUTSIDE_TARGET';

export type RegionId = TwoSetRegionId | ThreeSetRegionId | SingleSetRegionId | string;

export interface RegionInfo {
  id: RegionId;
  label: string;
  mathNotation: string;
  description: string;
}

export type LevelType =
  | 'single_set'
  | 'two_set_venn'
  | 'three_set_venn'
  | 'expression_target';

export interface LevelConfig {
  id: string;
  worldId: number;
  levelNumber: number;
  title: string;
  subtitle: string;
  mission: string;
  instruction: string;
  storyTip: string;
  conceptTitle: string;
  conceptExplanation: string;
  formalMath: string;
  type: LevelType;
  monsters: Monster[];
  sets: SetDefinition[];
  targetRegionIds?: string[]; // If level asks "Place matching monsters in the target zone"
  targetDescription?: string;
  explanation: string;
  hints: string[];
}

export interface LevelProgress {
  completed: boolean;
  score: number;
  stars: number; // 1 to 3
  accuracy: number; // percentage
  attempts: number;
  hintsUsed: number;
  dateCompleted?: string;
}

export interface GameProgress {
  currentWorldId: number;
  completedLevels: Record<string, LevelProgress>;
  totalScore: number;
  totalStars: number;
  unlockedWorlds: number[];
  badges: string[];
  soundEnabled: boolean;
  difficultyMode: 'explorer' | 'scholar';
}

export interface PlacementValidationResult {
  isCorrect: boolean;
  expectedRegionId: RegionId;
  feedbackMessage: string;
  mathExplanation: string;
}

export interface WorldInfo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'Beginner' | 'Easy-Medium' | 'Medium' | 'Advanced' | 'Master Challenge';
  concepts: string[];
  colorTheme: {
    primary: string;
    bgGradient: string;
    cardBorder: string;
    badgeBg: string;
  };
  levelIds: string[];
  requiredStarsToUnlock: number;
}
