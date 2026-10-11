'use client';

import React from 'react';
import { Monster, MonsterColor } from '@/types/game';

interface MonsterSvgProps {
  monster: Monster;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  className?: string;
  showName?: boolean;
}

const COLOR_MAP: Record<MonsterColor, { fill: string; stroke: string; spotFill: string; darkFill: string }> = {
  red: { fill: '#f87171', stroke: '#dc2626', spotFill: '#b91c1c', darkFill: '#991b1b' },
  blue: { fill: '#60a5fa', stroke: '#2563eb', spotFill: '#1d4ed8', darkFill: '#1e40af' },
  green: { fill: '#4ade80', stroke: '#16a34a', spotFill: '#15803d', darkFill: '#166534' },
  yellow: { fill: '#fde047', stroke: '#ca8a04', spotFill: '#a16207', darkFill: '#854d0e' },
  purple: { fill: '#c084fc', stroke: '#9333ea', spotFill: '#7e22ce', darkFill: '#6b21a8' },
};

export const MonsterSvg: React.FC<MonsterSvgProps> = ({
  monster,
  size = 'responsive',
  className = '',
  showName = false,
}) => {
  const { color, shape, size: monsterScale, horns, wings, tail, spots } = monster;
  const colors = COLOR_MAP[color] || COLOR_MAP.red;

  // Determine size classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    responsive: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
  }[size];

  // Visual scale according to monster.size
  const scaleRatio = monsterScale === 'small' ? 0.85 : monsterScale === 'large' ? 1.15 : 1.0;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className={`${sizeClasses} transition-transform duration-300 transform hover:scale-105 filter drop-shadow-md`}
        aria-label={`${monster.name}: ${monster.color}, ${monster.shape}, ${monster.size}`}
      >
        <defs>
          <radialGradient id={`grad-${monster.id}`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="60%" stopColor={colors.fill} />
            <stop offset="100%" stopColor={colors.darkFill} />
          </radialGradient>
          <filter id={`shadow-${monster.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
          </filter>
        </defs>

        <g transform={`translate(${100 * (1 - scaleRatio)}, ${100 * (1 - scaleRatio)}) scale(${scaleRatio})`}>
          {/* TAIL (drawn behind body) */}
          {tail && (
            <path
              d="M 155 135 C 185 145 195 115 175 95 C 165 85 155 105 145 120"
              fill={colors.fill}
              stroke={colors.stroke}
              strokeWidth="5"
              strokeLinecap="round"
              className="animate-pulse"
            />
          )}

          {/* WINGS (drawn behind body) */}
          {wings && (
            <g className="animate-bounce" style={{ animationDuration: '3s' }}>
              {/* Left Wing */}
              <path
                d="M 50 95 C 15 65 10 30 45 45 C 55 50 55 75 60 90 Z"
                fill="#e0e7ff"
                stroke="#6366f1"
                strokeWidth="4"
                opacity="0.9"
              />
              <path d="M 40 55 C 30 65 35 75 52 82" stroke="#818cf8" strokeWidth="2" fill="none" />
              {/* Right Wing */}
              <path
                d="M 150 95 C 185 65 190 30 155 45 C 145 50 145 75 140 90 Z"
                fill="#e0e7ff"
                stroke="#6366f1"
                strokeWidth="4"
                opacity="0.9"
              />
              <path d="M 160 55 C 170 65 165 75 148 82" stroke="#818cf8" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* HORNS (drawn behind or on top of head) */}
          {horns && (
            <g>
              {/* Left horn */}
              <path
                d="M 68 55 C 55 25 45 20 40 28 C 45 45 60 55 72 65 Z"
                fill="#fde047"
                stroke="#ca8a04"
                strokeWidth="3.5"
              />
              {/* Right horn */}
              <path
                d="M 132 55 C 145 25 155 20 160 28 C 155 45 140 55 128 65 Z"
                fill="#fde047"
                stroke="#ca8a04"
                strokeWidth="3.5"
              />
            </g>
          )}

          {/* MAIN BODY BY SHAPE */}
          {shape === 'round' && (
            <ellipse
              cx="100"
              cy="105"
              rx="62"
              ry="58"
              fill={`url(#grad-${monster.id})`}
              stroke={colors.stroke}
              strokeWidth="5"
            />
          )}

          {shape === 'square' && (
            <rect
              x="42"
              y="48"
              width="116"
              height="114"
              rx="28"
              fill={`url(#grad-${monster.id})`}
              stroke={colors.stroke}
              strokeWidth="5"
            />
          )}

          {shape === 'triangular' && (
            <path
              d="M 100 42 C 110 42 165 140 158 152 C 152 162 48 162 42 152 C 35 140 90 42 100 42 Z"
              fill={`url(#grad-${monster.id})`}
              stroke={colors.stroke}
              strokeWidth="5"
            />
          )}

          {/* SPOTS */}
          {spots && (
            <g opacity="0.6">
              <circle cx="70" cy="80" r="9" fill={colors.spotFill} />
              <circle cx="130" cy="82" r="7" fill={colors.spotFill} />
              <circle cx="78" cy="135" r="11" fill={colors.spotFill} />
              <circle cx="122" cy="130" r="9" fill={colors.spotFill} />
              <circle cx="100" cy="142" r="6" fill={colors.spotFill} />
            </g>
          )}

          {/* FACE: EYES */}
          <g>
            {/* Left Eye */}
            <circle cx="80" cy="95" r="16" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <circle cx="82" cy="95" r="8" fill="#1e293b" />
            <circle cx="84" cy="91" r="3.5" fill="#ffffff" />
            {/* Right Eye */}
            <circle cx="120" cy="95" r="16" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <circle cx="118" cy="95" r="8" fill="#1e293b" />
            <circle cx="120" cy="91" r="3.5" fill="#ffffff" />

            {/* Rosy Cheeks */}
            <ellipse cx="64" cy="112" rx="7" ry="4" fill="#fb7185" opacity="0.6" />
            <ellipse cx="136" cy="112" rx="7" ry="4" fill="#fb7185" opacity="0.6" />

            {/* Cute Smile */}
            <path
              d="M 90 115 Q 100 126 110 115"
              fill="none"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* CUTE FEET */}
          <g>
            <ellipse cx="78" cy="162" rx="14" ry="7" fill={colors.darkFill} stroke={colors.stroke} strokeWidth="2.5" />
            <ellipse cx="122" cy="162" rx="14" ry="7" fill={colors.darkFill} stroke={colors.stroke} strokeWidth="2.5" />
          </g>
        </g>

        {/* MONSTER ID BADGE (Top corner) */}
        <g transform="translate(14, 16)">
          <rect x="0" y="0" width="34" height="22" rx="6" fill="#1e293b" opacity="0.85" />
          <text
            x="17"
            y="15"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {monster.id}
          </text>
        </g>
      </svg>

      {showName && (
        <span className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight text-center">
          {monster.name}
        </span>
      )}
    </div>
  );
};
