'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { LevelConfig } from '@/types/game';
import {
  saveGameProgress,
  recordLevelCompletion,
  resetGameProgress,
  subscribeProgress,
  getProgressSnapshot,
  getProgressServerSnapshot,
} from '@/lib/progress-storage';
import { LEVELS } from '@/data/levels';
import { soundEffects } from '@/lib/audio';
import { WelcomeScreen } from '@/components/game/WelcomeScreen';
import { WorldMap } from '@/components/game/WorldMap';
import { GameplayScreen } from '@/components/game/GameplayScreen';
import { LevelCompleteModal } from '@/components/game/LevelCompleteModal';
import { ProgressModal } from '@/components/game/ProgressModal';

type AppScreen = 'welcome' | 'map' | 'gameplay';

const emptySubscribe = () => () => {};

export default function MonsterSortGame() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [activeLevelId, setActiveLevelId] = useState<string>('w1-l1');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  // External store synchronization for reactive state
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getProgressServerSnapshot
  );

  // Level Complete Modal State
  const [completedLevelStats, setCompletedLevelStats] = useState<{
    level: LevelConfig;
    score: number;
    stars: number;
    accuracy: number;
    gradeDescription: string;
  } | null>(null);

  // Sync sound setting
  useEffect(() => {
    soundEffects.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Sound toggle handler
  const handleToggleSound = () => {
    const next = !progress.soundEnabled;
    soundEffects.setEnabled(next);
    if (next) soundEffects.playClick();
    saveGameProgress({ ...progress, soundEnabled: next });
  };

  // Difficulty mode toggle handler
  const handleToggleDifficulty = () => {
    saveGameProgress({
      ...progress,
      difficultyMode: progress.difficultyMode === 'explorer' ? 'scholar' : 'explorer',
    });
  };

  // Reset all game progress
  const handleResetProgress = () => {
    resetGameProgress();
    setCurrentScreen('welcome');
    setIsProgressModalOpen(false);
    setCompletedLevelStats(null);
  };

  // Start / Continue from Welcome Screen
  const handleStartGame = () => {
    setCurrentScreen('map');
  };

  const handleContinueGame = () => {
    const firstUncompleted = LEVELS.find((l) => !progress.completedLevels[l.id]);
    if (firstUncompleted && progress.unlockedWorlds.includes(firstUncompleted.worldId)) {
      setActiveLevelId(firstUncompleted.id);
      setCurrentScreen('gameplay');
    } else {
      setCurrentScreen('map');
    }
  };

  // Select level from World Map
  const handleSelectLevel = (levelId: string) => {
    setActiveLevelId(levelId);
    setCurrentScreen('gameplay');
  };

  // On Level Complete
  const handleLevelComplete = (stats: {
    score: number;
    stars: number;
    accuracy: number;
    gradeDescription: string;
    attempts: number;
    hintsUsed: number;
  }) => {
    const currentLevel = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[0];

    recordLevelCompletion(
      progress,
      activeLevelId,
      currentLevel.worldId,
      {
        score: stats.score,
        stars: stats.stars,
        accuracy: stats.accuracy,
        attempts: stats.attempts,
        hintsUsed: stats.hintsUsed,
      }
    );

    setCompletedLevelStats({
      level: currentLevel,
      score: stats.score,
      stars: stats.stars,
      accuracy: stats.accuracy,
      gradeDescription: stats.gradeDescription,
    });
  };

  // Next level navigation
  const handleNextLevel = () => {
    const currentIndex = LEVELS.findIndex((l) => l.id === activeLevelId);
    if (currentIndex >= 0 && currentIndex < LEVELS.length - 1) {
      const nextLevel = LEVELS[currentIndex + 1];
      setActiveLevelId(nextLevel.id);
      setCompletedLevelStats(null);
    } else {
      setCompletedLevelStats(null);
      setCurrentScreen('map');
    }
  };

  // Replay level
  const handleReplayLevel = () => {
    setCompletedLevelStats(null);
  };

  const currentLevelConfig = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[0];
  const hasNextLevel = LEVELS.findIndex((l) => l.id === activeLevelId) < LEVELS.length - 1;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
          <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
            Entering the Sorting Kingdom...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SCREEN ROUTING */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          progress={progress}
          onStartGame={handleStartGame}
          onContinueGame={handleContinueGame}
          onToggleSound={handleToggleSound}
          onToggleDifficulty={handleToggleDifficulty}
          onOpenProgress={() => setIsProgressModalOpen(true)}
        />
      )}

      {currentScreen === 'map' && (
        <WorldMap
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onToggleSound={handleToggleSound}
          onToggleDifficulty={handleToggleDifficulty}
          onOpenProgress={() => setIsProgressModalOpen(true)}
          onBackToWelcome={() => setCurrentScreen('welcome')}
        />
      )}

      {currentScreen === 'gameplay' && (
        <GameplayScreen
          key={activeLevelId}
          level={currentLevelConfig}
          soundEnabled={progress.soundEnabled}
          onToggleSound={handleToggleSound}
          onBackToMap={() => {
            setCompletedLevelStats(null);
            setCurrentScreen('map');
          }}
          onLevelComplete={handleLevelComplete}
        />
      )}

      {/* LEVEL COMPLETE CELEBRATION MODAL */}
      {completedLevelStats && (
        <LevelCompleteModal
          level={completedLevelStats.level}
          score={completedLevelStats.score}
          stars={completedLevelStats.stars}
          accuracy={completedLevelStats.accuracy}
          gradeDescription={completedLevelStats.gradeDescription}
          onNextLevel={handleNextLevel}
          onReplay={handleReplayLevel}
          onBackToMap={() => {
            setCompletedLevelStats(null);
            setCurrentScreen('map');
          }}
          hasNextLevel={hasNextLevel}
        />
      )}

      {/* PROGRESS & BADGES MODAL */}
      <ProgressModal
        progress={progress}
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
