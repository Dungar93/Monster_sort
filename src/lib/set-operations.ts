import { Monster, PropertyPredicate } from '@/types/game';

/**
 * Filter universal set U by a predicate function to construct set S.
 * S = { x ∈ U | predicate(x) }
 */
export function buildSetFromPredicate(
  universe: Monster[],
  predicate: PropertyPredicate
): Monster[] {
  return universe.filter((monster) => predicate(monster));
}

/**
 * Check set membership: x ∈ A
 */
export function isMemberOf(monster: Monster, set: Monster[]): boolean {
  return set.some((m) => m.id === monster.id);
}

/**
 * Extract stable IDs array from monster collection.
 */
export function getMonsterIds(monsters: Monster[]): string[] {
  return monsters.map((m) => m.id);
}

/**
 * Deduplicate monsters by stable id.
 */
export function deduplicateMonsters(monsters: Monster[]): Monster[] {
  const seen = new Set<string>();
  const result: Monster[] = [];
  for (const m of monsters) {
    if (!seen.has(m.id)) {
      seen.add(m.id);
      result.push(m);
    }
  }
  return result;
}

/**
 * Set Intersection: A ∩ B
 * All elements that belong to BOTH A and B.
 * A ∩ B = { x ∈ U | x ∈ A ∧ x ∈ B }
 */
export function setIntersection(setA: Monster[], setB: Monster[]): Monster[] {
  const setBIds = new Set(setB.map((m) => m.id));
  return setA.filter((m) => setBIds.has(m.id));
}

/**
 * Set Union: A ∪ B
 * All elements that belong to A OR B (inclusive OR, no duplicates).
 * A ∪ B = { x ∈ U | x ∈ A ∨ x ∈ B }
 */
export function setUnion(setA: Monster[], setB: Monster[]): Monster[] {
  return deduplicateMonsters([...setA, ...setB]);
}

/**
 * Set Difference (Relative Complement): A − B
 * Elements that belong to A but DO NOT belong to B.
 * A − B = { x ∈ U | x ∈ A ∧ x ∉ B }
 */
export function setDifference(setA: Monster[], setB: Monster[]): Monster[] {
  const setBIds = new Set(setB.map((m) => m.id));
  return setA.filter((m) => !setBIds.has(m.id));
}

/**
 * Absolute Complement relative to the Universal Set U: Aᶜ = U − A
 * Elements in universe U that do not belong to A.
 */
export function setComplement(universe: Monster[], setA: Monster[]): Monster[] {
  return setDifference(universe, setA);
}

/**
 * Three-Set Intersection: A ∩ B ∩ C
 */
export function setIntersection3(
  setA: Monster[],
  setB: Monster[],
  setC: Monster[]
): Monster[] {
  return setIntersection(setIntersection(setA, setB), setC);
}

/**
 * Combined Expression: (A ∪ B) − C
 */
export function setUnionDifference(
  setA: Monster[],
  setB: Monster[],
  setC: Monster[]
): Monster[] {
  return setDifference(setUnion(setA, setB), setC);
}

/**
 * Subset check: A ⊆ B
 */
export function isSubset(subset: Monster[], superset: Monster[]): boolean {
  const supersetIds = new Set(superset.map((m) => m.id));
  return subset.every((m) => supersetIds.has(m.id));
}

/**
 * Set Equality check: A = B (same elements by ID regardless of order)
 */
export function areSetsEqual(setA: Monster[], setB: Monster[]): boolean {
  if (setA.length !== setB.length) return false;
  const idsA = new Set(setA.map((m) => m.id));
  return setB.every((m) => idsA.has(m.id));
}
