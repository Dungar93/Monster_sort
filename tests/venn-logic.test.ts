import { describe, it, expect } from 'vitest';
import {
  getTwoSetRegion,
  getThreeSetRegion,
  explainTwoSetPlacement,
} from '@/lib/venn-logic';
import { GROUND_TRUTH_MONSTERS } from '@/data/monsters';
import { SetDefinition, Monster } from '@/types/game';

describe('Venn Diagram Logic Tests', () => {
  const U = GROUND_TRUTH_MONSTERS;

  const setR: SetDefinition = {
    id: 'R',
    symbol: 'R',
    label: 'Red Monsters',
    color: '#ef4444',
    predicate: (m: Monster) => m.color === 'red',
    predicateDescription: 'is red',
    mathNotation: 'R = {x ∈ U | x.color = red}',
  };

  const setH: SetDefinition = {
    id: 'H',
    symbol: 'H',
    label: 'Horned Monsters',
    color: '#3b82f6',
    predicate: (m: Monster) => m.horns,
    predicateDescription: 'has horns',
    mathNotation: 'H = {x ∈ U | x.horns = true}',
  };

  const setW: SetDefinition = {
    id: 'W',
    symbol: 'W',
    label: 'Winged Monsters',
    color: '#10b981',
    predicate: (m: Monster) => m.wings,
    predicateDescription: 'has wings',
    mathNotation: 'W = {x ∈ U | x.wings = true}',
  };

  it('correctly maps monsters into all 4 two-set Venn regions', () => {
    // M1: Red=Yes, Horns=Yes -> INTERSECTION_AB
    expect(getTwoSetRegion(U[0], setR, setH)).toBe('INTERSECTION_AB');

    // M3: Red=Yes, Horns=No -> A_ONLY
    expect(getTwoSetRegion(U[2], setR, setH)).toBe('A_ONLY');

    // M2: Red=No, Horns=Yes -> B_ONLY
    expect(getTwoSetRegion(U[1], setR, setH)).toBe('B_ONLY');

    // M4: Red=No, Horns=No -> OUTSIDE
    expect(getTwoSetRegion(U[3], setR, setH)).toBe('OUTSIDE');
  });

  it('correctly maps monsters into three-set Venn regions (including all 8 regions)', () => {
    // M6: Red=Yes, Horns=Yes, Wings=Yes -> INTERSECTION_ABC
    expect(getThreeSetRegion(U[5], setR, setH, setW)).toBe('INTERSECTION_ABC');

    // M1: Red=Yes, Horns=Yes, Wings=No -> INTERSECTION_AB_ONLY
    expect(getThreeSetRegion(U[0], setR, setH, setW)).toBe('INTERSECTION_AB_ONLY');

    // M3: Red=Yes, Horns=No, Wings=Yes -> INTERSECTION_AC_ONLY
    expect(getThreeSetRegion(U[2], setR, setH, setW)).toBe('INTERSECTION_AC_ONLY');

    // M2: Red=No, Horns=Yes, Wings=Yes -> INTERSECTION_BC_ONLY
    expect(getThreeSetRegion(U[1], setR, setH, setW)).toBe('INTERSECTION_BC_ONLY');

    // M4: Red=No, Horns=No, Wings=No -> OUTSIDE_ALL
    expect(getThreeSetRegion(U[3], setR, setH, setW)).toBe('OUTSIDE_ALL');

    // M5: Red=No, Horns=No, Wings=Yes -> C_ONLY
    expect(getThreeSetRegion(U[4], setR, setH, setW)).toBe('C_ONLY');

    // A only: red only
    const redOnlyMonster: Monster = {
      id: 'M_TEST_A',
      name: 'Red Only',
      color: 'red',
      shape: 'round',
      size: 'small',
      horns: false,
      wings: false,
      tail: false,
      spots: false,
    };
    expect(getThreeSetRegion(redOnlyMonster, setR, setH, setW)).toBe('A_ONLY');

    // B only: horns only
    const hornsOnlyMonster: Monster = {
      id: 'M_TEST_B',
      name: 'Horns Only',
      color: 'blue',
      shape: 'round',
      size: 'small',
      horns: true,
      wings: false,
      tail: false,
      spots: false,
    };
    expect(getThreeSetRegion(hornsOnlyMonster, setR, setH, setW)).toBe('B_ONLY');
  });

  it('provides precise explanations for correct and incorrect placements', () => {
    // M1 is in INTERSECTION_AB
    const correctRes = explainTwoSetPlacement(U[0], 'INTERSECTION_AB', setR, setH);
    expect(correctRes.isCorrect).toBe(true);
    expect(correctRes.message).toContain('BOTH');

    // Trying to place M1 in A_ONLY should be rejected
    const incorrectRes = explainTwoSetPlacement(U[0], 'A_ONLY', setR, setH);
    expect(incorrectRes.isCorrect).toBe(false);
    expect(incorrectRes.message).toContain('also has');
  });
});
