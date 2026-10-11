'use client';

import React, { useState } from 'react';
import { Monster, SetDefinition } from '@/types/game';
import { MonsterSvg } from '@/components/monsters/MonsterSvg';

interface SingleSetBinProps {
  targetSet: SetDefinition;
  placedInside: Monster[];
  placedOutside: Monster[];
  selectedMonster: Monster | null;
  onPlaceMonster: (monsterId: string, regionId: string) => void;
  onRemoveMonster: (monsterId: string) => void;
  activeFeedbackRegion?: string | null;
}

export const SingleSetBin: React.FC<SingleSetBinProps> = ({
  targetSet,
  placedInside,
  placedOutside,
  selectedMonster,
  onPlaceMonster,
  onRemoveMonster,
  activeFeedbackRegion,
}) => {
  const [dragOverRegion, setDragOverRegion] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent, regionId: string) => {
    e.preventDefault();
    setDragOverRegion(regionId);
  };

  const handleDragLeave = () => {
    setDragOverRegion(null);
  };

  const handleDrop = (e: React.DragEvent, regionId: string) => {
    e.preventDefault();
    setDragOverRegion(null);
    const monsterId = e.dataTransfer.getData('text/plain');
    if (monsterId) {
      onPlaceMonster(monsterId, regionId);
    }
  };

  const handleRegionClick = (regionId: string) => {
    if (selectedMonster) {
      onPlaceMonster(selectedMonster.id, regionId);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
      {/* INSIDE TARGET SET BIN */}
      <div
        onDragOver={(e) => handleDragOver(e, 'INSIDE_TARGET')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'INSIDE_TARGET')}
        onClick={() => handleRegionClick('INSIDE_TARGET')}
        role="button"
        tabIndex={0}
        aria-label={`Target set: ${targetSet.label}`}
        className={`relative flex flex-col p-4 rounded-3xl border-3 transition-all duration-200 cursor-pointer min-h-[220px] ${
          dragOverRegion === 'INSIDE_TARGET'
            ? 'border-emerald-500 bg-emerald-100/60 dark:bg-emerald-950/50 scale-[1.01] shadow-lg'
            : activeFeedbackRegion === 'INSIDE_TARGET'
            ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 ring-4 ring-emerald-300'
            : selectedMonster
            ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/20 hover:bg-emerald-100/50 border-dashed animate-pulse'
            : 'border-emerald-300 dark:border-emerald-800 bg-white/90 dark:bg-slate-800/90 shadow-sm'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: targetSet.color }}
            />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
              {targetSet.label}
            </h3>
          </div>
          <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 rounded-lg">
            x ∈ {targetSet.symbol}
          </span>
        </div>

        {/* Math notation hint */}
        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
          {targetSet.mathNotation}
        </div>

        {/* Placed Monsters Display */}
        <div className="flex-1 flex flex-wrap content-start gap-2.5 p-2 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 min-h-[110px]">
          {placedInside.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-xs text-slate-400 dark:text-slate-500 italic py-6">
              {selectedMonster
                ? '👉 Click or drop here if monster matches!'
                : 'Drag or click matching monsters here'}
            </div>
          ) : (
            placedInside.map((monster) => (
              <div
                key={monster.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveMonster(monster.id);
                }}
                title="Click to remove from this bin"
                className="group relative flex flex-col items-center p-1.5 bg-white dark:bg-slate-850 rounded-xl shadow border border-emerald-200 dark:border-emerald-700 hover:scale-105 hover:border-red-400 transition-transform cursor-pointer"
              >
                <MonsterSvg monster={monster} size="sm" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  {monster.name.split(' ')[0]}
                </span>
                <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center transition-opacity">
                  ✕
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* OUTSIDE TARGET BIN (Complement) */}
      <div
        onDragOver={(e) => handleDragOver(e, 'OUTSIDE_TARGET')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'OUTSIDE_TARGET')}
        onClick={() => handleRegionClick('OUTSIDE_TARGET')}
        role="button"
        tabIndex={0}
        aria-label="Outside target set"
        className={`relative flex flex-col p-4 rounded-3xl border-3 transition-all duration-200 cursor-pointer min-h-[220px] ${
          dragOverRegion === 'OUTSIDE_TARGET'
            ? 'border-slate-500 bg-slate-100 dark:bg-slate-800 scale-[1.01] shadow-lg'
            : activeFeedbackRegion === 'OUTSIDE_TARGET'
            ? 'border-slate-400 bg-slate-50 dark:bg-slate-900 ring-4 ring-slate-300'
            : selectedMonster
            ? 'border-slate-400 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/50 border-dashed animate-pulse'
            : 'border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 shadow-sm'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-400" />
            <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              Outside Target (Other Monsters)
            </h3>
          </div>
          <span className="px-2 py-0.5 text-xs font-mono font-bold bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-lg">
            x ∉ {targetSet.symbol}
          </span>
        </div>

        {/* Math notation hint */}
        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
          {targetSet.symbol}ᶜ = U − {targetSet.symbol}
        </div>

        {/* Placed Monsters Display */}
        <div className="flex-1 flex flex-wrap content-start gap-2.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/40 min-h-[110px]">
          {placedOutside.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-xs text-slate-400 dark:text-slate-500 italic py-6">
              {selectedMonster
                ? '👉 Click or drop here if monster does NOT match!'
                : 'Drag or click non-matching monsters here'}
            </div>
          ) : (
            placedOutside.map((monster) => (
              <div
                key={monster.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveMonster(monster.id);
                }}
                title="Click to remove from this bin"
                className="group relative flex flex-col items-center p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 hover:scale-105 hover:border-red-400 transition-transform cursor-pointer"
              >
                <MonsterSvg monster={monster} size="sm" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  {monster.name.split(' ')[0]}
                </span>
                <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center transition-opacity">
                  ✕
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
