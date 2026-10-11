'use client';

import React, { useState } from 'react';
import { Monster, SetDefinition, TwoSetRegionId } from '@/types/game';
import { MonsterSvg } from '@/components/monsters/MonsterSvg';

interface TwoSetVennProps {
  setA: SetDefinition;
  setB: SetDefinition;
  placedMonsters: Record<TwoSetRegionId, Monster[]>;
  selectedMonster: Monster | null;
  onPlaceMonster: (monsterId: string, regionId: TwoSetRegionId) => void;
  onRemoveMonster: (monsterId: string) => void;
  activeFeedbackRegion?: string | null;
}

export const TwoSetVenn: React.FC<TwoSetVennProps> = ({
  setA,
  setB,
  placedMonsters,
  selectedMonster,
  onPlaceMonster,
  onRemoveMonster,
  activeFeedbackRegion,
}) => {
  const [hoverRegion, setHoverRegion] = useState<TwoSetRegionId | null>(null);

  const handleDragOver = (e: React.DragEvent, regionId: TwoSetRegionId) => {
    e.preventDefault();
    setHoverRegion(regionId);
  };

  const handleDragLeave = () => {
    setHoverRegion(null);
  };

  const handleDrop = (e: React.DragEvent, regionId: TwoSetRegionId) => {
    e.preventDefault();
    setHoverRegion(null);
    const monsterId = e.dataTransfer.getData('text/plain');
    if (monsterId) {
      onPlaceMonster(monsterId, regionId);
    }
  };

  const handleRegionClick = (regionId: TwoSetRegionId) => {
    if (selectedMonster) {
      onPlaceMonster(selectedMonster.id, regionId);
    }
  };

  // Render placed monster chips inside a region
  const renderPlaced = (regionId: TwoSetRegionId) => {
    const list = placedMonsters[regionId] || [];
    if (list.length === 0) {
      return (
        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center px-1">
          {selectedMonster ? 'Click/drop here' : 'Empty'}
        </span>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 max-h-[140px] overflow-y-auto">
        {list.map((monster) => (
          <div
            key={monster.id}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveMonster(monster.id);
            }}
            title={`Click to remove ${monster.name}`}
            className="group relative flex flex-col items-center bg-white dark:bg-slate-800 p-1 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:border-red-400 hover:scale-105 transition-transform cursor-pointer"
          >
            <MonsterSvg monster={monster} size="sm" />
            <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
              {monster.id}
            </span>
            <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center transition-opacity">
              ✕
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-3xl border-3 border-indigo-200 dark:border-indigo-900 bg-gradient-to-b from-indigo-50/50 to-white/80 dark:from-slate-900 dark:to-slate-950 p-4 sm:p-6 shadow-md select-none my-2">
      {/* Universal Set Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-bold font-mono text-xs rounded-lg">
            Universal Set U
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            All monsters in this puzzle belong to universe U
          </span>
        </div>

        {/* Set legends */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: setA.color }} />
            <span className="text-slate-700 dark:text-slate-300">{setA.label} ({setA.symbol})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: setB.color }} />
            <span className="text-slate-700 dark:text-slate-300">{setB.label} ({setB.symbol})</span>
          </div>
        </div>
      </div>

      {/* VENN DIAGRAM 3-COLUMN INTERACTIVE REGION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[220px]">
        {/* REGION 1: A ONLY */}
        <div
          onDragOver={(e) => handleDragOver(e, 'A_ONLY')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'A_ONLY')}
          onClick={() => handleRegionClick('A_ONLY')}
          role="button"
          tabIndex={0}
          aria-label={`${setA.label} only`}
          className={`flex flex-col items-center justify-between p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer min-h-[180px] ${
            hoverRegion === 'A_ONLY'
              ? 'border-red-500 bg-red-100/60 dark:bg-red-950/60 scale-[1.02] shadow-lg'
              : activeFeedbackRegion === 'A_ONLY'
              ? 'border-red-400 bg-red-50 ring-4 ring-red-300'
              : selectedMonster
              ? 'border-red-300 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100/40 border-dashed animate-pulse'
              : 'border-red-200 dark:border-red-900/60 bg-red-50/30 dark:bg-red-950/20 shadow-sm'
          }`}
        >
          <div className="w-full text-center pb-1 border-b border-red-100 dark:border-red-900/40">
            <span className="font-bold text-xs sm:text-sm text-red-700 dark:text-red-300">
              {setA.label} Only
            </span>
            <div className="text-[11px] font-mono text-red-600/80 dark:text-red-400">
              {setA.symbol} − {setB.symbol}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center w-full my-2">
            {renderPlaced('A_ONLY')}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center">
            {setA.predicateDescription}, but NOT {setB.predicateDescription}
          </div>
        </div>

        {/* REGION 2: INTERSECTION (A ∩ B) */}
        <div
          onDragOver={(e) => handleDragOver(e, 'INTERSECTION_AB')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'INTERSECTION_AB')}
          onClick={() => handleRegionClick('INTERSECTION_AB')}
          role="button"
          tabIndex={0}
          aria-label={`Intersection: ${setA.symbol} and ${setB.symbol}`}
          className={`flex flex-col items-center justify-between p-3 rounded-2xl border-3 transition-all duration-200 cursor-pointer min-h-[180px] ${
            hoverRegion === 'INTERSECTION_AB'
              ? 'border-purple-600 bg-purple-200/60 dark:bg-purple-950/70 scale-[1.03] shadow-xl'
              : activeFeedbackRegion === 'INTERSECTION_AB'
              ? 'border-purple-500 bg-purple-100 ring-4 ring-purple-400'
              : selectedMonster
              ? 'border-purple-400 bg-purple-100/60 dark:bg-purple-950/40 hover:bg-purple-200/40 border-dashed animate-pulse shadow-md'
              : 'border-purple-300 dark:border-purple-800 bg-purple-50/70 dark:bg-purple-950/30 shadow-md'
          }`}
        >
          <div className="w-full text-center pb-1 border-b border-purple-200 dark:border-purple-800">
            <span className="font-extrabold text-xs sm:text-sm text-purple-700 dark:text-purple-300">
              Center Overlap (Both!)
            </span>
            <div className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400">
              {setA.symbol} ∩ {setB.symbol}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center w-full my-2">
            {renderPlaced('INTERSECTION_AB')}
          </div>
          <div className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 text-center">
            BOTH {setA.symbol} AND {setB.symbol}
          </div>
        </div>

        {/* REGION 3: B ONLY */}
        <div
          onDragOver={(e) => handleDragOver(e, 'B_ONLY')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'B_ONLY')}
          onClick={() => handleRegionClick('B_ONLY')}
          role="button"
          tabIndex={0}
          aria-label={`${setB.label} only`}
          className={`flex flex-col items-center justify-between p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer min-h-[180px] ${
            hoverRegion === 'B_ONLY'
              ? 'border-blue-500 bg-blue-100/60 dark:bg-blue-950/60 scale-[1.02] shadow-lg'
              : activeFeedbackRegion === 'B_ONLY'
              ? 'border-blue-400 bg-blue-50 ring-4 ring-blue-300'
              : selectedMonster
              ? 'border-blue-300 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/40 border-dashed animate-pulse'
              : 'border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20 shadow-sm'
          }`}
        >
          <div className="w-full text-center pb-1 border-b border-blue-100 dark:border-blue-900/40">
            <span className="font-bold text-xs sm:text-sm text-blue-700 dark:text-blue-300">
              {setB.label} Only
            </span>
            <div className="text-[11px] font-mono text-blue-600/80 dark:text-blue-400">
              {setB.symbol} − {setA.symbol}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center w-full my-2">
            {renderPlaced('B_ONLY')}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center">
            {setB.predicateDescription}, but NOT {setA.predicateDescription}
          </div>
        </div>
      </div>

      {/* REGION 4: OUTSIDE BOTH (Inside U) */}
      <div
        onDragOver={(e) => handleDragOver(e, 'OUTSIDE')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'OUTSIDE')}
        onClick={() => handleRegionClick('OUTSIDE')}
        role="button"
        tabIndex={0}
        aria-label="Outside both circles, inside U"
        className={`mt-4 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer min-h-[70px] flex flex-col sm:flex-row items-center justify-between gap-2 ${
          hoverRegion === 'OUTSIDE'
            ? 'border-slate-500 bg-slate-200/80 dark:bg-slate-800 scale-[1.01] shadow-md'
            : activeFeedbackRegion === 'OUTSIDE'
            ? 'border-slate-400 bg-slate-100 dark:bg-slate-800 ring-4 ring-slate-300'
            : selectedMonster
            ? 'border-slate-300 bg-slate-100/50 dark:bg-slate-900/40 hover:bg-slate-200/50 border-dashed animate-pulse'
            : 'border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/30'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
            Outside Both Circles:
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            ({setA.symbol} ∪ {setB.symbol})ᶜ = U − ({setA.symbol} ∪ {setB.symbol})
          </span>
        </div>

        <div className="flex-1 flex items-center justify-end">
          {renderPlaced('OUTSIDE')}
        </div>
      </div>
    </div>
  );
};
