'use client';

import React from 'react';
import { GameProgress } from '@/types/game';
import { ProfessorBlob } from './ProfessorBlob';
import { MonsterSvg } from '@/components/monsters/MonsterSvg';
import { GROUND_TRUTH_MONSTERS } from '@/data/monsters';
import { soundEffects } from '@/lib/audio';
import { Play, Volume2, VolumeX, Trophy, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  progress: GameProgress;
  onStartGame: () => void;
  onContinueGame: () => void;
  onToggleSound: () => void;
  onToggleDifficulty: () => void;
  onOpenProgress: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  progress,
  onStartGame,
  onContinueGame,
  onToggleSound,
  onToggleDifficulty,
  onOpenProgress,
}) => {
  const hasSavedProgress = Object.keys(progress.completedLevels).length > 0;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-100/80 via-purple-100/50 to-pink-100/70 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900 select-none overflow-hidden">
      {/* BACKGROUND FLOATING DECORATIONS */}
      <div className="absolute top-6 left-8 opacity-25 dark:opacity-10 pointer-events-none transform -rotate-12 hidden md:block">
        <MonsterSvg monster={GROUND_TRUTH_MONSTERS[0]} size="lg" />
      </div>
      <div className="absolute bottom-8 left-12 opacity-25 dark:opacity-10 pointer-events-none transform rotate-6 hidden md:block">
        <MonsterSvg monster={GROUND_TRUTH_MONSTERS[1]} size="lg" />
      </div>
      <div className="absolute top-10 right-10 opacity-25 dark:opacity-10 pointer-events-none transform rotate-12 hidden md:block">
        <MonsterSvg monster={GROUND_TRUTH_MONSTERS[2]} size="lg" />
      </div>
      <div className="absolute bottom-12 right-12 opacity-25 dark:opacity-10 pointer-events-none transform -rotate-6 hidden md:block">
        <MonsterSvg monster={GROUND_TRUTH_MONSTERS[5]} size="lg" />
      </div>

      {/* TOP CONTROLS */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
        <button
          onClick={onToggleSound}
          className="p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-md border border-purple-100 dark:border-purple-800 text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all"
          title={progress.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
        >
          {progress.soundEnabled ? (
            <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <VolumeX className="w-5 h-5 text-slate-400" />
          )}
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            onOpenProgress();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-md border border-purple-100 dark:border-purple-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:scale-105 active:scale-95 transition-all"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Records</span>
        </button>
      </div>

      {/* MAIN HERO CARD */}
      <div className="relative z-10 w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-purple-200 dark:border-purple-800/80 p-6 sm:p-10 text-center my-6">
        {/* Game Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          Discrete Mathematics Educational Game
        </div>

        {/* Game Title */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100 leading-tight mb-2">
          Monster Sort
          <span className="block text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-300">
            The Sorting Kingdom
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
          Help Professor Blob organize the magical creatures of the realm using Set Theory, Venn Diagrams, Unions, Intersections, and Complements!
        </p>

        {/* PROFESSOR BLOB GREETING */}
        <div className="my-6 flex justify-center">
          <ProfessorBlob
            mood="greeting"
            size="md"
            message="Greetings, young logician! Ready to master the magical laws of discrete mathematics?"
          />
        </div>

        {/* DIFFICULTY / AGE MODE SELECTOR */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-6">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Game Mode:
          </span>
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                if (progress.difficultyMode !== 'explorer') {
                  soundEffects.playClick();
                  onToggleDifficulty();
                }
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                progress.difficultyMode === 'explorer'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              🌱 Explorer (Ages 7–9)
            </button>
            <button
              onClick={() => {
                if (progress.difficultyMode !== 'scholar') {
                  soundEffects.playClick();
                  onToggleDifficulty();
                }
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                progress.difficultyMode === 'scholar'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              🎓 Scholar (Ages 10–12)
            </button>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6">
          {hasSavedProgress ? (
            <>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onContinueGame();
                }}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                Continue Adventure ({progress.totalStars} ⭐)
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onStartGame();
                }}
                className="w-full sm:w-auto px-5 py-4 rounded-2xl border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-sm active:scale-95 transition-all"
              >
                Kingdom Map
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                soundEffects.playClick();
                onStartGame();
              }}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Enter the Kingdom!
            </button>
          )}
        </div>

        {/* Discrete math accreditation footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
          College Discrete Mathematics Set Theory Project • 100% Offline & Private
        </div>
      </div>
    </div>
  );
};
