# Build Monster Sort: The Sorting Kingdom — Complete Educational Game

## 1. Your Role

Act as a senior frontend engineer, educational game designer, UI/UX designer, and Discrete Mathematics specialist.

Build a complete, polished, playable browser-based educational game called **Monster Sort: The Sorting Kingdom** for children aged 7–12.

This is a college Discrete Mathematics project. The game must be entertaining for children while correctly implementing mathematical concepts from Set Theory.

Do not stop at a plan, wireframe, or landing page. Inspect the existing repository, implement the complete game, run it, test the important interactions, and fix the issues you discover.

## 2. First Inspect the Repository

Before changing files:

1. Inspect the project structure, package.json, installed dependencies, existing components, and current Git changes.
2. Determine whether the repository already contains an application.
3. Preserve working functionality and reuse suitable existing dependencies.
4. If the repository is empty, initialize a suitable Next.js application using TypeScript and Tailwind CSS.
5. Do not overwrite unrelated files or discard existing user changes.
6. After inspection, proceed with implementation without waiting for approval unless a genuine blocker exists.

Do not create unnecessary backend services, authentication, databases, or deployment infrastructure.

## 3. Product Vision

The game takes place in a colorful fantasy world called the Sorting Kingdom.

Children help a friendly character named Professor Blob organize a population of cute monsters according to their properties.

Every monster has properties such as:

- Color: red, blue, green, yellow, purple.
- Shape: round, square, triangular.
- Size: small, medium, large.
- Horns: true or false.
- Wings: true or false.
- Tail: true or false.
- Spots: true or false.

Players complete interactive sorting missions, earn points and stars, unlock new worlds, and learn why their answers are correct.

The game should feel like a small educational adventure, not a traditional worksheet or school examination.

## 4. Technology Stack

Use:

- Next.js with the App Router.
- React.
- TypeScript with strict type checking.
- Tailwind CSS.
- Lucide icons if already available or easy to add.
- CSS animations and lightweight React components for interactions.
- Local browser storage for saving progress and settings.

Use the package manager already configured in the repository.

Do not introduce a backend, paid API, AI service, external database, account system, or mandatory external asset service.

The entire game must run locally and work without API keys.

## 5. Visual Design

Create a delightful, polished, child-friendly interface.

Design direction:

- Bright pastel colors, with purple, blue, pink, yellow, and mint accents.
- Rounded cards, friendly shapes, soft shadows, and playful animations.
- Cute monsters with clearly distinguishable properties.
- Large readable typography and accessible contrast.
- Friendly feedback, confetti, stars, badges, and reward animations.
- Consistent spacing and visual hierarchy.
- Responsive layouts for laptops, tablets, and mobile phones.
- Clear controls and age-appropriate language.

Create the monsters using custom SVG illustrations, CSS-drawn characters, or reusable original components. Make their colors, shapes, horns, wings, and other properties visually distinguishable. Avoid relying on emojis alone for every monster.

Use a consistent illustration style. Every monster's visible appearance must match its underlying data.

Avoid generic dashboard styling, excessive text, cluttered screens, and overly complicated navigation.

## 6. Main Application Screens

### A. Welcome Screen

Include:

- Game logo and title: Monster Sort: The Sorting Kingdom.
- Professor Blob as the guide character.
- A short, engaging introduction.
- A prominent Play button.
- A Continue button when saved progress exists.
- A sound toggle.
- An optional age/difficulty selection.

### B. Kingdom Map

Display five themed worlds:

1. The Sorting Garden.
2. The Venn Valley.
3. The Mystery Castle.
4. The Triple Circle Challenge.
5. The Monster Master.

Show locked, available, and completed states.

The first world must be playable immediately.

Unlock later worlds through progress, but allow children to replay completed levels.

### C. Gameplay Screen

Include:

- Current world and level.
- A clear mission instruction.
- A central monster collection.
- One or more target sets or Venn diagram regions.
- Drag-and-drop interactions.
- A visible score and progress indicator.
- A hint button.
- A reset button.
- A home or pause control.
- Feedback after each placement.
- A Continue button when the level is completed.

On touch devices, support tapping a monster followed by tapping a target region. Do not make drag-and-drop the only way to play.

### D. Level Completion Screen

Display:

- A celebration animation.
- Points earned.
- One to three stars.
- Correct placements and accuracy.
- A short explanation of the mathematical concept.
- Replay and Next Level buttons.
- World progress.

### E. Progress Screen

Display:

- Completed levels.
- Worlds unlocked.
- Total stars.
- Total points.
- Best performance per level.
- A reset-progress option with confirmation.

Save progress locally and restore it after refreshing the page.

## 7. Mathematical Requirements

The game must correctly teach and implement the following concepts.

### Concept 1: Universal Set and Membership

Represent the collection of monsters in a puzzle as a universal set U.

Teach:
- Set membership: x ∈ A.
- Non-membership: x ∉ A.
- Set elements.
- Set-builder rules using monster properties.

