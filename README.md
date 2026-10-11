# Monster Sort: The Sorting Kingdom 🏰✨

**Monster Sort: The Sorting Kingdom** is an interactive, browser-based educational game designed for children aged 7–12 to learn foundational and intermediate concepts of **Discrete Mathematics (Set Theory)** in an engaging fantasy setting.

Guided by the friendly mentor **Professor Blob**, players help categorize a vibrant population of cute monsters by their properties (color, shape, size, horns, wings, tail, and spots) using Venn diagrams, set partitions, unions, intersections, complements, and set differences.

---

## 1. Project Overview

- **Title**: Monster Sort: The Sorting Kingdom
- **Purpose**: College Discrete Mathematics course project demonstrating set-builder notation, Venn diagram topology, Boolean predicates, and set operations wrapped in a child-friendly pedagogical video game.
- **Technology Stack**: Next.js 16 (App Router), React 19, TypeScript (strict type checking), Tailwind CSS, Lucide icons, Canvas Confetti, and native Web Audio API synthesis.
- **Offline & Zero-Dependencies**: 100% client-side execution; requires no external databases, account registrations, paid APIs, or external audio/image CDNs.

---

## 2. Target Audience

- **Primary Audience**: Children aged 7–12 years.
- **Modes**:
  - **🌱 Explorer Mode (Ages 7–9)**: Intuitive visual language, property badges, friendly guidance, and verbal explanations.
  - **🎓 Scholar Mode (Ages 10–12)**: Formal mathematical set-builder notation ($R = \{x \in U \mid x.\text{color} = \text{red}\}$), Venn partition algebra, and symbolic operations ($A \cap B$, $A \cup B$, $A^c$, $A - B$).

---

## 3. Game Rules

1. **Universal Set ($U$)**: Every level presents a collection of monsters belonging to the puzzle's universal set $U$.
2. **Sorting Interaction**: Players can either **drag-and-drop** monsters into target regions or **tap a monster** to select it, then **tap a region** to place it.
3. **Validation & Immediate Feedback**: The mathematical engine evaluates placements against ground-truth predicates:
   - **Correct**: Rewarded with 10 points, a pleasant ascending harmonic chime, and an explanation of why the monster belongs in that region.
   - **Incorrect**: Gentle bounce feedback, friendly boing sound, and targeted guidance from Professor Blob explaining which property failed without giving away the full answer.
4. **Hints**: Clicking the **Hint** button prompts Professor Blob to analyze the selected monster's attributes.
5. **Star Rating**:
   - ⭐⭐⭐ **3 Stars**: $\ge 85\%$ accuracy and $\le 1$ hint used.
   - ⭐⭐ **2 Stars**: $\ge 60\%$ accuracy and $\le 2$ hints used.
   - ⭐ **1 Star**: Successfully completed the level.
6. **Progression**: Stars unlock subsequent worlds in the Kingdom Map:
   - World 1: 0 stars (unlocked immediately)
   - World 2: 3 stars
   - World 3: 7 stars
   - World 4: 11 stars
   - World 5: 15 stars

---

## 4. The Five Game Worlds

| World | Title | Difficulty | Core Mathematical Topics |
|---|---|---|---|
| **World 1** | **The Sorting Garden** | Beginner | Universal Set $U$, Membership $x \in A$, Non-membership $x \notin A$, Single-Property Predicates. |
| **World 2** | **The Venn Valley** | Easy to Medium | Two-Set Venn Diagrams, Intersection ($A \cap B$), Union ($A \cup B$), Outside Region ($(A \cup B)^c$). |
| **World 3** | **The Mystery Castle** | Medium | Relative Complement ($A^c = U - A$), Set Difference ($A - B$, $W - T$). |
| **World 4** | **The Triple Circle Challenge** | Advanced | Three-Set Venn Diagrams with all 8 disjoint regions, Triple Intersection ($A \cap B \cap C$), Pairwise overlaps. |
| **World 5** | **The Monster Master** | Master Challenge | Compound Set Expressions: $(A \cup B) - C$, $A \cap (B \cup C)$, and Distributive Laws. |

---

## 5. Discrete Mathematics Concepts & Formal Definitions

### Concept 1: Universal Set & Membership
- **Universal Set $U$**: The set containing all objects under consideration in the current puzzle:
  $$U = \{M_1, M_2, M_3, M_4, M_5, M_6\}$$
