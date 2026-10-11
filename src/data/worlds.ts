import { WorldInfo } from '@/types/game';

export const WORLDS: WorldInfo[] = [
  {
    id: 1,
    title: 'The Sorting Garden',
    subtitle: 'Beginner • Universal Sets & Membership',
    description: 'Welcome to the colorful blossom glade! Learn about Universal Set U, set elements, and membership tests x ∈ A.',
    difficulty: 'Beginner',
    concepts: ['Universal Set U', 'Membership (x ∈ A)', 'Non-Membership (x ∉ A)', 'Single-Property Predicates'],
    colorTheme: {
      primary: '#10b981', // emerald/mint
      bgGradient: 'from-emerald-500/20 via-teal-500/10 to-green-500/20',
      cardBorder: 'border-emerald-300 dark:border-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    },
    levelIds: ['w1-l1', 'w1-l2', 'w1-l3', 'w1-l4'],
    requiredStarsToUnlock: 0,
  },
  {
    id: 2,
    title: 'The Venn Valley',
    subtitle: 'Easy to Medium • 2-Set Venn & Intersections',
    description: 'Explore the rolling hills where two magical circles overlap! Discover Intersection (A ∩ B) and Union (A ∪ B).',
    difficulty: 'Easy-Medium',
    concepts: ['Two-Set Venn Diagrams', 'Intersection (A ∩ B)', 'Union (A ∪ B)', 'Outside Region (A ∪ B)ᶜ'],
    colorTheme: {
      primary: '#3b82f6', // sky/blue
      bgGradient: 'from-blue-500/20 via-indigo-500/10 to-cyan-500/20',
      cardBorder: 'border-blue-300 dark:border-blue-700',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
    },
    levelIds: ['w2-l1', 'w2-l2', 'w2-l3', 'w2-l4'],
    requiredStarsToUnlock: 3,
  },
  {
    id: 3,
    title: 'The Mystery Castle',
    subtitle: 'Medium • Complements & Differences',
    description: 'Climb the towers of Mystery Castle! Master the Complement (Aᶜ = U − A) and Set Difference (A − B).',
    difficulty: 'Medium',
    concepts: ['Relative Complement (Aᶜ)', 'Set Difference (A − B)', 'Logical NOT (¬P)', 'Exclusive Criteria'],
    colorTheme: {
      primary: '#8b5cf6', // purple
      bgGradient: 'from-purple-500/20 via-fuchsia-500/10 to-violet-500/20',
      cardBorder: 'border-purple-300 dark:border-purple-700',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
    },
    levelIds: ['w3-l1', 'w3-l2', 'w3-l3', 'w3-l4'],
    requiredStarsToUnlock: 7,
  },
  {
    id: 4,
    title: 'The Triple Circle Challenge',
    subtitle: 'Advanced • 3-Set Venn Diagrams',
    description: 'Behold the ancient three-ring clover! Navigate all 8 distinct membership regions of a triple Venn diagram.',
    difficulty: 'Advanced',
    concepts: ['3-Set Venn Diagrams', 'Triple Intersection (A ∩ B ∩ C)', '8 Disjoint Regions', 'Pairwise Overlaps'],
    colorTheme: {
      primary: '#ec4899', // pink/rose
      bgGradient: 'from-pink-500/20 via-rose-500/10 to-amber-500/20',
      cardBorder: 'border-pink-300 dark:border-pink-700',
      badgeBg: 'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-200',
    },
    levelIds: ['w4-l1', 'w4-l2', 'w4-l3', 'w4-l4'],
    requiredStarsToUnlock: 11,
  },
  {
    id: 5,
    title: 'The Monster Master',
    subtitle: 'Master Challenge • Combined Expressions',
    description: 'The highest summit of Discrete Mathematics! Evaluate complex expressions like (A ∪ B) − C and earn the Grand Master Crown.',
    difficulty: 'Master Challenge',
    concepts: ['Compound Operations', '(A ∪ B) − C', 'Precedence & Parentheses', 'Formal Set Theorems'],
    colorTheme: {
      primary: '#f59e0b', // amber/gold
      bgGradient: 'from-amber-500/20 via-yellow-500/10 to-orange-500/20',
      cardBorder: 'border-amber-300 dark:border-amber-700',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    },
    levelIds: ['w5-l1', 'w5-l2', 'w5-l3', 'w5-l4', 'w5-l5'],
    requiredStarsToUnlock: 15,
  },
];
