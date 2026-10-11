'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, calculateQuizResult, QuizResult, setAndSaveQuizResult } from '@/data/quiz';
import { soundEffects } from '@/lib/audio';
import { Sparkles, ArrowRight, RotateCcw, Shapes, Bot } from 'lucide-react';

interface PersonalityQuizProps {
  onSelectGame: (game: 'monster-sort' | 'robot-maze') => void;
  onSkipQuiz?: () => void;
  initialResult?: QuizResult | null;
}

export const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({
  onSelectGame,
  onSkipQuiz,
  initialResult = null,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [result, setResult] = useState<QuizResult | null>(initialResult);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (choice: 'A' | 'B') => {
    soundEffects.playPop();
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: choice,
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all questions
      const finalResult = calculateQuizResult(updatedAnswers);
      setResult(finalResult);
      setAndSaveQuizResult(finalResult);
      soundEffects.playFanfare();

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleRestartQuiz = () => {
    soundEffects.playClick();
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  // If result is ready, display celebration result card
  if (result) {
    const isMonsterMatched = result.dominantGame === 'monster-sort';
    const isRobotMatched = result.dominantGame === 'robot-maze';

    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-100/90 via-purple-100/60 to-pink-100/80 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900 select-none">
        <div className="relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-purple-300 dark:border-purple-700/80 p-6 sm:p-10 text-center animate-scaleUp">
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Your Discrete Mathematics Destiny Revealed!
          </div>

          <div className="text-6xl sm:text-7xl my-3 animate-bounce">
            {result.archetypeBadge}
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 leading-tight">
            {result.archetypeTitle}
          </h2>

          <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-300 mt-1 mb-4">
            {result.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
            {result.description}
          </p>

          {/* AFFINITY BREAKDOWN BAR */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                <Shapes className="w-4 h-4" />
                Monster Sort ({result.monsterSortScore}%)
              </span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Bot className="w-4 h-4" />
                Robot Maze ({result.robotMazeScore}%)
              </span>
            </div>

            <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-700"
                style={{ width: `${result.monsterSortScore}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-700"
                style={{ width: `${result.robotMazeScore}%` }}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">
            {/* Primary Matched Game Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectGame(isRobotMatched ? 'robot-maze' : 'monster-sort');
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Enter Your Matched Game:</span>
              <span className="underline decoration-amber-400 decoration-2">
                {isRobotMatched ? 'Robot Maze Challenge 🤖' : 'Monster Sort Kingdom 🏰'}
              </span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            {/* Alternate Game Option */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onSelectGame(isMonsterMatched ? 'robot-maze' : 'monster-sort');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {isMonsterMatched
                  ? 'Or Try Robot Maze Challenge 🤖'
                  : 'Or Try Monster Sort Kingdom 🏰'}
              </button>

              <button
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Question Card
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-100/90 via-purple-100/60 to-pink-100/80 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900 select-none">
      <div className="relative w-full max-w-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-purple-200 dark:border-purple-800/80 p-6 sm:p-10 my-4">
        {/* TOP PROGRESS BAR */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
            <span>The Discrete Math Sorting Hat</span>
            <span>
              Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <div className="w-full h-2.5 bg-purple-100 dark:bg-purple-950/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* QUESTION TITLE & SCENARIO */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">
            {currentQ.title}
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 leading-snug">
            {currentQ.scenario}
          </h2>
        </div>

        {/* CHOICES: OPTION A vs OPTION B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {/* OPTION A: MONSTER SORT */}
          <button
            onClick={() => handleSelectOption('A')}
            className="group relative flex flex-col items-start text-left p-5 sm:p-6 rounded-3xl border-3 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-100/60 hover:scale-[1.02] shadow-sm hover:shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-3xl sm:text-4xl">{currentQ.optionA.icon}</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-purple-200/80 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                {currentQ.optionA.tag}
              </span>
            </div>

            <p className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 leading-snug mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
              {currentQ.optionA.text}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-auto pt-2 border-t border-purple-100 dark:border-purple-900/60">
              {currentQ.optionA.description}
            </p>
          </button>

          {/* OPTION B: ROBOT MAZE */}
          <button
            onClick={() => handleSelectOption('B')}
            className="group relative flex flex-col items-start text-left p-5 sm:p-6 rounded-3xl border-3 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-100/60 hover:scale-[1.02] shadow-sm hover:shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-3xl sm:text-4xl">{currentQ.optionB.icon}</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-200/80 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                {currentQ.optionB.tag}
              </span>
            </div>

            <p className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 leading-snug mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              {currentQ.optionB.text}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-auto pt-2 border-t border-blue-100 dark:border-blue-900/60">
              {currentQ.optionB.description}
            </p>
          </button>
        </div>

        {/* BOTTOM HELPER / SKIP */}
        {onSkipQuiz && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                soundEffects.playClick();
                onSkipQuiz();
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:underline"
            >
              Skip directly to games ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
