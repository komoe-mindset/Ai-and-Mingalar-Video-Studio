import React, { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle2, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CalculatorTabProps {
  currentLang: Language;
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const [scenes, setScenes] = useState<number>(7);
  const [monthlyCredits, setMonthlyCredits] = useState<number>(60);

  // Calculations
  const badMethodCredits = scenes * 6; // Average 6 regenerations per scene due to inconsistency
  const goodMethodCredits = scenes * 2; // Average 2 video renders per scene (stills already frozen)

  const isOverBudget = badMethodCredits > monthlyCredits;
  const badDeficit = badMethodCredits - monthlyCredits;
  const badPercent = Math.round((badMethodCredits / monthlyCredits) * 100);

  const creditsSaved = Math.max(0, monthlyCredits - goodMethodCredits);
  const additionalCampaigns = Math.floor(creditsSaved / goodMethodCredits);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            Interactive Simulator
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
          {t.sim_title}
        </h2>
        <p className="text-sm text-slate-400 mt-1 italic">
          {t.sim_subtitle}
        </p>
      </div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameters Form */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5 lg:col-span-1">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>{t.calc_params}</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Slider for Scenes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <label htmlFor="sim-scenes-slider" className="font-semibold">
                  {t.lbl_scenes}
                </label>
                <span className="text-indigo-400 font-mono font-bold text-sm bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-500/30">
                  {scenes} {currentLang === 'en' ? 'scenes' : 'ခု'}
                </span>
              </div>
              <input
                id="sim-scenes-slider"
                type="range"
                min="4"
                max="12"
                value={scenes}
                onChange={(e) => setScenes(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-slate-500 font-mono text-xs">
                <span>4</span>
                <span>8</span>
                <span>12</span>
              </div>
            </div>

            {/* Monthly Credits Input */}
            <div className="space-y-1.5 pt-2">
              <label htmlFor="sim-credits-input" className="block text-slate-300 font-semibold">
                {t.lbl_monthly_creds}
              </label>
              <input
                id="sim-credits-input"
                type="number"
                min="10"
                max="500"
                value={monthlyCredits}
                onChange={(e) => setMonthlyCredits(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Quick explanation pill */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="text-slate-300 font-medium">Standard Assumptions:</div>
              <div>• Wish Method: ~6 tries/scene</div>
              <div>• Asset-First: ~2 tries/scene</div>
            </div>
          </div>
        </div>

        {/* Results & Comparison */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.comp_title}
            </h3>
            <span className="text-xs text-slate-400">Monthly Plan: {monthlyCredits} Credits</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bad Approach */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Unstructured "Wish" Method</span>
              </span>

              <div className="text-3xl font-black text-white font-mono">
                {badMethodCredits}{' '}
                <span className="text-sm font-sans font-normal text-slate-400">
                  {currentLang === 'en' ? 'Credits' : 'Credit'}
                </span>
              </div>

              <p className="text-xs text-rose-300/80 leading-relaxed">
                {t.bad_approach_desc}
              </p>

              <div className="text-xs font-mono text-rose-400 pt-3 border-t border-rose-500/20 leading-relaxed">
                {isOverBudget ? (
                  <span className="font-semibold">
                    {currentLang === 'en'
                      ? `⚠️ Over budget by ${badDeficit} credits! You will run out before scene ${Math.floor(
                          monthlyCredits / 6
                        ) + 1}.`
                      : `⚠️ Credit ${badDeficit} ခု ကျော်လွန်နေပါသည်။ Scene အကုန်မပြီးမီ Credit ပြတ်သွားပါမည်။`}
                  </span>
                ) : (
                  <span>
                    {currentLang === 'en'
                      ? `⚠️ Consumes ${badPercent}% of your monthly credit allowance on 1 video!`
                      : `⚠️ တစ်လစာ Credit ၏ ${badPercent}% ကုန်သွားပါမည်။`}
                  </span>
                )}
              </div>
            </div>

            {/* Asset-First Approach */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Asset-First Pipeline</span>
              </span>

              <div className="text-3xl font-black text-emerald-400 font-mono">
                {goodMethodCredits}{' '}
                <span className="text-sm font-sans font-normal text-slate-400">
                  {currentLang === 'en' ? 'Credits' : 'Credit'}
                </span>
              </div>

              <p className="text-xs text-emerald-300/80 leading-relaxed">
                {t.good_approach_desc}
              </p>

              <div className="text-xs font-mono text-emerald-400 pt-3 border-t border-emerald-500/20 leading-relaxed">
                {currentLang === 'en' ? (
                  <span>
                    ✓ Uses only {goodMethodCredits} credits! Leaves{' '}
                    <strong>{creditsSaved} credits</strong> ({additionalCampaigns} more campaigns
                    possible).
                  </span>
                ) : (
                  <span>
                    ✓ Credit {goodMethodCredits} ခုသာ သုံးသဖြင့် Credit {creditsSaved} ခု
                    ကျန်ရှိပြီး နောက်ထပ် ကြော်ငြာ {additionalCampaigns} ခု ထပ်လုပ်နိုင်သည်။
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Efficiency Summary Metric */}
          <div className="p-4 sm:p-5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="text-slate-300 font-medium">{t.reusable_tag}</span>
            </div>
            <span className="font-mono text-indigo-300 font-bold bg-indigo-900/50 px-3 py-1 rounded-lg border border-indigo-500/30">
              {t.reusable_val}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