Example:
R = {x ∈ U | x.color = red}

The game must evaluate membership from actual monster properties.

### Concept 2: Intersection

Implement A ∩ B.

A monster belongs to the intersection only if it satisfies both set predicates.

Example mission:
"Find monsters that are red AND have horns."

### Concept 3: Union

Implement A ∪ B.

A monster belongs to the union if it satisfies at least one of the two set predicates.

Use inclusive OR.

Example mission:
"Find monsters that are red OR have wings."

Monsters satisfying both conditions must also belong to the union.

### Concept 4: Complement

Implement Aᶜ relative to the current universal set U.

Aᶜ = U − A

Example mission:
"Find every monster that is NOT red."

Ensure that the complement is calculated relative to the monsters available in the current puzzle.

### Concept 5: Set Difference

Implement A − B.

Example mission:
"Find monsters that are red but do NOT have horns."

### Concept 6: Venn Diagrams

Implement interactive two-set Venn diagrams with four distinct regions:

- A only.
- A ∩ B.
- B only.
- Outside both sets, but inside U.

Show all monsters in the universal set, including monsters outside both circles.

Clearly label the circles and provide visible feedback when a monster is placed in the wrong region.

### Concept 7: Three-Set Venn Diagrams

Introduce three overlapping sets for advanced levels.

For example:

- A = red monsters.
- B = monsters with horns.
- C = monsters with wings.

Support the eight possible membership regions:

- A only.
- B only.
- C only.
- A ∩ B only.
- A ∩ C only.
- B ∩ C only.
- A ∩ B ∩ C.
- Outside all three sets.

Use an appropriate three-set Venn layout. Do not fake a three-set diagram using unrelated overlapping circles without properly representing the eight regions.

### Concept 8: Combined Expressions

Introduce expressions such as:

(A ∪ B) − C

Explain the expression in child-friendly language, for example:

"Find monsters that are red or have horns, but do not have wings."

The game must calculate the correct answer using the expression's actual logical meaning.

## 8. Five Game Worlds

### World 1: The Sorting Garden

Difficulty: Beginner.

Teach universal sets, membership, and single-property sorting.

Missions:
- Sort all red monsters.
- Find all monsters with horns.
- Group monsters by size.
- Find monsters that are not blue.

Use large illustrations and simple instructions.

### World 2: The Venn Valley

Difficulty: Easy to medium.

Teach two-set Venn diagrams, intersections, and unions.

Missions:
- Red AND horned.
- Blue OR winged.
- Place each monster in the correct Venn region.
- Find monsters that belong to neither set.

### World 3: The Mystery Castle

Difficulty: Medium.

Teach complement and set difference.

Missions:
- Find every monster that is not red.
- Find red monsters without horns.
- Find monsters with wings but no tail.
- Solve mixed two-set puzzles.

### World 4: The Triple Circle Challenge

Difficulty: Advanced.

Teach three-set membership and intersections.

Missions:
- Classify monsters by color, horns, and wings.
- Identify monsters belonging to all three sets.
- Find monsters belonging to exactly two sets.
- Find monsters outside all three sets.

### World 5: The Monster Master

Difficulty: Advanced challenge.

Teach combined set expressions.

Missions:
- Evaluate A ∩ B.
- Evaluate A ∪ B.
- Evaluate A − B.
- Evaluate (A ∪ B) − C.
- Complete mixed sorting challenges.

Provide a short explanation of each answer after a mission.

## 9. Core Game Engine

Build the mathematical logic separately from the UI.

Create reusable, typed functions for:

- Evaluating monster properties.
- Building sets from predicates.
- Intersection.
- Union.
- Difference.
- Complement.
- Evaluating membership in a Venn region.
- Checking a placement.
- Computing score and accuracy.
- Determining whether a level is complete.

Use stable monster IDs rather than object-reference equality.

Define monster data using TypeScript interfaces or types. Separate content definitions from gameplay components.

Use a data-driven level configuration containing:

- Level ID.
- World ID.
- Difficulty.
- Monster collection.
- Set definitions.
- Mission text.
- Expected mathematical operation.
- Correct placement rules.
- Explanation.
- Scoring configuration.

Do not hardcode the correct answer separately in the UI for every individual monster. Derive correct answers from the set definitions and monster properties.

For each monster, calculate its membership in each set and determine its correct region.

The game engine must prevent duplicate placement of the same monster, handle reset correctly, and ensure that every monster is accounted for when a puzzle requires complete classification.

For randomly generated levels, validate that the generated puzzle has a consistent, solvable answer before displaying it.

## 10. Example Mathematical Test Case

Create automated tests for this fixed dataset:

U = {M1, M2, M3, M4, M5, M6}

| Monster | Red | Horns | Wings |
|---|---|---|---|
| M1 | Yes | Yes | No |
| M2 | No | Yes | Yes |
| M3 | Yes | No | Yes |
| M4 | No | No | No |
| M5 | No | No | Yes |
| M6 | Yes | Yes | Yes |

