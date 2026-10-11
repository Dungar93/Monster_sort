export interface QuizQuestion {
  id: number;
  title: string;
  scenario: string;
  optionA: {
    text: string;
    description: string;
    game: 'monster-sort';
    tag: 'Set Theory & Patterns';
    icon: string;
  };
  optionB: {
    text: string;
    description: string;
    game: 'robot-maze';
    tag: 'Graph Theory & Paths';
    icon: string;
  };
}

export interface QuizResult {
  monsterSortScore: number;
  robotMazeScore: number;
  dominantGame: 'monster-sort' | 'robot-maze' | 'balanced';
  archetypeTitle: string;
  archetypeBadge: string;
  tagline: string;
  description: string;
  matchedGameName: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'The Enchanted Discovery',
    scenario: 'You find a mysterious treasure chest in a magical glade. What is your first instinct?',
    optionA: {
      text: 'Examine the magical keys and sort them by shapes, colors, and rune categories into Venn circles!',
      description: 'You love finding shared properties and classifying objects.',
      game: 'monster-sort',
      tag: 'Set Theory & Patterns',
      icon: '🔮',
    },
    optionB: {
      text: 'Map out the winding maze corridors on the lid to calculate the shortest sequence of steps to the lock!',
      description: 'You love pathfinding, routes, and step-by-step algorithms.',
      game: 'robot-maze',
      tag: 'Graph Theory & Paths',
      icon: '🧭',
    },
  },
  {
    id: 2,
    title: 'Your Discrete Math Superpower',
    scenario: 'If you could unlock one magical discrete mathematics ability, which would you pick?',
    optionA: {
      text: 'Venn Sight: Instantly seeing the intersections, unions, and complements of everything around you!',
      description: 'See how groups of elements relate to each other.',
      game: 'monster-sort',
      tag: 'Set Theory & Patterns',
      icon: '✨',
    },
    optionB: {
      text: 'Breadth-First Radar: Emitting ripples to calculate the absolute shortest path through any labyrinth!',
      description: 'Navigate complex networks without ever taking extra steps.',
      game: 'robot-maze',
      tag: 'Graph Theory & Paths',
      icon: '⚡',
    },
  },
  {
    id: 3,
    title: 'The Brain Teaser Duel',
    scenario: 'A wizard asks you to solve a riddle. Which puzzle sounds more exciting to tackle right now?',
    optionA: {
      text: '“Find creatures that are Purple OR have Wings, but do NOT have Tails!”',
      description: 'Compound boolean logic and set differences: (P ∪ W) − T.',
      game: 'monster-sort',
      tag: 'Set Theory & Patterns',
      icon: '👾',
    },
    optionB: {
      text: '“Guide Robo through a walled maze to the treasure in the minimum possible moves!”',
      description: 'Finding the optimal path through vertices and edges.',
      game: 'robot-maze',
      tag: 'Graph Theory & Paths',
      icon: '🤖',
    },
  },
  {
    id: 4,
    title: 'The Hero Companion',
    scenario: 'Who would you choose as your magical guide and co-adventurer?',
    optionA: {
      text: 'Professor Blob: The cheerful, wise jelly professor with round glasses who loves sorting monsters!',
      description: 'Your mentor in Set Theory and Venn diagrams.',
      game: 'monster-sort',
      tag: 'Set Theory & Patterns',
      icon: '🎓',
    },
    optionB: {
      text: 'Robo: The plucky, clever robot explorer with glowing antennae who always discovers the optimal route!',
      description: 'Your companion in Breadth-First Search and graph exploration.',
      game: 'robot-maze',
      tag: 'Graph Theory & Paths',
      icon: '🚀',
    },
  },
  {
    id: 5,
    title: 'Your Thinking Style',
    scenario: 'When you are faced with a big, complicated challenge, how does your brain work?',
    optionA: {
      text: 'I group items into clubs, inspect what they have in common, and filter out what doesn’t belong!',
      description: 'Categorization, set-builder logic, and classification.',
      game: 'monster-sort',
      tag: 'Set Theory & Patterns',
      icon: '🧩',
    },
    optionB: {
      text: 'I explore step-by-step, checking neighbors one layer at a time until I reach the destination!',
      description: 'Algorithmic progression, breadth-first search, and graph traversal.',
      game: 'robot-maze',
      tag: 'Graph Theory & Paths',
      icon: '🔍',
    },
  },
];

export function calculateQuizResult(answers: Record<number, 'A' | 'B'>): QuizResult {
  let monsterCount = 0;
  let robotCount = 0;

  for (const choice of Object.values(answers)) {
    if (choice === 'A') monsterCount++;
    if (choice === 'B') robotCount++;
  }

  const total = monsterCount + robotCount || 1;
  const monsterScore = Math.round((monsterCount / total) * 100);
  const robotScore = Math.round((robotCount / total) * 100);

  if (monsterCount > robotCount) {
    return {
      monsterSortScore: monsterScore,
      robotMazeScore: robotScore,
      dominantGame: 'monster-sort',
      archetypeTitle: 'The Pattern Alchemist & Set Theorist',
      archetypeBadge: '🧙‍♂️🔮',
      tagline: 'Master of Classification, Unions & Intersections',
      description:
        'Your mind thrives on structure, classification, and identifying shared traits! You naturally see how objects group into sets, how Venn diagrams overlap, and how logic rules govern the universe.',
      matchedGameName: 'Monster Sort: The Sorting Kingdom',
    };
  }

  if (robotCount > monsterCount) {
    return {
      monsterSortScore: monsterScore,
      robotMazeScore: robotScore,
      dominantGame: 'robot-maze',
      archetypeTitle: 'The Algorithmic Navigator & Pathfinder',
      archetypeBadge: '🤖⚡',
      tagline: 'Master of Graphs, Breadth-First Search & Optimal Routes',
      description:
        'Your mind is sharp, spatial, and strategic! You excel at step-by-step problem solving, exploring networks of nodes and edges, and calculating the mathematically shortest path to any goal.',
      matchedGameName: 'Robot Maze Challenge',
    };
  }

  return {
    monsterSortScore: 50,
    robotMazeScore: 50,
    dominantGame: 'balanced',
    archetypeTitle: 'The Dual-Realm Discrete Grandmaster',
    archetypeBadge: '👑✨',
    tagline: 'Equal Master of Set Theory & Graph Theory',
    description:
      'Incredible! You possess the rare harmony of both mathematical realms: the classifying genius of Set Theory and the pathfinding brilliance of Graph Theory!',
    matchedGameName: 'Both Realms Await You!',
  };
}

let storeQuizResult: QuizResult | null = null;
let hasHydratedQuiz = false;
const quizListeners = new Set<() => void>();
const QUIZ_STORAGE_KEY = 'discrete_math_quiz_result_v1';

export function loadSavedQuizResult(): QuizResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function subscribeQuizResult(listener: () => void): () => void {
  quizListeners.add(listener);
  return () => {
    quizListeners.delete(listener);
  };
}

export function getQuizResultSnapshot(): QuizResult | null {
  if (!hasHydratedQuiz && typeof window !== 'undefined') {
    hasHydratedQuiz = true;
    storeQuizResult = loadSavedQuizResult();
  }
  return storeQuizResult;
}

export function getQuizResultServerSnapshot(): QuizResult | null {
  return null;
}

export function setAndSaveQuizResult(result: QuizResult): void {
  storeQuizResult = result;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(result));
    } catch {
      // Ignore
    }
  }
  for (const listener of quizListeners) {
    listener();
  }
}
