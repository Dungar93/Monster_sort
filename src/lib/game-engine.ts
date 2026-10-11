import {
  LevelConfig,
  Monster,
  RegionId,
  PlacementValidationResult,
} from '@/types/game';
import { getTwoSetRegion, getThreeSetRegion } from './venn-logic';

/**
 * Determine the correct region ID for a monster under the given level configuration.
 */
export function getExpectedRegion(level: LevelConfig, monster: Monster): RegionId {
  if (level.type === 'two_set_venn') {
    const setA = level.sets[0];
    const setB = level.sets[1];
    return getTwoSetRegion(monster, setA, setB);
  }

  if (level.type === 'three_set_venn') {
    const setA = level.sets[0];
    const setB = level.sets[1];
    const setC = level.sets[2];
    return getThreeSetRegion(monster, setA, setB, setC);
  }

  if (level.type === 'single_set' || level.type === 'expression_target') {
    const primarySet = level.sets[0];
    const satisfies = primarySet.predicate(monster);
    return satisfies ? 'INSIDE_TARGET' : 'OUTSIDE_TARGET';
  }

  return 'OUTSIDE';
}

/**
 * Validates player's attempted placement of a monster into a target region.
 */
export function validatePlacement(
  level: LevelConfig,
  monster: Monster,
  attemptedRegionId: RegionId
): PlacementValidationResult {
  const expectedRegionId = getExpectedRegion(level, monster);
  const isCorrect = expectedRegionId === attemptedRegionId;

  if (level.type === 'two_set_venn') {
    const setA = level.sets[0];
    const setB = level.sets[1];
    const inA = setA.predicate(monster);
    const inB = setB.predicate(monster);

    if (isCorrect) {
      if (expectedRegionId === 'INTERSECTION_AB') {
        return {
          isCorrect: true,
          expectedRegionId,
          feedbackMessage: `Awesome! ${monster.name} satisfies BOTH sets: ${setA.symbol} (${setA.predicateDescription}) and ${setB.symbol} (${setB.predicateDescription})!`,
          mathExplanation: `${monster.id} ∈ (${setA.symbol} ∩ ${setB.symbol})`,
        };
      }
      if (expectedRegionId === 'A_ONLY') {
        return {
          isCorrect: true,
          expectedRegionId,
          feedbackMessage: `Great job! ${monster.name} belongs to ${setA.symbol} (${setA.predicateDescription}), but not ${setB.symbol}.`,
          mathExplanation: `${monster.id} ∈ (${setA.symbol} − ${setB.symbol})`,
        };
      }
      if (expectedRegionId === 'B_ONLY') {
        return {
          isCorrect: true,
          expectedRegionId,
          feedbackMessage: `Super! ${monster.name} belongs to ${setB.symbol} (${setB.predicateDescription}), but not ${setA.symbol}.`,
          mathExplanation: `${monster.id} ∈ (${setB.symbol} − ${setA.symbol})`,
        };
      }
      return {
        isCorrect: true,
        expectedRegionId,
        feedbackMessage: `Nice! ${monster.name} has neither property, so it belongs in the outside region of U.`,
        mathExplanation: `${monster.id} ∈ (${setA.symbol} ∪ ${setB.symbol})ᶜ`,
      };
    }

    // Friendly, helpful hints on wrong placement
    let tip = `Check ${monster.name}'s properties!`;
    if (attemptedRegionId === 'INTERSECTION_AB') {
      if (!inA && !inB) tip = `This monster has neither ${setA.predicateDescription} nor ${setB.predicateDescription}.`;
      else if (!inA) tip = `This monster has ${setB.predicateDescription}, but lacks ${setA.predicateDescription}.`;
      else tip = `This monster has ${setA.predicateDescription}, but lacks ${setB.predicateDescription}.`;
    } else if (attemptedRegionId === 'A_ONLY') {
      if (!inA) tip = `Does this monster satisfy ${setA.predicateDescription}? Check again!`;
      else if (inB) tip = `It also has ${setB.predicateDescription}! When it has both, look for the overlapping region.`;
    } else if (attemptedRegionId === 'B_ONLY') {
      if (!inB) tip = `Does this monster satisfy ${setB.predicateDescription}? Check again!`;
      else if (inA) tip = `It also has ${setA.predicateDescription}! When it has both, look for the overlapping region.`;
    } else {
      tip = `This monster matches one or more circles! Don't leave it outside.`;
    }

    return {
      isCorrect: false,
      expectedRegionId,
      feedbackMessage: `Almost! ${tip}`,
      mathExplanation: `${monster.id} ∉ ${attemptedRegionId}`,
    };
  }

  if (level.type === 'three_set_venn') {
    const setA = level.sets[0];
    const setB = level.sets[1];
    const setC = level.sets[2];
    const inA = setA.predicate(monster);
    const inB = setB.predicate(monster);
    const inC = setC.predicate(monster);

    if (isCorrect) {
      if (expectedRegionId === 'INTERSECTION_ABC') {
        return {
          isCorrect: true,
          expectedRegionId,
          feedbackMessage: `Sensational! ${monster.name} satisfies all 3 rules: ${setA.symbol}, ${setB.symbol}, and ${setC.symbol}!`,
          mathExplanation: `${monster.id} ∈ (${setA.symbol} ∩ ${setB.symbol} ∩ ${setC.symbol})`,
        };
      }
      return {
        isCorrect: true,
        expectedRegionId,
        feedbackMessage: `Spot on! ${monster.name} placed in the correct three-way region!`,
        mathExplanation: `${monster.id} ∈ ${expectedRegionId}`,
      };
    }

    const matches = [
      inA ? setA.symbol : null,
      inB ? setB.symbol : null,
      inC ? setC.symbol : null,
    ].filter(Boolean);

    const matchText = matches.length === 0 ? 'none of the sets' : matches.join(' and ');

    return {
      isCorrect: false,
      expectedRegionId,
      feedbackMessage: `Almost! ${monster.name} satisfies ${matchText}. Find the region corresponding to exactly those sets!`,
      mathExplanation: `${monster.id} ∉ ${attemptedRegionId}`,
    };
  }

  // Single set or expression target
  const targetSet = level.sets[0];
  const satisfies = targetSet.predicate(monster);

  if (isCorrect) {
    if (satisfies) {
      return {
        isCorrect: true,
        expectedRegionId,
        feedbackMessage: `Great job! ${monster.name} satisfies ${targetSet.predicateDescription}!`,
        mathExplanation: `${monster.id} ∈ ${targetSet.symbol}`,
      };
    }
    return {
      isCorrect: true,
      expectedRegionId,
      feedbackMessage: `Correct! ${monster.name} does NOT satisfy ${targetSet.predicateDescription}, so it belongs outside.`,
      mathExplanation: `${monster.id} ∉ ${targetSet.symbol} (${monster.id} ∈ ${targetSet.symbol}ᶜ)`,
    };
  }

  return {
    isCorrect: false,
    expectedRegionId,
    feedbackMessage: satisfies
      ? `Look closely: ${monster.name} actually DOES have ${targetSet.predicateDescription}!`
      : `Look closely: does ${monster.name} have ${targetSet.predicateDescription}?`,
    mathExplanation: `${monster.id} does not belong here`,
  };
}

