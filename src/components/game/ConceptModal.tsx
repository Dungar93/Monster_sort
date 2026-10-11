'use client';

import React from 'react';
import { LevelConfig } from '@/types/game';
import { BookOpen, X, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '@/lib/audio';

interface ConceptModalProps {
  level: LevelConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({
  level,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 overflow-hidden p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/60 rounded-xl text-purple-600 dark:text-purple-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Discrete Mathematics Guide
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">
                {level.conceptTitle}
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

        {/* Content */}
        <div className="my-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Explanation */}
          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-1">
              Core Concept
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {level.conceptExplanation}
            </p>
          </div>

          {/* Formal Set Theory Notation */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Mathematical Notation & Set-Builder Form
            </h4>
            <div className="font-mono text-sm sm:text-base font-extrabold text-indigo-700 dark:text-indigo-300 py-1 px-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
              {level.formalMath}
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Rules of This Level
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{level.instruction}</span>
              </li>
              {level.hints.map((hint, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Got It Button */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
        >
          Got It, Let’s Solve It!
        </button>
      </div>
    </div>
  );
};
