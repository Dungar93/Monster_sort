'use client';

import React, { useState } from 'react';
import { GameProgress } from '@/types/game';
import { LEVELS } from '@/data/levels';
import { Trophy, Star, Award, RotateCcw, X, CheckCircle, ShieldAlert } from 'lucide-react';
import { soundEffects } from '@/lib/audio';

interface ProgressModalProps {
  progress: GameProgress;
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

const BADGES_CONFIG = [
  { id: 'first_sort', title: 'First Sort', desc: 'Completed your first sorting mission', icon: '🌱' },
  { id: 'garden_champion', title: 'Garden Botanist', desc: 'Unlocked World 2 (Venn Valley)', icon: '🌸' },
  { id: 'venn_virtuoso', title: 'Venn Virtuoso', desc: 'Unlocked World 3 (Mystery Castle)', icon: '🔮' },
  { id: 'castle_master', title: 'Castle Codebreaker', desc: 'Unlocked World 4 (Triple Circle)', icon: '🏰' },
  { id: 'triple_champion', title: 'Triple Venn Champion', desc: 'Unlocked World 5 (Monster Master)', icon: '👑' },
  { id: 'perfectionist', title: 'Flawless Logician', desc: 'Earned 3 stars on at least 5 levels', icon: '⭐' },
  { id: 'stargazer', title: 'Stargazer', desc: 'Collected 15 total stars', icon: '✨' },
];

export const ProgressModal: React.FC<ProgressModalProps> = ({
  progress,
  isOpen,
  onClose,
  onResetProgress,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const completedCount = Object.keys(progress.completedLevels).length;
  const totalLevels = LEVELS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 overflow-hidden p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/60 rounded-xl text-amber-600 dark:text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Kingdom Hall of Records
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">
                Your Progress & Trophies
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-3 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase">
              <Star className="w-3.5 h-3.5 fill-current" /> Stars
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-300 mt-0.5">
              {progress.totalStars}
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 p-3 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase">
              <Award className="w-3.5 h-3.5" /> Score
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-300 mt-0.5">
              {progress.totalScore}
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase">
              <CheckCircle className="w-3.5 h-3.5" /> Levels
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
              {completedCount}/{totalLevels}
            </div>
          </div>
        </div>

        {/* BADGES SECTION */}
        <div className="my-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Badges & Achievements
          </h4>
          <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
            {BADGES_CONFIG.map((b) => {
              const unlocked = progress.badges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                    unlocked
                      ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-50 grayscale'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {b.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                      {b.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RESET PROGRESS CONFIRMATION */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-bold hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Game Progress
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-xl border border-rose-200 dark:border-rose-900">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">
                Are you sure?
              </span>
              <button
                onClick={() => {
                  soundEffects.playBoing();
                  onResetProgress();
                  setShowConfirmReset(false);
                }}
                className="px-2 py-1 bg-rose-600 text-white text-[11px] font-bold rounded-lg hover:bg-rose-700"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
