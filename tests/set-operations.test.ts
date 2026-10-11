import { describe, it, expect } from 'vitest';
import {
  buildSetFromPredicate,
  setIntersection,
  setUnion,
  setDifference,
  setComplement,
  setIntersection3,
  setUnionDifference,
  isMemberOf,
  getMonsterIds,
  areSetsEqual,
  isSubset,
} from '@/lib/set-operations';
import { GROUND_TRUTH_MONSTERS } from '@/data/monsters';
import { Monster } from '@/types/game';

describe('Discrete Mathematics Set Operations (Section 10 Ground Truth Tests)', () => {
  const U = GROUND_TRUTH_MONSTERS;

  // Predicates
  const isRed = (m: Monster) => m.color === 'red';
  const hasHorns = (m: Monster) => m.horns;
  const hasWings = (m: Monster) => m.wings;

  // Sets
  const R = buildSetFromPredicate(U, isRed);
  const H = buildSetFromPredicate(U, hasHorns);
  const W = buildSetFromPredicate(U, hasWings);

  it('correctly builds sets R, H, W from predicates', () => {
    // Expected sets:
    // R = {M1, M3, M6}
    // H = {M1, M2, M6}
    // W = {M2, M3, M5, M6}
    expect(getMonsterIds(R).sort()).toEqual(['M1', 'M3', 'M6']);
    expect(getMonsterIds(H).sort()).toEqual(['M1', 'M2', 'M6']);
    expect(getMonsterIds(W).sort()).toEqual(['M2', 'M3', 'M5', 'M6']);
  });

  it('evaluates Intersection R ∩ H = {M1, M6}', () => {
    const rInterH = setIntersection(R, H);
    expect(getMonsterIds(rInterH).sort()).toEqual(['M1', 'M6']);
  });

  it('evaluates Union R ∪ H = {M1, M2, M3, M6} without duplicates', () => {
    const rUnionH = setUnion(R, H);
    expect(getMonsterIds(rUnionH).sort()).toEqual(['M1', 'M2', 'M3', 'M6']);
    // Verify no duplicates
    const ids = getMonsterIds(rUnionH);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('evaluates Complement U − R = {M2, M4, M5}', () => {
    const complementR = setComplement(U, R);
    expect(getMonsterIds(complementR).sort()).toEqual(['M2', 'M4', 'M5']);
  });

  it('evaluates Set Difference R − H = {M3}', () => {
    const rDiffH = setDifference(R, H);
    expect(getMonsterIds(rDiffH).sort()).toEqual(['M3']);
  });

  it('evaluates Three-Set Intersection R ∩ H ∩ W = {M6}', () => {
    const tripleInter = setIntersection3(R, H, W);
    expect(getMonsterIds(tripleInter).sort()).toEqual(['M6']);
  });

  it('evaluates Combined Expression (R ∪ H) − W = {M1}', () => {
    const expr = setUnionDifference(R, H, W);
    expect(getMonsterIds(expr).sort()).toEqual(['M1']);
  });

  it('handles set membership x ∈ A and x ∉ A correctly', () => {
    const m1 = U.find((m) => m.id === 'M1')!;
    const m4 = U.find((m) => m.id === 'M4')!;
    expect(isMemberOf(m1, R)).toBe(true);
    expect(isMemberOf(m4, R)).toBe(false);
  });

  it('handles subset relations and set equality', () => {
    const sub = [U[0]]; // M1
    expect(isSubset(sub, R)).toBe(true);
    expect(isSubset(R, sub)).toBe(false);
    expect(areSetsEqual(R, R)).toBe(true);
    expect(areSetsEqual(R, H)).toBe(false);
  });
});