- **Predicate-Defined Set (Set-Builder Notation)**:
  $$A = \{x \in U \mid P(x)\}$$
  *Example*: $R = \{x \in U \mid x.\text{color} = \text{red}\}$
- **Membership**: $x \in A \iff P(x) = \text{true}$. If $P(x) = \text{false}$, then $x \notin A$.

### Concept 2: Intersection ($A \cap B$)
Elements satisfying both predicates simultaneously (logical `AND` / $\land$):
$$A \cap B = \{x \in U \mid x \in A \land x \in B\}$$
*Example*: $R \cap H$ (Monsters that are Red **AND** have Horns).

### Concept 3: Union ($A \cup B$)
Elements satisfying at least one predicate (inclusive `OR` / $\lor$):
$$A \cup B = \{x \in U \mid x \in A \lor x \in B\}$$
*Note*: No element is duplicated in the union set.

### Concept 4: Complement ($A^c = U - A$)
Elements of the universal set $U$ that do not belong to $A$:
$$A^c = \{x \in U \mid x \notin A\}$$
*Note*: The complement is strictly computed relative to universe $U$.

### Concept 5: Set Difference ($A - B$)
Elements belonging to $A$ but not to $B$:
$$A - B = \{x \in U \mid x \in A \land x \notin B\} = A \cap B^c$$

### Concept 6: Two-Set Venn Diagram (4 Disjoint Partitions)
Two sets $A$ and $B$ partition the universal set $U$ into 4 mutually disjoint subsets:
1. $A \text{ Only} = A - B$
2. $B \text{ Only} = B - A$
3. $A \cap B$ (Center overlap)
4. $(A \cup B)^c = U - (A \cup B)$ (Outside both circles)

### Concept 7: Three-Set Venn Diagram (8 Disjoint Partitions)
Three sets $A$, $B$, and $C$ partition universe $U$ into $2^3 = 8$ mutually disjoint subsets:
1. $A \text{ Only} = A - (B \cup C)$
2. $B \text{ Only} = B - (A \cup C)$
3. $C \text{ Only} = C - (A \cup B)$
4. $(A \cap B) - C$ (Overlap of $A$ and $B$, excluding $C$)
5. $(A \cap C) - B$ (Overlap of $A$ and $C$, excluding $B$)
6. $(B \cap C) - A$ (Overlap of $B$ and $C$, excluding $A$)
7. $A \cap B \cap C$ (Triple Intersection / Center Star)
8. $(A \cup B \cup C)^c = U - (A \cup B \cup C)$ (Outside all 3 circles)

### Concept 8: Compound Expressions
Evaluating expressions with precedence and parentheses:
$$(A \cup B) - C = \{x \in U \mid (x \in A \lor x \in B) \land x \notin C\}$$

---

## 6. Ground-Truth Test Case (Specification Section 10)

The mathematical engine is verified against the specification's exact benchmark dataset:

$$U = \{M_1, M_2, M_3, M_4, M_5, M_6\}$$

| Monster | Red | Horns | Wings |
|---|:---:|:---:|:---:|
| **M1** | Yes | Yes | No |
| **M2** | No | Yes | Yes |
| **M3** | Yes | No | Yes |
| **M4** | No | No | No |
| **M5** | No | No | Yes |
| **M6** | Yes | Yes | Yes |

### Derived Sets:
- $R = \{M_1, M_3, M_6\}$
- $H = \{M_1, M_2, M_6\}$
- $W = \{M_2, M_3, M_5, M_6\}$

### Verified Operation Results:
- $R \cap H = \{M_1, M_6\}$
- $R \cup H = \{M_1, M_2, M_3, M_6\}$
- $U - R = \{M_2, M_4, M_5\}$
- $R - H = \{M_3\}$
- $R \cap H \cap W = \{M_6\}$
- $(R \cup H) - W = \{M_1\}$

*(All verified by automated Vitest suite in `tests/set-operations.test.ts`)*

---

## 7. Architecture & Project Structure