/**
 * Checks whether all required monsters in the level are correctly placed.
 */
export function checkLevelCompletion(
  level: LevelConfig,
  placements: Record<string, RegionId>
): boolean {
  for (const monster of level.monsters) {
    const placedRegion = placements[monster.id];
    if (!placedRegion) return false;
    const expected = getExpectedRegion(level, monster);
    if (placedRegion !== expected) return false;
  }
  return true;
}

/**
 * Provides an intelligent hint for a selected monster in the level.
 */
export function generateMonsterHint(level: LevelConfig, monster: Monster): string {
  if (level.type === 'two_set_venn') {
    const setA = level.sets[0];
    const setB = level.sets[1];
    const inA = setA.predicate(monster);
    const inB = setB.predicate(monster);

    const aNote = inA ? `has ${setA.predicateDescription} (in ${setA.symbol})` : `does NOT have ${setA.predicateDescription} (not in ${setA.symbol})`;
    const bNote = inB ? `has ${setB.predicateDescription} (in ${setB.symbol})` : `does NOT have ${setB.predicateDescription} (not in ${setB.symbol})`;

    return `Professor Blob observes: ${monster.name} ${aNote}, and ${bNote}.`;
  }

  if (level.type === 'three_set_venn') {
    const setA = level.sets[0];
    const setB = level.sets[1];
    const setC = level.sets[2];
    const inA = setA.predicate(monster);
    const inB = setB.predicate(monster);
    const inC = setC.predicate(monster);

    const parts = [
      `${setA.symbol}: ${inA ? 'YES' : 'NO'}`,
      `${setB.symbol}: ${inB ? 'YES' : 'NO'}`,
      `${setC.symbol}: ${inC ? 'YES' : 'NO'}`,
    ];
    return `Professor Blob checks the criteria: ${parts.join(', ')}.`;
  }

  const setA = level.sets[0];
  const inA = setA.predicate(monster);
  return inA
    ? `Professor Blob confirms: ${monster.name} matches the rule "${setA.predicateDescription}"!`
    : `Professor Blob hints: ${monster.name} does NOT match "${setA.predicateDescription}".`;
}
