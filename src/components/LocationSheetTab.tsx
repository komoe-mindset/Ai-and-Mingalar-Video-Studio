import React from 'react';
import { Camera, Snowflake, Store, Compass, Zap, Flame, ExternalLink, Bot, Copy, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { GeminiAppCard } from './GeminiAppCard';
import { GEMINI_APPS, VISUAL_REF_GEMINI_APPS } from '../data/geminiApps';

interface LocationSheetTabProps {
  currentLang: Language;
  onCopySuccess?: (msg: string) => void;
}

export const LocationSheetTab: React.FC<LocationSheetTabProps> = ({ currentLang, onCopySuccess = () => {} }) => {
  const t = translations[currentLang];
  const geminiApp = GEMINI_APPS[1];
  const cartoonSceneGem = VISUAL_REF_GEMINI_APPS[1];
  const productPhotoGem = VISUAL_REF_GEMINI_APPS[2];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            Block 2 • 60 Minutes
          </span>
          <span className="text-xs text-slate-400">
            Tool: Real Photos (SME Path) or Gemini/Midjourney
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
          {t.b2_title}
        </h2>
        <p className="text-sm text-slate-400 mt-1 italic">
          {t.b2_subtitle}
        </p>
      </div>

      {/* Official Gemini Mini App Feature Card */}
      <GeminiAppCard
        blockNumber={2}
        title={currentLang === 'en' ? geminiApp.titleEn : geminiApp.titleMy}
        subtitle={currentLang === 'en' ? geminiApp.subtitleEn : geminiApp.subtitleMy}
        description={currentLang === 'en' ? geminiApp.descEn : geminiApp.descMy}
        url={geminiApp.url}
        accentColor="emerald"
        currentLang={currentLang}
        onCopySuccess={onCopySuccess}
      />

      {/* The 2 Paths Comparison with Dedicated Visual Reference Gems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Path A */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md">
                Path A
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Fictional / Concept Sets</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{t.path_a_title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.path_a_desc}
            </p>
          </div>

          {/* Path A Companion Gem: 2D Cartoon Scene */}
          <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{cartoonSceneGem.icon}</span>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block">
                    Visual Ref Gem • Concept & Cartoon
                  </span>
                  <h4 className="text-xs font-bold text-white">
                    {currentLang === 'en' ? cartoonSceneGem.titleEn : cartoonSceneGem.titleMy}
                  </h4>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentLang === 'en' ? cartoonSceneGem.descEn : cartoonSceneGem.descMy}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-amber-500/20">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(cartoonSceneGem.url);
                  onCopySuccess(
                    currentLang === 'en'
                      ? '2D Cartoon Scene Gemini link copied!'
                      : '2D Cartoon Scene Gemini လင့်ခ်ကို ကူးယူပြီးပါပြီ!'
                  );
                }}
                className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{currentLang === 'en' ? 'Copy Link' : 'လင့်ခ်ယူမည်'}</span>
              </button>
              <a
                href={cartoonSceneGem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold flex items-center space-x-1 cursor-pointer transition shadow"
              >
                <span>{currentLang === 'en' ? 'Launch Gem' : 'ဖွင့်မည်'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Path B - Recommended for SMEs */}
        <div className="glass-panel p-6 rounded-2xl border-emerald-500/40 bg-emerald-950/15 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-500/25 text-emerald-300 rounded-md border border-emerald-500/30">
                Path B • Recommended for SMEs
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                <Store className="w-3.5 h-3.5" />
                <span>{t.best_for_sme}</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{t.path_b_title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.path_b_desc}
            </p>
          </div>

          {/* Path B Companion Gem: Commercial Product Photography */}
          <div className="p-3.5 rounded-xl border border-teal-500/40 bg-teal-950/30 space-y-2.5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{productPhotoGem.icon}</span>
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-300 uppercase block">
                    Visual Ref Gem • SME Commercial Packshots
                  </span>
                  <h4 className="text-xs font-bold text-white">
                    {currentLang === 'en' ? productPhotoGem.titleEn : productPhotoGem.titleMy}
                  </h4>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentLang === 'en' ? productPhotoGem.descEn : productPhotoGem.descMy}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-teal-500/20">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(productPhotoGem.url);
                  onCopySuccess(
                    currentLang === 'en'
                      ? 'Product Photography Gemini link copied!'
                      : 'Product Photography Gemini လင့်ခ်ကို ကူးယူပြီးပါပြီ!'
                  );
                }}
                className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{currentLang === 'en' ? 'Copy Link' : 'လင့်ခ်ယူမည်'}</span>
              </button>
              <a
                href={productPhotoGem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-semibold flex items-center space-x-1 cursor-pointer transition shadow"
              >
                <span>{currentLang === 'en' ? 'Launch Gem' : 'ဖွင့်မည်'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Mandatory Elements on a Location Sheet */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Camera className="w-5 h-5 text-emerald-400" />
          <span>{t.loc_elements_title}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 hover:border-emerald-500/30 transition">
            <span className="text-emerald-400 text-lg font-bold">1</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.loc_e1_title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.loc_e1_desc}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 hover:border-emerald-500/30 transition">
            <span className="text-emerald-400 text-lg font-bold">2</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.loc_e2_title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.loc_e2_desc}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 hover:border-emerald-500/30 transition">
            <span className="text-emerald-400 text-lg font-bold">3</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.loc_e3_title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.loc_e3_desc}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 hover:border-emerald-500/30 transition">
            <span className="text-emerald-400 text-lg font-bold">4</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.loc_e4_title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.loc_e4_desc}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 hover:border-emerald-500/30 transition">
            <span className="text-emerald-400 text-lg font-bold">5</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">{t.loc_e5_title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t.loc_e5_desc}</p>
          </div>
        </div>
      </div>

      {/* THE FREEZE RULE */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border-2 border-amber-500/50 p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
            <Snowflake className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t.freeze_title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-0.5">
              {t.freeze_rule_subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>{t.freeze_cheap_title}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{t.freeze_cheap_desc}</p>
          </div>
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
              <Flame className="w-4 h-4" />
              <span>{t.freeze_expensive_title}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{t.freeze_expensive_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