```text
Dm_Project/
├── src/
│   ├── app/
│   │   ├── globals.css              # Custom styling, animations, design tokens
│   │   ├── layout.tsx               # Root layout & page metadata
│   │   └── page.tsx                 # Screen router & state management
│   ├── components/
│   │   ├── game/
│   │   │   ├── ConceptModal.tsx     # Discrete math concept lessons
│   │   │   ├── GameplayScreen.tsx   # Interactive level workspace
│   │   │   ├── LevelCompleteModal.tsx# Confetti celebration & score breakdown
│   │   │   ├── ProfessorBlob.tsx    # Guide character SVG with animated moods
│   │   │   ├── ProgressModal.tsx    # Kingdom hall of records, badges & reset
│   │   │   ├── WelcomeScreen.tsx    # Game start screen & mode selection
│   │   │   └── WorldMap.tsx         # Kingdom map with 5 worlds & level pins
│   │   ├── monsters/
│   │   │   ├── MonsterCard.tsx      # Draggable / clickable monster card
│   │   │   └── MonsterSvg.tsx       # SVG monster renderer matching all 7 properties
│   │   └── venn/
│   │       ├── SingleSetBin.tsx     # Target set bin & complement bin
│   │       ├── TwoSetVenn.tsx       # 4-region interactive 2-set Venn diagram
│   │       └── ThreeSetVenn.tsx     # 8-region interactive 3-set Venn diagram
│   ├── data/
│   │   ├── levels.ts                # Curriculum of 21 levels across 5 worlds
│   │   ├── monsters.ts              # Catalog of monsters (including ground truth)
│   │   └── worlds.ts                # World metadata, color themes & star requirements
│   ├── lib/
│   │   ├── audio.ts                 # Web Audio API procedural sound synthesizer
│   │   ├── game-engine.ts           # Placement validation & hint generation
│   │   ├── progress-storage.ts      # LocalStorage persistence & React store
│   │   ├── scoring.ts               # Accuracy & star rating calculations
│   │   ├── set-operations.ts        # Pure Discrete Math set theory functions
│   │   └── venn-logic.ts            # 2-set and 3-set region topology & math proofs
│   └── types/
│       └── game.ts                  # Strict TypeScript interfaces
├── tests/
│   ├── game-engine.test.ts          # Placement validation & scoring tests
│   ├── set-operations.test.ts       # Ground truth Section 10 tests
│   └── venn-logic.test.ts           # 2-set and 3-set region partition tests
├── vitest.config.ts                 # Vitest test runner configuration
├── package.json
└── README.md
```

---

## 8. How the Game Engine Calculates Set Membership

1. **Predicate Evaluation**: Set membership is never hardcoded on a monster-by-monster basis. Instead, each set defines a pure predicate $P: \text{Monster} \to \text{boolean}$.
2. **Dynamic Region Resolution**:
   - For a two-set level with sets $A$ and $B$, the monster is evaluated against $P_A(x)$ and $P_B(x)$.
     - $P_A \land P_B \implies \text{INTERSECTION\_AB}$
     - $P_A \land \neg P_B \implies \text{A\_ONLY}$
     - $\neg P_A \land P_B \implies \text{B\_ONLY}$
     - $\neg P_A \land \neg P_B \implies \text{OUTSIDE}$
   - For a three-set level, all 8 combinations of $(P_A, P_B, P_C) \in \{0, 1\}^3$ map to the exact disjoint Venn regions.
3. **Validation & Pedagogical Explanation**: When a player places a monster, the engine computes its true target region. If mismatched, the engine constructs a helpful hint based on which specific condition was violated.

---

## 9. Local Installation & Setup

### Prerequisites
- Node.js $\ge 18$ (Tested with Node v22.22.2)
- npm $\ge 9$ (or pnpm / yarn)

### Installation
```bash
# Clone or navigate to the repository
cd Dm_Project

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production
```bash
npm run build
npm start
```

---

## 10. Running Automated Tests

To run the unit and mathematical verification test suite with Vitest:

```bash
npm test
```

To run TypeScript verification and ESLint:
```bash
npm run lint
```

---

## 11. Current Limitations & Future Improvements

- **Current Limitations**:
  - The game is designed for local browser play; progress is saved in `localStorage` rather than cloud sync.
- **Future Improvements**:
  - **Custom Sandbox / Level Editor**: Allow students to create custom monster predicates and share Venn diagram puzzles.
  - **Power Set Explorer**: An interactive mode visualizing $\mathcal{P}(S)$ and the cardinality $2^{|S|}$.
  - **Cartesian Product ($A \times B$) Mini-Game**: Pairing monster accessories with monster bodies on a grid.
