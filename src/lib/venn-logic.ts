import {
  Monster,
  SetDefinition,
  TwoSetRegionId,
  ThreeSetRegionId,
  RegionInfo,
} from '@/types/game';

/**
 * Determine the 2-set Venn region for a monster relative to Set A and Set B.
 */
export function getTwoSetRegion(
  monster: Monster,
  setA: SetDefinition,
  setB: SetDefinition
): TwoSetRegionId {
  const inA = setA.predicate(monster);
  const inB = setB.predicate(monster);

  if (inA && inB) return 'INTERSECTION_AB';
  if (inA && !inB) return 'A_ONLY';
  if (!inA && inB) return 'B_ONLY';
  return 'OUTSIDE';
}

/**
 * Metadata for 2-set Venn regions
 */
export function getTwoSetRegionInfos(
  setA: SetDefinition,
  setB: SetDefinition
): Record<TwoSetRegionId, RegionInfo> {
  return {
    A_ONLY: {
      id: 'A_ONLY',
      label: `${setA.label} Only`,
      mathNotation: `${setA.symbol} − ${setB.symbol}`,
      description: `Monsters that belong to ${setA.label} (${setA.symbol}) but NOT ${setB.label} (${setB.symbol}).`,
    },
    B_ONLY: {
      id: 'B_ONLY',
      label: `${setB.label} Only`,
      mathNotation: `${setB.symbol} − ${setA.symbol}`,
      description: `Monsters that belong to ${setB.label} (${setB.symbol}) but NOT ${setA.label} (${setA.symbol}).`,
    },
    INTERSECTION_AB: {
      id: 'INTERSECTION_AB',
      label: `${setA.symbol} ∩ ${setB.symbol}`,
      mathNotation: `${setA.symbol} ∩ ${setB.symbol}`,
      description: `Monsters that belong to BOTH ${setA.label} AND ${setB.label}.`,
    },
    OUTSIDE: {
      id: 'OUTSIDE',
      label: 'Outside Both',
      mathNotation: `(${setA.symbol} ∪ ${setB.symbol})ᶜ`,
      description: `Monsters in universal set U that belong to NEITHER ${setA.symbol} nor ${setB.symbol}.`,
    },
  };
}

/**
 * Determine the 3-set Venn region for a monster relative to Sets A, B, and C.
 */
export function getThreeSetRegion(
  monster: Monster,
  setA: SetDefinition,
  setB: SetDefinition,
  setC: SetDefinition
): ThreeSetRegionId {
  const inA = setA.predicate(monster);
  const inB = setB.predicate(monster);
  const inC = setC.predicate(monster);

  if (inA && inB && inC) return 'INTERSECTION_ABC';
  if (inA && inB && !inC) return 'INTERSECTION_AB_ONLY';
  if (inA && !inB && inC) return 'INTERSECTION_AC_ONLY';
  if (!inA && inB && inC) return 'INTERSECTION_BC_ONLY';
  if (inA && !inB && !inC) return 'A_ONLY';
  if (!inA && inB && !inC) return 'B_ONLY';
  if (!inA && !inB && inC) return 'C_ONLY';
  return 'OUTSIDE_ALL';
}

/**
 * Metadata for 3-set Venn regions
 */