Expected sets:

R = {M1, M3, M6}

H = {M1, M2, M6}

W = {M2, M3, M5, M6}

Expected results:

R ∩ H = {M1, M6}

R ∪ H = {M1, M2, M3, M6}

U − R = {M2, M4, M5}

R − H = {M3}

R ∩ H ∩ W = {M6}

(R ∪ H) − W = {M1}

Use these as ground-truth tests for the mathematical engine.

Important: In the actual Venn interface, calculate the complete membership region for every monster rather than checking only whether it belongs to the first circle.

## 11. Interaction and Feedback

Every important interaction must work.

Implement:

- Dragging monsters into target regions.
- Click/tap selection as an alternative.
- Immediate feedback for incorrect placements.
- Positive feedback for correct placements.
- A hint system that explains a property or logical condition.
- A reset-level action.
- A completion check.
- Level unlocking.
- Replay.
- Score updates.
- Star calculation.
- Persistent progress.

Do not reveal the full solution immediately when the player makes one mistake.

Use friendly messages such as:

"Almost! This monster is blue, so check whether it belongs in the Red Club."

For a correct answer:

"Great job! This monster is red AND has horns, so it belongs in the overlapping region."

Feedback must be based on the actual rule that the monster satisfies or fails.

Provide an optional Learn button or short explanation panel for each new mathematical concept.

## 12. Scoring and Difficulty

Use an initial scoring system:

- Correct placement: 10 points.
- Completing a level: 1–3 stars based primarily on accuracy.
- Hints: reduce the maximum star rating for that level if appropriate.
- Incorrect placement: no points, with gentle feedback.
- World completion: unlock a badge or cosmetic reward.

Avoid penalizing children harshly for mistakes.

Difficulty should increase through the number of sets, the number of monster properties, and the complexity of the set expressions.

Do not rely exclusively on time limits.

## 13. Accessibility and Child-Friendly Design

Ensure:

- Large interactive targets.
- Clear instructions in simple English.
- Strong color contrast.
- Keyboard-accessible controls.
- Visible focus indicators.
- Reduced-motion support.
- Sound effects that can be disabled.
- Responsive layouts.
- No account requirement.
- No advertisements or external links required for gameplay.
- No collection of personal information.

Never communicate correctness through color alone; use text, symbols, or icons as well.

## 14. Suggested Project Structure

Use a clean, maintainable structure appropriate to the existing repository. A possible organization is:

src/
  app/
  components/
    game/
    monsters/
    venn/
    layout/
    ui/
  data/
    monsters.ts
    levels.ts
    worlds.ts
  lib/
    set-operations.ts
    venn-logic.ts
    game-engine.ts
    scoring.ts
    progress-storage.ts
  types/
    game.ts

tests/
  set-operations.test.ts
  venn-logic.test.ts
  game-engine.test.ts

Adapt the exact paths to the existing project conventions rather than forcing this structure if the repository already has a good organization.

## 15. Testing Requirements

Test the mathematical engine independently from the visual interface.

At minimum, verify:

- Intersection returns only common elements.
- Union does not duplicate elements.
- Complement is relative to the universal set.
- Set difference excludes elements of the second set.
- Two-set Venn classification handles all four regions.
- Three-set Venn classification handles all eight regions.
- Incorrect placements are rejected.
- Correct placements are accepted.
- A level completes only when its required conditions are met.
- Reset clears the current attempt correctly.
- Scoring and stars are calculated consistently.
- Progress persists across refreshes.
- Missing or invalid stored progress does not crash the application.

Run the available relevant tests and production build. Fix failures introduced by the implementation.

Do not claim tests or builds passed unless you actually ran them.

## 16. Documentation and Final Deliverables

Create a README.md containing:

1. Project overview.
2. Target audience.
3. Game rules.
4. Discrete Mathematics concepts covered.
5. Mathematical definitions and examples.
6. Architecture and project structure.
7. How the game engine calculates set membership.
8. How to install dependencies and run locally.
9. How to run tests.
10. Current limitations and future improvements.

Also provide a concise project summary covering:

- Files created or modified.
- Implemented features.
- Mathematical algorithms and data structures.
- Tests executed and their actual results.
- Build status.
- Commands to start the game.
- Any known issues.

## 17. Execution Instructions

Work in the following order:

1. Inspect the repository.
2. Establish the application structure.
3. Implement the mathematical engine and tests.
4. Build the monster data and level configurations.
5. Implement the reusable monster and Venn diagram components.
6. Build all five game worlds and their gameplay.
7. Add scoring, feedback, rewards, and local progress persistence.
8. Polish the interface and responsive behavior.
9. Run relevant tests and the production build.
10. Fix any issues discovered.
11. Write or update the README.
12. Provide the final implementation summary.

Prioritize a complete, playable, correct game over unnecessary complexity.

Do not leave placeholder buttons, fake interactions, nonfunctional levels, or decorative controls that do nothing.

Start by inspecting the repository, then implement the project end to end.