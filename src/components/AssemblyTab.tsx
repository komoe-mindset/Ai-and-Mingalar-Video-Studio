import React, { useState } from 'react';
import {
  Clock,
  Mic,
  Subtitles,
  Scissors,
  Music,
  UserMinus,
  Youtube,
  CheckSquare,
  RotateCcw,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AssemblyTabProps {
  currentLang: Language;
}

export const AssemblyTab: React.FC<AssemblyTabProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  // Checklist state with persistent local storage feel
  const [checklist, setChecklist] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleCheck = (index: number) => {
    setChecklist((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const completedCount = checklist.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const resetChecklist = () => {
    setChecklist([false, false, false, false, false, false]);
  };

  const checklistItems = [
    { step: 1, text: t.ck_1 },
    { step: 2, text: t.ck_2 },
    { step: 3, text: t.ck_3 },
    { step: 4, text: t.ck_4 },
    { step: 5, text: t.ck_5 },
    { step: 6, text: t.ck_6 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
            Block 4 • 45 Minutes
          </span>
          <span className="text-xs text-slate-400">
            Tool: Google Vids (Built right inside Google Workspace)
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
          {t.b4_title}
        </h2>
        <p className="text-sm text-slate-400 mt-1 italic">
          {t.b4_subtitle}
        </p>
      </div>

      {/* The 3-Second Hook Rule & Burmese Reality Check */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border-amber-500/30 bg-amber-950/15 space-y-3">
          <div className="flex items-center space-x-2.5 text-amber-400 font-bold text-base sm:text-lg">
            <Clock className="w-5 h-5 shrink-0" />
            <h3>{t.hook_title}</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.hook_desc}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-rose-500/30 bg-rose-950/15 space-y-3">
          <div className="flex items-center space-x-2.5 text-rose-400 font-bold text-base sm:text-lg">
            <Mic className="w-5 h-5 shrink-0" />
            <h3>{t.myanmar_voice_title}</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.myanmar_voice_desc}
          </p>
        </div>
      </div>

      {/* 5 Google Vids Features That Actually Matter */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <span>🎬</span>
          <span>{t.vids_feat_title}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-purple-500/40 transition">
            <Subtitles className="w-6 h-6 text-purple-400" />
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.vf1_name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.vf1_desc}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-purple-500/40 transition">
            <Scissors className="w-6 h-6 text-purple-400" />
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.vf2_name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.vf2_desc}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-purple-500/40 transition">
            <Music className="w-6 h-6 text-purple-400" />
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.vf3_name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.vf3_desc}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-purple-500/40 transition">
            <UserMinus className="w-6 h-6 text-purple-400" />
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.vf4_name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.vf4_desc}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-purple-500/40 transition">
            <Youtube className="w-6 h-6 text-purple-400" />
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.vf5_name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.vf5_desc}</p>
          </div>
        </div>
      </div>

      {/* Assembly Step-by-Step Checklist (Interactive) */}
      <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {t.assembly_demo_title}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-indigo-400 font-semibold">
              {completedCount} / 6 ({progressPercent}%)
            </span>
            <button
              onClick={resetChecklist}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 transition"
              title="Reset checklist"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          {checklistItems.map((item, index) => {
            const isChecked = checklist[index];
            return (
              <label
                key={item.step}
                onClick={() => toggleCheck(index)}
                className={`flex items-start space-x-3.5 p-3.5 sm:p-4 rounded-xl border transition cursor-pointer select-none ${
                  isChecked
                    ? 'bg-indigo-950/25 border-indigo-500/40 text-slate-200'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-0 w-4 h-4 bg-slate-950 border-slate-700 shrink-0 cursor-pointer"
                />
                <div className="leading-relaxed">
                  <strong className="text-indigo-400 mr-1.5 font-bold">
                    Step {item.step}:
                  </strong>
                  <span className={isChecked ? 'line-through text-slate-400' : ''}>
                    {item.text}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