export function getThreeSetRegionInfos(
  setA: SetDefinition,
  setB: SetDefinition,
  setC: SetDefinition
): Record<ThreeSetRegionId, RegionInfo> {
  const A = setA.symbol;
  const B = setB.symbol;
  const C = setC.symbol;

  return {
    A_ONLY: {
      id: 'A_ONLY',
      label: `${setA.label} Only`,
      mathNotation: `${A} − (${B} ∪ ${C})`,
      description: `Belongs ONLY to ${A}, and neither ${B} nor ${C}.`,
    },
    B_ONLY: {
      id: 'B_ONLY',
      label: `${setB.label} Only`,
      mathNotation: `${B} − (${A} ∪ ${C})`,
      description: `Belongs ONLY to ${B}, and neither ${A} nor ${C}.`,
    },
    C_ONLY: {
      id: 'C_ONLY',
      label: `${setC.label} Only`,
      mathNotation: `${C} − (${A} ∪ ${B})`,
      description: `Belongs ONLY to ${C}, and neither ${A} nor ${B}.`,
    },
    INTERSECTION_AB_ONLY: {
      id: 'INTERSECTION_AB_ONLY',
      label: `${A} ∩ ${B} (not ${C})`,
      mathNotation: `(${A} ∩ ${B}) − ${C}`,
      description: `Belongs to BOTH ${A} and ${B}, but NOT ${C}.`,
    },
    INTERSECTION_AC_ONLY: {
      id: 'INTERSECTION_AC_ONLY',
      label: `${A} ∩ ${C} (not ${B})`,
      mathNotation: `(${A} ∩ ${C}) − ${B}`,
      description: `Belongs to BOTH ${A} and ${C}, but NOT ${B}.`,
    },
    INTERSECTION_BC_ONLY: {
      id: 'INTERSECTION_BC_ONLY',
      label: `${B} ∩ ${C} (not ${A})`,
      mathNotation: `(${B} ∩ ${C}) − ${A}`,
      description: `Belongs to BOTH ${B} and ${C}, but NOT ${A}.`,
    },
    INTERSECTION_ABC: {
      id: 'INTERSECTION_ABC',
      label: `${A} ∩ ${B} ∩ ${C}`,
      mathNotation: `${A} ∩ ${B} ∩ ${C}`,
      description: `Belongs to ALL THREE sets: ${A}, ${B}, and ${C}!`,
    },
    OUTSIDE_ALL: {
      id: 'OUTSIDE_ALL',
      label: 'Outside All Three',
      mathNotation: `(${A} ∪ ${B} ∪ ${C})ᶜ`,
      description: `Monsters in universe U that do not belong to any of the three circles.`,
    },
  };
}

/**
 * Generate clear child-friendly explanation for why monster belongs or does not belong.
 */
export function explainTwoSetPlacement(
  monster: Monster,
  targetRegion: TwoSetRegionId,
  setA: SetDefinition,
  setB: SetDefinition
): { isCorrect: boolean; message: string; mathFormula: string } {
  const correctRegion = getTwoSetRegion(monster, setA, setB);
  const isCorrect = correctRegion === targetRegion;
  const inA = setA.predicate(monster);
  const inB = setB.predicate(monster);

  const aDesc = setA.predicateDescription;
  const bDesc = setB.predicateDescription;

  if (isCorrect) {
    if (correctRegion === 'INTERSECTION_AB') {
      return {
        isCorrect: true,
        message: `Spot on! ${monster.name} satisfies BOTH conditions (${aDesc} AND ${bDesc}).`,
        mathFormula: `${monster.id} ∈ (${setA.symbol} ∩ ${setB.symbol})`,
      };
    }
    if (correctRegion === 'A_ONLY') {
      return {
        isCorrect: true,
        message: `Great! ${monster.name} has ${aDesc}, but NOT ${bDesc}.`,
        mathFormula: `${monster.id} ∈ (${setA.symbol} − ${setB.symbol})`,
      };
    }
    if (correctRegion === 'B_ONLY') {
      return {
        isCorrect: true,
        message: `Terrific! ${monster.name} has ${bDesc}, but NOT ${aDesc}.`,
        mathFormula: `${monster.id} ∈ (${setB.symbol} − ${setA.symbol})`,
      };
    }
    return {
      isCorrect: true,
      message: `Well done! ${monster.name} has neither ${aDesc} nor ${bDesc}, so it lives in the outside zone of U.`,
      mathFormula: `${monster.id} ∈ (${setA.symbol} ∪ ${setB.symbol})ᶜ`,
    };
  }

  // Helpful gentle guidance
  let hint = '';
  if (targetRegion === 'INTERSECTION_AB') {
    if (!inA && !inB) hint = `This monster has NEITHER property (${aDesc} nor ${bDesc}).`;
    else if (!inA) hint = `This monster has ${bDesc}, but it is missing ${aDesc}!`;
    else hint = `This monster has ${aDesc}, but it is missing ${bDesc}!`;
  } else if (targetRegion === 'A_ONLY') {
    if (!inA) hint = `Check again: does this monster have ${aDesc}?`;
    else if (inB) hint = `This monster also has ${bDesc}! When it has both, it belongs in the center overlap.`;
  } else if (targetRegion === 'B_ONLY') {
    if (!inB) hint = `Check again: does this monster have ${bDesc}?`;
    else if (inA) hint = `This monster also has ${aDesc}! When it has both, it belongs in the center overlap.`;
  } else {
    hint = `Wait! This monster satisfies at least one circle's rule, so it belongs inside the diagram.`;
  }

  return {
    isCorrect: false,
    message: `Almost! ${hint}`,
    mathFormula: `${monster.id} ∉ ${targetRegion}`,
  };
}
