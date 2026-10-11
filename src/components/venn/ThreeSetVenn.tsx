'use client';

import React, { useState } from 'react';
import { Monster, SetDefinition, ThreeSetRegionId } from '@/types/game';
import { MonsterSvg } from '@/components/monsters/MonsterSvg';

interface ThreeSetVennProps {
  setA: SetDefinition;
  setB: SetDefinition;
  setC: SetDefinition;
  placedMonsters: Record<ThreeSetRegionId, Monster[]>;
  selectedMonster: Monster | null;
  onPlaceMonster: (monsterId: string, regionId: ThreeSetRegionId) => void;
  onRemoveMonster: (monsterId: string) => void;
  activeFeedbackRegion?: string | null;
}

export const ThreeSetVenn: React.FC<ThreeSetVennProps> = ({
  setA,
  setB,
  setC,
  placedMonsters,
  selectedMonster,
  onPlaceMonster,
  onRemoveMonster,
  activeFeedbackRegion,
}) => {
  const [hoverRegion, setHoverRegion] = useState<ThreeSetRegionId | null>(null);

  const handleDragOver = (e: React.DragEvent, regionId: ThreeSetRegionId) => {
    e.preventDefault();
    setHoverRegion(regionId);
  };

  const handleDragLeave = () => {
    setHoverRegion(null);
  };

  const handleDrop = (e: React.DragEvent, regionId: ThreeSetRegionId) => {
    e.preventDefault();
    setHoverRegion(null);
    const monsterId = e.dataTransfer.getData('text/plain');
    if (monsterId) {
      onPlaceMonster(monsterId, regionId);
    }
  };

  const handleRegionClick = (regionId: ThreeSetRegionId) => {
    if (selectedMonster) {
      onPlaceMonster(selectedMonster.id, regionId);
    }
  };

  const renderPlaced = (regionId: ThreeSetRegionId) => {
    const list = placedMonsters[regionId] || [];
    if (list.length === 0) {
      return (
        <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">
          {selectedMonster ? 'Click/drop' : 'Empty'}
        </span>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-1 p-0.5 max-h-[100px] overflow-y-auto">
        {list.map((monster) => (
          <div
            key={monster.id}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveMonster(monster.id);
            }}
            title={`Click to remove ${monster.name}`}
            className="group relative flex flex-col items-center bg-white dark:bg-slate-800 p-0.5 rounded-lg shadow border border-slate-200 dark:border-slate-700 hover:border-red-400 hover:scale-105 transition-transform cursor-pointer"
          >
            <MonsterSvg monster={monster} size="sm" />
            <span className="text-[9px] font-bold text-slate-800 dark:text-slate-200">
              {monster.id}
            </span>
            <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center transition-opacity">
              ✕
            </span>
          </div>
        ))}
      </div>
    );
  };

  const getRegionClass = (regionId: ThreeSetRegionId, accentColor: string) => {
    const isHovered = hoverRegion === regionId;
    const isActiveFeedback = activeFeedbackRegion === regionId;

    if (isHovered) {
      return `border-${accentColor}-600 bg-${accentColor}-100 dark:bg-${accentColor}-950/70 scale-[1.02] shadow-lg ring-2 ring-${accentColor}-400`;
    }
    if (isActiveFeedback) {
      return `border-${accentColor}-500 bg-${accentColor}-50 dark:bg-${accentColor}-950/50 ring-4 ring-${accentColor}-300`;
    }
    if (selectedMonster) {
      return `border-${accentColor}-400/80 bg-${accentColor}-50/40 dark:bg-${accentColor}-950/20 hover:bg-${accentColor}-100/50 border-dashed animate-pulse`;
    }
    return `border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm`;
  };

  return (
    <div className="relative w-full rounded-3xl border-3 border-purple-200 dark:border-purple-900 bg-gradient-to-b from-purple-50/40 to-white dark:from-slate-900 dark:to-slate-950 p-4 sm:p-5 shadow-md select-none my-2">
      {/* Universal Set Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 font-bold font-mono text-xs rounded-lg">
            3-Set Venn (Universal Set U)
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            8 Disjoint Partitions
          </span>
        </div>

        {/* Set Legends */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: setA.color }} />
            <span>{setA.symbol}: {setA.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: setB.color }} />
            <span>{setB.symbol}: {setB.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: setC.color }} />
            <span>{setC.symbol}: {setC.label}</span>
          </div>
        </div>
      </div>

      {/* 8-REGION INTERACTIVE STRUCTURE */}
      <div className="space-y-2.5">
        {/* ROW 1: TOP (A_ONLY, AB_ONLY, B_ONLY) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* A ONLY */}
          <div
            onDragOver={(e) => handleDragOver(e, 'A_ONLY')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'A_ONLY')}
            onClick={() => handleRegionClick('A_ONLY')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between ${getRegionClass(
              'A_ONLY',
              'red'
            )}`}
          >
            <div className="text-center">
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                {setA.symbol} Only
              </span>
              <div className="text-[10px] font-mono text-slate-500">
                {setA.symbol} − ({setB.symbol} ∪ {setC.symbol})
              </div>
            </div>
            <div className="my-1 flex items-center justify-center">
              {renderPlaced('A_ONLY')}
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              Has {setA.symbol}, no {setB.symbol}, no {setC.symbol}
            </div>
          </div>

          {/* AB ONLY: (A ∩ B) − C */}
          <div
            onDragOver={(e) => handleDragOver(e, 'INTERSECTION_AB_ONLY')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'INTERSECTION_AB_ONLY')}
            onClick={() => handleRegionClick('INTERSECTION_AB_ONLY')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between ${getRegionClass(
              'INTERSECTION_AB_ONLY',
              'indigo'
            )}`}
          >
            <div className="text-center">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {setA.symbol} & {setB.symbol} (not {setC.symbol})
              </span>
              <div className="text-[10px] font-mono text-slate-500">
                ({setA.symbol} ∩ {setB.symbol}) − {setC.symbol}
              </div>
            </div>
            <div className="my-1 flex items-center justify-center">
              {renderPlaced('INTERSECTION_AB_ONLY')}
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              Has {setA.symbol} & {setB.symbol}, but not {setC.symbol}
            </div>
          </div>

          {/* B ONLY */}
          <div
            onDragOver={(e) => handleDragOver(e, 'B_ONLY')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'B_ONLY')}
            onClick={() => handleRegionClick('B_ONLY')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between ${getRegionClass(
              'B_ONLY',
              'blue'
            )}`}
          >
            <div className="text-center">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {setB.symbol} Only
              </span>
              <div className="text-[10px] font-mono text-slate-500">
                {setB.symbol} − ({setA.symbol} ∪ {setC.symbol})
              </div>
            </div>
            <div className="my-1 flex items-center justify-center">
              {renderPlaced('B_ONLY')}
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              Has {setB.symbol}, no {setA.symbol}, no {setC.symbol}
            </div>
          </div>
        </div>

        {/* ROW 2: MIDDLE (AC_ONLY, ABC CENTER, BC_ONLY) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* AC ONLY: (A ∩ C) − B */}
          <div
            onDragOver={(e) => handleDragOver(e, 'INTERSECTION_AC_ONLY')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'INTERSECTION_AC_ONLY')}
            onClick={() => handleRegionClick('INTERSECTION_AC_ONLY')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between ${getRegionClass(
              'INTERSECTION_AC_ONLY',
              'teal'
            )}`}
          >
            <div className="text-center">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                {setA.symbol} & {setC.symbol} (not {setB.symbol})
              </span>
              <div className="text-[10px] font-mono text-slate-500">
                ({setA.symbol} ∩ {setC.symbol}) − {setB.symbol}
              </div>
            </div>
            <div className="my-1 flex items-center justify-center">
              {renderPlaced('INTERSECTION_AC_ONLY')}
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              Has {setA.symbol} & {setC.symbol}, but not {setB.symbol}
            </div>
          </div>

          {/* TRIPLE INTERSECTION: A ∩ B ∩ C (THE CENTER GEM) */}
          <div
            onDragOver={(e) => handleDragOver(e, 'INTERSECTION_ABC')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'INTERSECTION_ABC')}
            onClick={() => handleRegionClick('INTERSECTION_ABC')}
            className={`p-2.5 rounded-2xl border-3 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between ${
              hoverRegion === 'INTERSECTION_ABC'
                ? 'border-amber-500 bg-amber-100 dark:bg-amber-950 scale-105 shadow-xl ring-4 ring-amber-400'
                : selectedMonster
                ? 'border-amber-400 bg-amber-50/70 dark:bg-amber-950/40 border-dashed animate-pulse'
                : 'border-amber-400 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 shadow-md'
            }`}
          >
            <div className="text-center">
              <span className="text-xs font-black text-amber-700 dark:text-amber-300">
                ✦ ALL THREE SETS ✦
              </span>
              <div className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                {setA.symbol} ∩ {setB.symbol} ∩ {setC.symbol}
              </div>
            </div>
            <div className="my-1 flex items-center justify-center">
              {renderPlaced('INTERSECTION_ABC')}
            </div>
            <div className="text-[9px] font-bold text-amber-700 dark:text-amber-300 text-center">
              Center overlap: satisfies A, B, and C!
            </div>
          </div>

          {/* BC ONLY: (B ∩ C) − A */}
          <div
            onDragOver={(e) => handleDragOver(e, 'INTERSECTION_BC_ONLY')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'INTERSECTION_BC_ONLY')}
            onClick={() => handleRegionClick('INTERSECTION_BC_ONLY')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between ${getRegionClass(
              'INTERSECTION_BC_ONLY',
              'cyan'
            )}`}
          >
            <div className="text-center">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                {setB.symbol} & {setC.symbol} (not {setA.symbol})
              </span>
              <div className="text-[10px] font-mono text-slate-500">
                ({setB.symbol} ∩ {setC.symbol}) − {setA.symbol}
              </div>
            </div>
            <div className="my-1 flex items-center justify-center">
              {renderPlaced('INTERSECTION_BC_ONLY')}
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              Has {setB.symbol} & {setC.symbol}, but not {setA.symbol}
            </div>
          </div>
        </div>

        {/* ROW 3: BOTTOM (C ONLY) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <div className="hidden md:block" />
          {/* C ONLY */}
          <div
            onDragOver={(e) => handleDragOver(e, 'C_ONLY')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'C_ONLY')}
            onClick={() => handleRegionClick('C_ONLY')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between ${getRegionClass(
              'C_ONLY',
              'emerald'
            )}`}
          >
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {setC.symbol} Only
              </span>
              <div className="text-[10px] font-mono text-slate-500">
                {setC.symbol} − ({setA.symbol} ∪ {setB.symbol})
              </div>
            </div>
            <div className="my-1 flex items-center justify-center">
              {renderPlaced('C_ONLY')}
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              Has {setC.symbol}, no {setA.symbol}, no {setB.symbol}
            </div>
          </div>
          <div className="hidden md:block" />
        </div>

        {/* REGION 8: OUTSIDE ALL THREE */}
        <div
          onDragOver={(e) => handleDragOver(e, 'OUTSIDE_ALL')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'OUTSIDE_ALL')}
          onClick={() => handleRegionClick('OUTSIDE_ALL')}
          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[60px] flex flex-col sm:flex-row items-center justify-between gap-2 ${
            hoverRegion === 'OUTSIDE_ALL'
              ? 'border-slate-500 bg-slate-200 dark:bg-slate-800 scale-[1.01]'
              : selectedMonster
              ? 'border-slate-300 bg-slate-100/50 dark:bg-slate-900/40 border-dashed animate-pulse'
              : 'border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
              Outside All 3 Circles:
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              ({setA.symbol} ∪ {setB.symbol} ∪ {setC.symbol})ᶜ
            </span>
          </div>

          <div className="flex-1 flex items-center justify-end">
            {renderPlaced('OUTSIDE_ALL')}
          </div>
        </div>
      </div>
    </div>
  );
};
