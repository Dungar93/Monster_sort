'use client';

import React, { useState } from 'react';
import {
  LevelConfig,
  Monster,
  RegionId,
} from '@/types/game';
import { validatePlacement, checkLevelCompletion, generateMonsterHint } from '@/lib/game-engine';
import { calculateLevelScore } from '@/lib/scoring';
import { soundEffects } from '@/lib/audio';
import { MonsterCard } from '@/components/monsters/MonsterCard';
import { ProfessorBlob, ProfessorMood } from './ProfessorBlob';
import { SingleSetBin } from '@/components/venn/SingleSetBin';
import { TwoSetVenn } from '@/components/venn/TwoSetVenn';
import { ThreeSetVenn } from '@/components/venn/ThreeSetVenn';
import { ConceptModal } from './ConceptModal';
import {
  RotateCcw,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface GameplayScreenProps {
  level: LevelConfig;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onBackToMap: () => void;
  onLevelComplete: (stats: {
    score: number;
    stars: number;
    accuracy: number;
    gradeDescription: string;
    attempts: number;
    hintsUsed: number;
  }) => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  level,
  soundEnabled,
  onToggleSound,
  onBackToMap,
  onLevelComplete,
}) => {
  // Placements: map of monsterId -> RegionId
  const [placements, setPlacements] = useState<Record<string, RegionId>>({});
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

  // Stats tracking for scoring
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Professor Blob message and mood
  const [blobMessage, setBlobMessage] = useState(level.storyTip);
  const [blobMood, setBlobMood] = useState<ProfessorMood>('explaining');

  // Feedback notification banner
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
    math: string;
  } | null>(null);

  // Concept Modal state
  const [isConceptModalOpen, setIsConceptModalOpen] = useState(false);

  // Highlighted region for visual feedback
  const [activeFeedbackRegion, setActiveFeedbackRegion] = useState<string | null>(null);

  // Handle monster placement attempt
  const handlePlaceMonster = (monsterId: string, attemptedRegionId: RegionId) => {
    const monster = level.monsters.find((m) => m.id === monsterId);
    if (!monster) return;

    // Validate placement through pure mathematical engine
    const result = validatePlacement(level, monster, attemptedRegionId);

    if (result.isCorrect) {
      soundEffects.playSuccess();
      setBlobMood('happy');
      setBlobMessage(result.feedbackMessage);

      setFeedback({
        type: 'success',
        text: result.feedbackMessage,
        math: result.mathExplanation,
      });

      setActiveFeedbackRegion(attemptedRegionId);
      setTimeout(() => setActiveFeedbackRegion(null), 1200);

      // Record placement
      const newPlacements = {
        ...placements,
        [monsterId]: attemptedRegionId,
      };
      setPlacements(newPlacements);
      setSelectedMonster(null);

      // Check level completion
      if (checkLevelCompletion(level, newPlacements)) {
        setTimeout(() => {
          const finalScore = calculateLevelScore({
            totalMonsters: level.monsters.length,
            correctPlacements: level.monsters.length,
            incorrectAttempts: incorrectAttempts,
            hintsUsed: hintsUsed,
          });

          onLevelComplete({
            score: finalScore.score,
            stars: finalScore.stars,
            accuracy: finalScore.accuracy,
            gradeDescription: finalScore.gradeDescription,
            attempts: level.monsters.length + incorrectAttempts,
            hintsUsed: hintsUsed,
          });
        }, 600);
      }
    } else {
      soundEffects.playBoing();
      setBlobMood('thinking');
      setBlobMessage(result.feedbackMessage);
      setIncorrectAttempts((prev) => prev + 1);

      setFeedback({
        type: 'error',
        text: result.feedbackMessage,
        math: result.mathExplanation,
      });
    }
  };

  // Remove a monster from its placed region back to pool
  const handleRemoveMonster = (monsterId: string) => {
    soundEffects.playPop();
    const updated = { ...placements };
    delete updated[monsterId];
    setPlacements(updated);
    setFeedback(null);
  };

  // Handle Hint Request
  const handleRequestHint = () => {
    soundEffects.playHint();
    setHintsUsed((prev) => prev + 1);
    setBlobMood('hinting');

    if (selectedMonster) {
      const hint = generateMonsterHint(level, selectedMonster);
      setBlobMessage(hint);
    } else {
      const remaining = level.monsters.filter((m) => !placements[m.id]);
      if (remaining.length > 0) {
        const hint = generateMonsterHint(level, remaining[0]);
        setBlobMessage(`Try selecting ${remaining[0].name}! ${hint}`);
      } else {
        setBlobMessage(level.hints[0] || 'Check all monster properties!');
      }
    }
  };

  // Handle Level Reset
  const handleResetLevel = () => {
    soundEffects.playPop();
    setPlacements({});
    setSelectedMonster(null);
    setBlobMessage(level.storyTip);
    setBlobMood('explaining');
    setFeedback(null);
  };

  // Remaining monsters in tray (unplaced)
  const remainingMonsters = level.monsters.filter((m) => !placements[m.id]);

  // Map placed monsters for Venn / Single Set components
  const placedMonstersByRegion = level.monsters.reduce<Record<string, Monster[]>>(
    (acc, m) => {
      const region = placements[m.id];
      if (region) {
        if (!acc[region]) acc[region] = [];
        acc[region].push(m);
      }
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-pink-50/60 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 text-slate-800 dark:text-slate-100 p-3 sm:p-5 select-none flex flex-col justify-between">
      {/* HEADER / NAVIGATION BAR */}
      <header className="max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md border border-purple-100 dark:border-purple-900/50 mb-3">
        {/* Back and Level Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToMap();
            }}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Return to Kingdom Map"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                World {level.worldId} • Level {level.worldId}.{level.levelNumber}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">
              {level.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Concept Guide Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setIsConceptModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 transition-colors"
            title="View discrete mathematics concept lesson"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Learn Concept</span>
          </button>

          {/* Hint Button */}
          <button
            onClick={handleRequestHint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-xs hover:bg-amber-100 transition-colors"
            title="Ask Professor Blob for a hint"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Hint</span>
            {hintsUsed > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-200 dark:bg-amber-800 text-[10px] rounded-full">
                {hintsUsed}
              </span>
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetLevel}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Reset level attempt"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </header>

      {/* MISSION & PROFESSOR BLOB INSTRUCTION BANNER */}
      <div className="max-w-6xl w-full mx-auto mb-3">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-3 border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex-1 w-full">
            <ProfessorBlob
              mood={blobMood}
              size="sm"
              message={blobMessage}
            />
          </div>

          {/* Quick Progress indicator */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>
              Placed: {level.monsters.length - remainingMonsters.length} / {level.monsters.length}
            </span>
          </div>
        </div>
      </div>

      {/* FEEDBACK PILL */}
      {feedback && (
        <div className="max-w-6xl w-full mx-auto mb-3">
          <div
            className={`flex items-center justify-between p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
            <span className="font-mono text-xs font-bold hidden sm:inline px-2 py-0.5 rounded-lg bg-white/60 dark:bg-slate-800/60">
              {feedback.math}
            </span>
          </div>
        </div>
      )}

      {/* CENTRAL SORTING WORKSPACE */}
      <main className="max-w-6xl w-full mx-auto flex-1 flex flex-col justify-center">
        {level.type === 'single_set' || level.type === 'expression_target' ? (
          <SingleSetBin
            targetSet={level.sets[0]}
            placedInside={placedMonstersByRegion['INSIDE_TARGET'] || []}
            placedOutside={placedMonstersByRegion['OUTSIDE_TARGET'] || []}
            selectedMonster={selectedMonster}
            onPlaceMonster={handlePlaceMonster}
            onRemoveMonster={handleRemoveMonster}
            activeFeedbackRegion={activeFeedbackRegion}
          />
        ) : level.type === 'two_set_venn' ? (
          <TwoSetVenn
            setA={level.sets[0]}
            setB={level.sets[1]}
            placedMonsters={{
              A_ONLY: (placedMonstersByRegion['A_ONLY'] || []) as Monster[],
              B_ONLY: (placedMonstersByRegion['B_ONLY'] || []) as Monster[],
              INTERSECTION_AB: (placedMonstersByRegion['INTERSECTION_AB'] || []) as Monster[],
              OUTSIDE: (placedMonstersByRegion['OUTSIDE'] || []) as Monster[],
            }}
            selectedMonster={selectedMonster}
            onPlaceMonster={(mId, rId) => handlePlaceMonster(mId, rId as RegionId)}
            onRemoveMonster={handleRemoveMonster}
            activeFeedbackRegion={activeFeedbackRegion}
          />
        ) : (
          <ThreeSetVenn
            setA={level.sets[0]}
            setB={level.sets[1]}
            setC={level.sets[2]}
            placedMonsters={{
              A_ONLY: (placedMonstersByRegion['A_ONLY'] || []) as Monster[],
              B_ONLY: (placedMonstersByRegion['B_ONLY'] || []) as Monster[],
              C_ONLY: (placedMonstersByRegion['C_ONLY'] || []) as Monster[],
              INTERSECTION_AB_ONLY: (placedMonstersByRegion['INTERSECTION_AB_ONLY'] || []) as Monster[],
              INTERSECTION_AC_ONLY: (placedMonstersByRegion['INTERSECTION_AC_ONLY'] || []) as Monster[],
              INTERSECTION_BC_ONLY: (placedMonstersByRegion['INTERSECTION_BC_ONLY'] || []) as Monster[],
              INTERSECTION_ABC: (placedMonstersByRegion['INTERSECTION_ABC'] || []) as Monster[],
              OUTSIDE_ALL: (placedMonstersByRegion['OUTSIDE_ALL'] || []) as Monster[],
            }}
            selectedMonster={selectedMonster}
            onPlaceMonster={(mId, rId) => handlePlaceMonster(mId, rId as RegionId)}
            onRemoveMonster={handleRemoveMonster}
            activeFeedbackRegion={activeFeedbackRegion}
          />
        )}
      </main>

      {/* MONSTER TRAY (UNPLACED MONSTERS) */}
      <footer className="max-w-6xl w-full mx-auto mt-4">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 border-2 border-purple-200 dark:border-purple-800/80 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Universal Set Collection: Monsters to Sort ({remainingMonsters.length} remaining)
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              Tip: Click or tap a monster, then click a target region! Or drag and drop!
            </span>
          </div>

          {remainingMonsters.length === 0 ? (
            <div className="py-4 text-center text-sm font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              🎉 All monsters sorted! Checking final proofs...
            </div>
          ) : (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 px-1">
              {remainingMonsters.map((monster) => (
                <div key={monster.id} className="flex-shrink-0">
                  <MonsterCard
                    monster={monster}
                    isSelected={selectedMonster?.id === monster.id}
                    onSelect={(m) => {
                      soundEffects.playPop();
                      setSelectedMonster((prev) => (prev?.id === m.id ? null : m));
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </footer>

      {/* CONCEPT LESSON MODAL */}
      <ConceptModal
        level={level}
        isOpen={isConceptModalOpen}
        onClose={() => setIsConceptModalOpen(false)}
      />
    </div>
  );
};
