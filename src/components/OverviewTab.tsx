import React from 'react';
import { ArrowRight, Sparkles, XCircle, CheckCircle2, FolderGit2, Bot, ExternalLink, Headphones, Music } from 'lucide-react';
import { TabType, Language } from '../types';
import { translations } from '../data/translations';
import { GEMINI_APPS, VISUAL_REF_GEMINI_APPS, AUDIO_GEMINI_APPS } from '../data/geminiApps';

interface OverviewTabProps {
  currentLang: Language;
  onSelectTab: (tab: TabType) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ currentLang, onSelectTab }) => {
  const t = translations[currentLang];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 border border-indigo-500/25 p-6 sm:p-8 md:p-10 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.hero_badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.hero_title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.hero_desc}
          </p>
        </div>
      </div>

      {/* Problem Breakdown: The Pain Point */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="glass-panel p-6 rounded-2xl border-rose-500/25 bg-rose-950/15 space-y-4">
          <div className="flex items-center space-x-3 text-rose-400 font-semibold text-lg">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <h2>{t.problem_title}</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t.problem_body}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-rose-300 font-mono flex items-start space-x-2.5">
            <span className="text-rose-400 font-bold text-sm leading-none">⚠️</span>
            <span>{t.problem_quote}</span>
          </div>
        </div>

        {/* The Solution Pipeline */}
        <div className="glass-panel p-6 rounded-2xl border-emerald-500/25 bg-emerald-950/15 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-400 font-semibold text-lg">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2>{t.solution_title}</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t.solution_body}
          </p>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold mt-0.5">1.</span>
              <span>{t.solution_point1}</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold mt-0.5">2.</span>
              <span>{t.solution_point2}</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold mt-0.5">3.</span>
              <span>{t.solution_point3}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The 5-Step Asset-First Pipeline (Interactive Visualizer) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>🔄</span>
            <span>{t.pipeline_title}</span>
          </h3>
          <span className="text-xs text-slate-400">{t.click_step_tip}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Step 1 */}
          <div
            onClick={() => onSelectTab('block1')}
            className="cursor-pointer group p-4 rounded-2xl glass-panel hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden border border-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                01
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                60 Min
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                {t.step1_name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.step1_desc}
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Nano Banana Pro</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => onSelectTab('block2')}
            className="cursor-pointer group p-4 rounded-2xl glass-panel hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden border border-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                02
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                60 Min
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                {t.step2_name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.step2_desc}
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Photo or Gen AI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => onSelectTab('block3')}
            className="cursor-pointer group p-4 rounded-2xl glass-panel hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden border border-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                03
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                75 Min
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                {t.step3_name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.step3_desc}
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Gemini / Claude</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => onSelectTab('block3')}
            className="cursor-pointer group p-4 rounded-2xl glass-panel hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden border border-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                04
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                Generate
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                {t.step4_name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.step4_desc}
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Veo 3.1 / Flow</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 5 */}
          <div
            onClick={() => onSelectTab('block4')}
            className="cursor-pointer group p-4 rounded-2xl glass-panel hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden border border-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                05
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                45 Min
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                {t.step5_name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.step5_desc}
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Google Vids</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Official Gemini Mini Apps & Visual References Showcase */}
      <div className="space-y-6">
        {/* Section 1: Workflow Production Gems */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-indigo-500/30 bg-slate-900/40 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center space-x-1">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Production Pipeline Assistants</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {currentLang === 'en'
                  ? 'Official Gemini Mini Apps for the Workflow'
                  : 'အသုံးပြုရမည့် တရားဝင် Gemini Mini Apps များ'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {currentLang === 'en'
                  ? 'Pre-engineered Gemini assistants pre-loaded with exact prompt structures for Blocks 1, 2, and 3.'
                  : 'Block 1, 2 နှင့် 3 အတွက် သီးသန့်ပြုစုထားသော Gemini AI လက်ထောက်လင့်ခ်များ။'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GEMINI_APPS.slice(0, 3).map((app) => {
              const borderCol =
                app.accentColor === 'indigo'
                  ? 'border-indigo-500/40 hover:border-indigo-400'
                  : app.accentColor === 'emerald'
                  ? 'border-emerald-500/40 hover:border-emerald-400'
                  : 'border-cyan-500/40 hover:border-cyan-400';

              const btnBg =
                app.accentColor === 'indigo'
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  : app.accentColor === 'emerald'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white';

              return (
                <div
                  key={app.id}
                  className={`bg-slate-950 p-5 rounded-xl border ${borderCol} transition-all duration-200 flex flex-col justify-between space-y-4 shadow-md`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{app.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {currentLang === 'en' ? app.tagEn : app.tagMy}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {currentLang === 'en' ? app.titleEn : app.titleMy}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {currentLang === 'en' ? app.subtitleEn : app.subtitleMy}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${btnBg}`}
                    >
                      <span>{currentLang === 'en' ? 'Launch Gem' : 'Gemini ဖွင့်မည်'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onSelectTab(app.tabKey)}
                      className="w-full text-center text-[11px] text-slate-400 hover:text-indigo-300 transition py-1 cursor-pointer"
                    >
                      {currentLang === 'en'
                        ? `View Block ${app.blockNumber} Guide →`
                        : `Block ${app.blockNumber} လမ်းညွှန်ကြည့်မည် →`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: AI Video Visual Reference Suite */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-purple-500/30 bg-purple-950/10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Video Visual Reference Suite</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {currentLang === 'en'
                  ? 'Visual References & Cinematography Suite'
                  : 'Visual References နှင့် ကင်မရာထောင့် လေ့လာရေး Suite'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {currentLang === 'en'
                  ? 'Dedicated reference generators to lock 2D cartoon avatars, cartoon environments, studio product packshots, and learn 20+ cinematic camera angles.'
                  : '2D ကာတွန်းဇာတ်ကောင်၊ အခန်းနောက်ခံ၊ ကုန်ပစ္စည်း Packshot နှင့် ကင်မရာထောင့်ပေါင်း ၂၀ ကျော်ကို တိကျစွာ လေ့လာအသုံးပြုနိုင်သော Reference Apps များ။'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VISUAL_REF_GEMINI_APPS.map((app) => {
              const borderCol =
                app.accentColor === 'purple'
                  ? 'border-purple-500/40 hover:border-purple-400'
                  : app.accentColor === 'amber'
                  ? 'border-amber-500/40 hover:border-amber-400'
                  : app.accentColor === 'cyan'
                  ? 'border-cyan-500/40 hover:border-cyan-400'
                  : 'border-teal-500/40 hover:border-teal-400';

              const btnBg =
                app.accentColor === 'purple'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : app.accentColor === 'amber'
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : app.accentColor === 'cyan'
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  : 'bg-teal-600 hover:bg-teal-500 text-white';

              return (
                <div
                  key={app.id}
                  className={`bg-slate-950 p-5 rounded-xl border ${borderCol} transition-all duration-200 flex flex-col justify-between space-y-4 shadow-md`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{app.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {currentLang === 'en' ? app.tagEn : app.tagMy}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {currentLang === 'en' ? app.titleEn : app.titleMy}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {currentLang === 'en' ? app.subtitleEn : app.subtitleMy}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${btnBg}`}
                    >
                      <span>{currentLang === 'en' ? 'Launch Reference' : 'Reference ဖွင့်မည်'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onSelectTab(app.tabKey)}
                      className="w-full text-center text-[11px] text-slate-400 hover:text-purple-300 transition py-1 cursor-pointer"
                    >
                      {currentLang === 'en'
                        ? `Explore ${app.tabKey.toUpperCase()} Guide →`
                        : `${app.tabKey.toUpperCase()} လမ်းညွှန်ကြည့်မည် →`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: AI Video BGM Prompts & Sound Testing Studio */}
        {AUDIO_GEMINI_APPS.length > 0 && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-rose-500/30 bg-rose-950/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 flex items-center space-x-1">
                    <Headphones className="w-3.5 h-3.5" />
                    <span>AI Video Sound & BGM Studio</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {currentLang === 'en'
                    ? 'AI Video BGM Prompts & Sound Testing Studio'
                    : 'AI ဗီဒီယိုများအတွက် အသင့်သုံး BGM Prompts & အသံစမ်းသပ်စတူဒီယို'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {currentLang === 'en'
                    ? 'Pre-engineered Gemini assistant for composing prompt-engineered background music, BPM tempo matching, and audio testing for video spots.'
                    : 'ဗီဒီယိုကြော်ငြာများအတွက် အလိုက်ဖက်ဆုံး နောက်ခံတေးဂီတ (BGM) Prompts၊ စည်းချက် (BPM) နှင့် အသံစမ်းသပ်မှု သီးသန့် Gemini AI လက်ထောက်။'}
                </p>
              </div>

              <a
                href={AUDIO_GEMINI_APPS[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition shrink-0"
              >
                <span>{currentLang === 'en' ? 'Launch Audio Gem' : 'Gemini တေးဂီတ စတူဒီယို ဖွင့်မည်'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{AUDIO_GEMINI_APPS[0].icon}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {currentLang === 'en' ? AUDIO_GEMINI_APPS[0].tagEn : AUDIO_GEMINI_APPS[0].tagMy}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {currentLang === 'en' ? AUDIO_GEMINI_APPS[0].titleEn : AUDIO_GEMINI_APPS[0].titleMy}
                </h4>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  {currentLang === 'en' ? AUDIO_GEMINI_APPS[0].descEn : AUDIO_GEMINI_APPS[0].descMy}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => onSelectTab('block4')}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  {currentLang === 'en' ? 'Explore Block 4 Audio Guide →' : 'Block 4 အသံလမ်းညွှန် ကြည့်မည် →'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Long term asset library concept */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-indigo-500/20 bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            {t.asset_sys_tag}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {t.asset_sys_title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t.asset_sys_desc}
          </p>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 w-full md:w-auto min-w-[280px] space-y-1.5 shadow-inner">
          <div className="text-indigo-400 font-bold flex items-center space-x-1.5">
            <FolderGit2 className="w-4 h-4" />
            <span>my-brand-commercial/</span>
          </div>
          <div className="pl-4 text-emerald-400">
            ├── 📁 /character/ <span className="text-slate-500">// turnaround sheet</span>
          </div>
          <div className="pl-4 text-amber-400">
            ├── 📁 /location/ <span className="text-slate-500">// location & lighting</span>
          </div>
          <div className="pl-4 text-cyan-400">
            └── 📁 /blueprint/ <span className="text-slate-500">// master prompts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
