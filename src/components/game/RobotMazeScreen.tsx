'use client';

import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, RotateCcw, Shapes, Maximize2, Minimize2 } from 'lucide-react';
import { soundEffects } from '@/lib/audio';

interface RobotMazeScreenProps {
  onBackToHub: () => void;
  onSwitchToMonsterSort: () => void;
  onRetakeQuiz: () => void;
}

export const RobotMazeScreen: React.FC<RobotMazeScreenProps> = ({
  onBackToHub,
  onSwitchToMonsterSort,
  onRetakeQuiz,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative w-full flex flex-col bg-slate-900 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'min-h-screen'
      }`}
    >
      {/* TOP REALM NAVIGATION BAR */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-850 border-b border-slate-750 text-white z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToHub();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            title="Return to Dual Realm Hub"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Realm Hub</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-white leading-tight">
                Robot Maze Challenge
              </h1>
              <span className="text-[10px] text-cyan-400 font-bold block">
                Graph Theory & BFS Shortest Path
              </span>
            </div>
          </div>
        </div>

        {/* SWITCH REALM CONTROLS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switch to Monster Sort */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onSwitchToMonsterSort();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-extrabold shadow-md active:scale-95 transition-all"
            title="Switch to Monster Sort (Set Theory)"
          >
            <Shapes className="w-3.5 h-3.5" />
            <span>Play Monster Sort 🏰</span>
          </button>

          {/* Retake Quiz */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onRetakeQuiz();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-colors hidden md:flex"
            title="Retake Personality Test"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Retake Quiz</span>
          </button>

          {/* Open In New Tab */}
          <a
            href="/robot-maze/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Open Robot Maze in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* IFRAME GAME CONTAINER */}
      <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900 text-white">
            <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mb-3" />
            <span className="text-sm font-bold text-cyan-300">
              Launching Robot Maze Challenge...
            </span>
          </div>
        )}

        <iframe
          src="/robot-maze/index.html"
          title="Robot Maze Challenge Game"
          className="w-full h-full border-0 min-h-[calc(100vh-50px)]"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};
