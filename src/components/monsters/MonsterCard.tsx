'use client';

import React from 'react';
import { Monster } from '@/types/game';
import { MonsterSvg } from './MonsterSvg';

interface MonsterCardProps {
  monster: Monster;
  isSelected?: boolean;
  onSelect?: (monster: Monster) => void;
  compact?: boolean;
  disabled?: boolean;
  className?: string;
}

export const MonsterCard: React.FC<MonsterCardProps> = ({
  monster,
  isSelected = false,
  onSelect,
  compact = false,
  disabled = false,
  className = '',
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    if (disabled) return;
    e.dataTransfer.setData('text/plain', monster.id);
    e.dataTransfer.effectAllowed = 'move';
    onSelect?.(monster);
  };

  const handleClick = () => {
    if (disabled) return;
    onSelect?.(monster);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(monster);
    }
  };

  if (compact) {
    return (
      <div
        draggable={!disabled}
        onDragStart={handleDragStart}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={`Select ${monster.name}`}
        aria-pressed={isSelected}
        className={`relative inline-flex flex-col items-center justify-center p-2 rounded-2xl cursor-pointer transition-all duration-200 transform ${
          isSelected
            ? 'ring-4 ring-amber-400 bg-amber-50 dark:bg-amber-950/40 scale-105 shadow-lg'
            : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow hover:shadow-md'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'} ${className}`}
      >
        <MonsterSvg monster={monster} size="sm" />
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
          {monster.id}
        </span>
      </div>
    );
  }

  return (
    <div
      draggable={!disabled}
      onDragStart={handleDragStart}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Select ${monster.name}: ${monster.color}, ${monster.shape}, ${monster.size}, horns: ${monster.horns}, wings: ${monster.wings}`}
      aria-pressed={isSelected}
      className={`relative flex flex-col items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 transform select-none ${
        isSelected
          ? 'ring-4 ring-purple-500 bg-purple-50/90 dark:bg-purple-950/50 scale-105 shadow-xl -translate-y-1'
          : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-sm hover:shadow-md hover:-translate-y-0.5'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-95'} ${className}`}
    >
      {/* Selected Indicator Pill */}
      {isSelected && (
        <span className="absolute -top-2.5 px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-extrabold uppercase rounded-full tracking-wider shadow animate-bounce">
          Ready to Place!
        </span>
      )}

      {/* Monster Visual */}
      <MonsterSvg monster={monster} size="responsive" />

      {/* Name */}
      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 text-center">
        {monster.name}
      </div>

      {/* Properties Pills for Quick Reference */}
      <div className="flex flex-wrap items-center justify-center gap-1 mt-2 max-w-[140px]">
        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md capitalize">
          {monster.color}
        </span>
        {monster.horns && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-md">
            Horns ✦
          </span>
        )}
        {monster.wings && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-md">
            Wings 🪽
          </span>
        )}
        {monster.tail && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 rounded-md">
            Tail
          </span>
        )}
        {monster.spots && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 rounded-md">
            Spots •
          </span>
        )}
      </div>
    </div>
  );
};
