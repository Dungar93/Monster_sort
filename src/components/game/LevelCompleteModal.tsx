'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LevelConfig } from '@/types/game';
import { ProfessorBlob } from './ProfessorBlob';
import { soundEffects } from '@/lib/audio';
import { Star, RotateCcw, ArrowRight, Map, Award } from 'lucide-react';

interface LevelCompleteModalProps {
  level: LevelConfig;
  score: number;
  stars: number;
  accuracy: number;
  gradeDescription: string;
  onNextLevel: () => void;
  onReplay: () => void;
  onBackToMap: () => void;
  hasNextLevel: boolean;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  level,
  score,
  stars,
  accuracy,
  gradeDescription,
  onNextLevel,
  onReplay,
  onBackToMap,
  hasNextLevel,
}) => {
  useEffect(() => {
    // Play celebratory sound
    soundEffects.playFanfare();

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // Ignore if canvas-confetti is not supported
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-amber-300 dark:border-amber-500 overflow-hidden p-6 sm:p-8 transform transition-all animate-scaleUp">
        {/* Celebration Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-full font-bold text-xs uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Level Completed!
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            {level.title}
          </h2>
          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">
            {gradeDescription}
          </p>
        </div>

        {/* STARS RATING ANIMATION */}
        <div className="flex items-center justify-center gap-3 my-4">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`transform transition-all duration-500 ${
                starIndex <= stars
                  ? 'text-amber-400 scale-110 drop-shadow-md animate-bounce'
                  : 'text-slate-200 dark:text-slate-700'
              }`}
              style={{ animationDelay: `${starIndex * 150}ms`, animationIterationCount: 2 }}
            >
              <Star
                className="w-10 h-10 sm:w-12 sm:h-12 fill-current"
                strokeWidth={1.5}
              />
            </div>
          ))}
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 gap-3 my-4 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="text-center border-r border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
              Points Earned
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
              +{score}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
              Accuracy
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* PROFESSOR BLOB EXPLANATION */}
        <div className="my-4">
          <ProfessorBlob
            mood="celebrating"
            size="sm"
            message={`Splendid thinking! Here is the mathematical reason: ${level.explanation}`}
          />
        </div>

        {/* FORMAL MATH NOTATION CARD */}
        <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 text-center mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
            Formal Set Theory Representation
          </span>
          <span className="font-mono text-sm sm:text-base font-extrabold text-purple-900 dark:text-purple-200">
            {level.formalMath}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onReplay();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Replay
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToMap();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-xs sm:text-sm hover:bg-purple-50 dark:hover:bg-purple-950/40 active:scale-95 transition-all"
          >
            <Map className="w-4 h-4" />
            Kingdom Map
          </button>

          {hasNextLevel && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onNextLevel();
              }}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              Next Level
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
