'use client';

import React from 'react';

export type ProfessorMood = 'greeting' | 'explaining' | 'thinking' | 'celebrating' | 'hinting' | 'happy';

interface ProfessorBlobProps {
  mood?: ProfessorMood;
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfessorBlob: React.FC<ProfessorBlobProps> = ({
  mood = 'greeting',
  message,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
  }[size];

  return (
    <div className={`flex items-center gap-3 sm:gap-4 select-none ${className}`}>
      {/* PROFESSOR BLOB SVG CHARACTER */}
      <div className={`relative flex-shrink-0 ${sizeMap}`}>
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full filter drop-shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <radialGradient id="blobGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="60%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#6b21a8" />
            </radialGradient>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* LIGHTBULB FOR HINTING MOOD */}
          {mood === 'hinting' && (
            <g transform="translate(68, 2)" className="animate-bounce">
              <path
                d="M 12 0 C 6 0 2 4 2 9 C 2 13 5 15 6 18 L 18 18 C 19 15 22 13 22 9 C 22 4 18 0 12 0 Z"
                fill="#fde047"
                stroke="#ca8a04"
                strokeWidth="1.5"
              />
              <rect x="7" y="19" width="10" height="3" rx="1.5" fill="#ca8a04" />
              {/* Glow rays */}
              <line x1="12" y1="-4" x2="12" y2="-8" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="2" x2="-2" y2="0" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="2" x2="26" y2="0" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* BLOB BODY */}
          <path
            d="M 80 40 C 125 40 145 75 145 110 C 145 145 115 155 80 155 C 45 155 15 145 15 110 C 15 75 35 40 80 40 Z"
            fill="url(#blobGrad)"
            className={mood === 'celebrating' ? 'animate-bounce' : 'animate-pulse'}
            style={{ animationDuration: mood === 'celebrating' ? '1s' : '4s' }}
          />

          {/* GRADUATION CAP (MORTARBOARD) */}
          <g transform="translate(40, 20)">
            {/* Diamond mortarboard top */}
            <polygon
              points="40,2 80,14 40,26 0,14"
              fill="url(#capGrad)"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Skullcap underneath */}
            <path d="M 22 17 Q 40 25 58 17 L 55 24 Q 40 32 25 24 Z" fill="#0f172a" />
            {/* Button on top */}
            <circle cx="40" cy="14" r="3.5" fill="#f59e0b" />
            {/* Tassel */}
            <path
              d="M 40 14 Q 58 22 64 36"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="64" cy="38" r="3" fill="#f59e0b" />
          </g>

          {/* ROUND PROFESSOR GLASSES */}
          <g>
            {/* Left rim */}
            <circle cx="58" cy="92" r="16" fill="#ffffff" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="3.5" />
            <circle cx="60" cy="92" r="7" fill="#1e293b" />
            <circle cx="63" cy="89" r="2.5" fill="#ffffff" />
            {/* Right rim */}
            <circle cx="102" cy="92" r="16" fill="#ffffff" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="3.5" />
            <circle cx="100" cy="92" r="7" fill="#1e293b" />
            <circle cx="103" cy="89" r="2.5" fill="#ffffff" />
            {/* Bridge */}
            <path d="M 74 90 Q 80 84 86 90" fill="none" stroke="#f59e0b" strokeWidth="3.5" />
          </g>

          {/* ROSY BLUSH CHEEKS */}
          <ellipse cx="40" cy="106" rx="8" ry="5" fill="#f472b6" opacity="0.6" />
          <ellipse cx="120" cy="106" rx="8" ry="5" fill="#f472b6" opacity="0.6" />

          {/* MOUTH BY MOOD */}
          {mood === 'celebrating' ? (
            <path d="M 68 112 Q 80 132 92 112 Z" fill="#ec4899" stroke="#9d174d" strokeWidth="2" />
          ) : mood === 'thinking' ? (
            <path d="M 72 118 Q 80 114 88 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <path d="M 70 114 Q 80 125 90 114" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          )}

          {/* SPARKLES FOR CELEBRATING */}
          {mood === 'celebrating' && (
            <g className="animate-spin" style={{ transformOrigin: '80px 80px', animationDuration: '6s' }}>
              <polygon points="20,50 23,56 29,59 23,62 20,68 17,62 11,59 17,56" fill="#fde047" />
              <polygon points="140,45 142,49 147,51 142,53 140,57 138,53 133,51 138,49" fill="#fde047" />
            </g>
          )}
        </svg>
      </div>

      {/* SPEECH BUBBLE MESSAGE */}
      {message && (
        <div className="relative flex-1 bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-800 rounded-3xl p-3.5 sm:p-4 shadow-md max-w-xl">
          {/* Arrow pointing to Blob */}
          <div className="absolute left-[-9px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white dark:border-r-slate-800" />
          <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
            <span className="font-bold text-purple-600 dark:text-purple-400 mr-1.5">
              Professor Blob:
            </span>
            {message}
          </div>
        </div>
      )}
    </div>
  );
};
