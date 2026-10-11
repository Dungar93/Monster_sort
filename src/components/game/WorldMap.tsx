'use client';

import React from 'react';
import { GameProgress } from '@/types/game';
import { WORLDS } from '@/data/worlds';
import { LEVELS } from '@/data/levels';
import { ProfessorBlob } from './ProfessorBlob';
import { soundEffects } from '@/lib/audio';
import {
  Lock,
  Star,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  ArrowLeft,
} from 'lucide-react';

interface WorldMapProps {
  progress: GameProgress;
  onSelectLevel: (levelId: string) => void;
  onToggleSound: () => void;
  onToggleDifficulty: () => void;
  onOpenProgress: () => void;
  onBackToWelcome: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  progress,
  onSelectLevel,
  onToggleSound,
  onToggleDifficulty,
  onOpenProgress,
  onBackToWelcome,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-pink-50/60 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 text-slate-800 dark:text-slate-100 p-4 sm:p-6 select-none">
      {/* TOP NAVIGATION BAR */}
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md border border-purple-100 dark:border-purple-900/50 mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToWelcome();
            }}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Return to Welcome Screen"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-300">
              Kingdom Map
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Select a world and mission to begin sorting!
            </p>
          </div>
        </div>

        {/* CONTROLS & STATS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Badge Toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleDifficulty();
            }}
            className="px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold capitalize hover:bg-purple-100 transition-colors"
            title="Toggle between Explorer (Ages 7-9) and Scholar (Ages 10-12)"
          >
            Mode: {progress.difficultyMode}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            title={progress.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Hall of Records / Trophy Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenProgress();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Records</span>
          </button>

          {/* Total Stars Pill */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-extrabold text-xs">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>{progress.totalStars}</span>
          </div>
        </div>
      </header>

      {/* PROFESSOR BLOB BANNER */}
      <div className="max-w-6xl mx-auto mb-6">
        <ProfessorBlob
          mood="greeting"
          size="sm"
          message="Welcome to the Sorting Kingdom! Start in World 1: The Sorting Garden. Collect stars to unlock later magical realms!"
        />
      </div>

      {/* WORLDS GRID */}
      <main className="max-w-6xl mx-auto space-y-6">
        {WORLDS.map((world) => {
          const isUnlocked = progress.unlockedWorlds.includes(world.id);
          const worldLevels = LEVELS.filter((l) => l.worldId === world.id);

          // Count stars earned in this world
          const worldStars = worldLevels.reduce((acc, lvl) => {
            const lp = progress.completedLevels[lvl.id];
            return acc + (lp ? lp.stars : 0);
          }, 0);
          const maxStars = worldLevels.length * 3;

          return (
            <div
              key={world.id}
              className={`rounded-3xl border-3 transition-all duration-300 overflow-hidden ${
                isUnlocked
                  ? `${world.colorTheme.cardBorder} bg-white/90 dark:bg-slate-900/90 shadow-lg hover:shadow-xl`
                  : 'border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 opacity-70'
              }`}
            >
              {/* World Header */}
              <div
                className={`p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r ${world.colorTheme.bgGradient}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${world.colorTheme.badgeBg}`}>
                      World {world.id} • {world.difficulty}
                    </span>
                    {!isUnlocked && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                        Requires {world.requiredStarsToUnlock} Stars
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                    {world.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                    {world.description}
                  </p>
                </div>

                {/* World Star Progress */}
                {isUnlocked && (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <span>
                      {worldStars} / {maxStars} Stars
                    </span>
                  </div>
                )}
              </div>

              {/* Levels List */}
              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {worldLevels.map((lvl) => {
                  const levelProgress = progress.completedLevels[lvl.id];
                  const isCompleted = !!levelProgress?.completed;
                  const stars = levelProgress?.stars || 0;

                  return (
                    <div
                      key={lvl.id}
                      className={`relative flex flex-col justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                        !isUnlocked
                          ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 cursor-not-allowed'
                          : isCompleted
                          ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-400 hover:shadow-md'
                          : 'border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-850 hover:border-purple-400 hover:shadow-md'
                      }`}
                    >
                      <div>
                        {/* Level badge */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                            Level {world.id}.{lvl.levelNumber}
                          </span>
                          {isCompleted && (
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded-full">
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Level Title */}
                        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1 leading-snug">
                          {lvl.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                          {lvl.subtitle}
                        </p>
                      </div>

                      {/* Stars & Play Button */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        {/* Stars */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= stars
                                  ? 'text-amber-400 fill-current'
                                  : 'text-slate-200 dark:text-slate-700'
                              }`}
                            />
                          ))}
                        </div>

                        {/* Button */}
                        {isUnlocked ? (
                          <button
                            onClick={() => {
                              soundEffects.playClick();
                              onSelectLevel(lvl.id);
                            }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs shadow transition-all active:scale-95 ${
                              isCompleted
                                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <RotateCcw className="w-3 h-3" />
                                Replay
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-current" />
                                Play
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="p-1 text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
