'use client';

import React from 'react';
import { QuizResult } from '@/data/quiz';
import { GameProgress } from '@/types/game';
import { soundEffects } from '@/lib/audio';
import { Sparkles, Bot, Trophy, Compass, ArrowRight, Star } from 'lucide-react';

interface DualRealmHubProps {
  progress: GameProgress;
  quizResult: QuizResult | null;
  onStartQuiz: () => void;
  onPlayMonsterSort: () => void;
  onPlayRobotMaze: () => void;
  onOpenRecords: () => void;
}

export const DualRealmHub: React.FC<DualRealmHubProps> = ({
  progress,
  quizResult,
  onStartQuiz,
  onPlayMonsterSort,
  onPlayRobotMaze,
  onOpenRecords,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/80 via-purple-100/50 to-pink-100/70 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900 text-slate-800 dark:text-slate-100 p-4 sm:p-6 select-none flex flex-col justify-between">
      {/* TOP BAR */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between p-3.5 sm:p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md border border-purple-100 dark:border-purple-900/50 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-2xl">
            <span>🏰</span>
            <span className="text-sm font-black text-slate-400">×</span>
            <span>🤖</span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-300">
              Discrete Math Adventures
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              The Dual Realms of Set Theory & Graph Theory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {quizResult && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300">
              <span>{quizResult.archetypeBadge}</span>
              <span>{quizResult.archetypeTitle.split('&')[0]}</span>
            </div>
          )}

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenRecords();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Records</span>
          </button>
        </div>
      </header>

      {/* MAIN HUB CONTENT */}
      <main className="max-w-6xl w-full mx-auto flex-1 flex flex-col justify-center my-4 space-y-6">
        {/* PERSONALITY QUIZ HERO CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                The Discrete Math Sorting Hat
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-2">
                Discover Your Mathematical Destiny!
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
                Answer 5 fun questions to find whether your brain is attuned to the
                <strong className="text-amber-300"> Set Theory Magic of Monster Sort</strong> or the
                <strong className="text-cyan-300"> Algorithmic Pathfinding of Robot Maze</strong>!
              </p>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                onStartQuiz();
              }}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-purple-900 hover:bg-purple-50 font-black text-sm sm:text-base shadow-lg hover:shadow-2xl active:scale-95 transition-all flex-shrink-0"
            >
              <Compass className="w-5 h-5 text-purple-600" />
              <span>{quizResult ? 'Retake Sorting Hat Quiz' : 'Take Personality Test ✨'}</span>
            </button>
          </div>
        </div>

        {/* THE TWO REALMS DUAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* REALM 1: MONSTER SORT */}
          <div className="relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white/95 dark:bg-slate-900/95 border-3 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-2xl hover:border-purple-400 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-3 bg-purple-100 dark:bg-purple-950/80 rounded-2xl text-3xl">
                  🏰
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  Set Theory Realm
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 group-hover:text-purple-600 transition-colors">
                Monster Sort: The Sorting Kingdom
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Join Professor Blob to classify cute monsters using set predicates, unions ($A \cup B$), intersections ($A \cap B$), complements ($A^c$), differences ($A - B$), and 2-set & 3-set Venn diagrams!
              </p>

              {/* Badges / Topics */}
              <div className="flex flex-wrap gap-1.5 my-4">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 rounded-lg">
                  Universal Set U
                </span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 rounded-lg">
                  Venn Diagrams (8 Regions)
                </span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 rounded-lg">
                  21 Puzzles • 5 Worlds
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span>{progress.totalStars} Stars Earned</span>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onPlayMonsterSort();
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
              >
                <span>Play Monster Sort</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* REALM 2: ROBOT MAZE */}
          <div className="relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white/95 dark:bg-slate-900/95 border-3 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-3 bg-blue-100 dark:bg-blue-950/80 rounded-2xl text-3xl">
                  🤖
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  Graph Theory Realm
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Robot Maze Challenge
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Guide Robo through 12 maze labyrinths to discover that mazes are graphs, routes are paths, and Breadth-First Search (BFS) mathematically computes the shortest path!
              </p>

              {/* Badges / Topics */}
              <div className="flex flex-wrap gap-1.5 my-4">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 rounded-lg">
                  Vertices & Edges
                </span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 rounded-lg">
                  Breadth-First Search (BFS)
                </span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 rounded-lg">
                  Robot Race & Detective Lab
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                <Bot className="w-4 h-4 text-blue-500" />
                <span>12 Maze Levels & Race</span>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onPlayRobotMaze();
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
              >
                <span>Play Robot Maze</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-6xl w-full mx-auto text-center text-xs text-slate-400 dark:text-slate-500 py-2">
        Discrete Mathematics College Projects • Monster Sort & Robot Maze • 100% Offline & Private
      </footer>
    </div>
  );
};
