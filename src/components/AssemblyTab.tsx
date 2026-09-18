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
  Volume2,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Headphones,
  Sliders,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { GeminiAppCard } from './GeminiAppCard';
import { AUDIO_GEMINI_APPS } from '../data/geminiApps';
import { BGM_PRESETS, BgmPreset } from '../data/bgmPresets';

interface AssemblyTabProps {
  currentLang: Language;
  onCopySuccess?: (msg: string) => void;
}

export const AssemblyTab: React.FC<AssemblyTabProps> = ({ currentLang, onCopySuccess }) => {
  const t = translations[currentLang];
  const bgmGeminiApp = AUDIO_GEMINI_APPS[0];

  // Selected BGM preset state
  const [selectedPresetId, setSelectedPresetId] = useState<string>(BGM_PRESETS[0].id);
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);

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

  const handleCopyPresetPrompt = (preset: BgmPreset) => {
    navigator.clipboard.writeText(preset.prompt);
    setCopiedPresetId(preset.id);
    const msg =
      currentLang === 'en'
        ? `"${preset.titleEn}" BGM prompt copied!`
        : `"${preset.titleMy}" BGM Prompt ကို ကူးယူပြီးပါပြီ!`;
    if (onCopySuccess) {
      onCopySuccess(msg);
    }
    setTimeout(() => setCopiedPresetId(null), 2500);
  };

  const activePreset = BGM_PRESETS.find((p) => p.id === selectedPresetId) || BGM_PRESETS[0];

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

      {/* Official BGM & Sound Studio Gemini Mini App */}
      <GeminiAppCard
        blockNumber={4}
        title={currentLang === 'en' ? bgmGeminiApp.titleEn : bgmGeminiApp.titleMy}
        subtitle={currentLang === 'en' ? bgmGeminiApp.subtitleEn : bgmGeminiApp.subtitleMy}
        description={currentLang === 'en' ? bgmGeminiApp.descEn : bgmGeminiApp.descMy}
        url={bgmGeminiApp.url}
        accentColor="rose"
        currentLang={currentLang}
        onCopySuccess={onCopySuccess || (() => {})}
        badgeLabel={currentLang === 'en' ? 'Official Audio & BGM Gem' : 'တရားဝင် Audio & BGM Gemini App'}
        categoryLabel={currentLang === 'en' ? 'Sound Studio & BGM Composer' : 'အသံနှင့် တေးဂီတ စတူဒီယို လက်ထောက်'}
        icon="🎵"
      />

      {/* Interactive AI Video BGM Prompts & Sound Testing Studio */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-rose-500/30 bg-rose-950/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 flex items-center space-x-1">
                <Headphones className="w-3.5 h-3.5" />
                <span>Audio Testing Studio</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
                6 Ready-to-Use Presets
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1.5 flex items-center space-x-2">
              <span>{currentLang === 'en' ? 'AI Video BGM Prompts & Sound Testing Studio' : 'AI ဗီဒီယိုများအတွက် အသင့်သုံး BGM Prompts & အသံစမ်းသပ်စတူဒီယို'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {currentLang === 'en'
                ? 'Curated commercial BGM prompt presets for Suno, Udio, Google Lyria, and Google Vids. Click any preset to view instruments and copy prompt.'
                : 'Suno, Udio, Google Lyria နှင့် Google Vids များတွင် တိုက်ရိုက်ထည့်သွင်း စမ်းသပ်နိုင်သော ကြော်ငြာနောက်ခံတေးဂီတ Prompts များနှင့် ရသသတ်မှတ်ချက်များ။'}
            </p>
          </div>

          <a
            href={bgmGeminiApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition shrink-0"
          >
            <span>{currentLang === 'en' ? 'Open Gemini Audio Studio' : 'Gemini အသံစတူဒီယို ဖွင့်မည်'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {BGM_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-500/80 text-white shadow-md ring-1 ring-rose-500/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-rose-300 w-fit">
                  {preset.bpm}
                </div>
                <div className="text-xs font-bold leading-tight line-clamp-2">
                  {currentLang === 'en' ? preset.titleEn : preset.titleMy}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Preset Deep Dive Card */}
        <div className="bg-slate-950 rounded-2xl p-5 sm:p-6 border border-rose-500/30 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-mono font-bold">
                  {activePreset.bpm}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activePreset.genre}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mt-1">
                {currentLang === 'en' ? activePreset.titleEn : activePreset.titleMy}
              </h4>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopyPresetPrompt(activePreset)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition cursor-pointer"
              >
                {copiedPresetId === activePreset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{currentLang === 'en' ? 'Prompt Copied!' : 'ကူးယူပြီးပါပြီ!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Copy BGM Prompt' : 'BGM Prompt ကူးမည်'}</span>
                  </>
                )}
              </button>

              <a
                href={bgmGeminiApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/40 text-xs font-semibold transition"
                title="Customize this style inside the dedicated Gemini assistant"
              >
                <span>{currentLang === 'en' ? 'Customize in Gem' : 'Gemini တွင်ပြင်ဆင်မည်'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-slate-400 font-semibold flex items-center space-x-1">
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                <span>{currentLang === 'en' ? 'Mood & Emotional Tone:' : 'စိတ်ခံစားမှုရသ:'}</span>
              </div>
              <p className="text-slate-200">
                {currentLang === 'en' ? activePreset.moodEn : activePreset.moodMy}
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-slate-400 font-semibold flex items-center space-x-1">
                <Sliders className="w-3.5 h-3.5 text-rose-400" />
                <span>{currentLang === 'en' ? 'Best Suited For Video Type:' : 'အသင့်တော်ဆုံး ဗီဒီယိုအမျိုးအစား:'}</span>
              </div>
              <p className="text-slate-200">
                {currentLang === 'en' ? activePreset.targetVideoEn : activePreset.targetVideoMy}
              </p>
            </div>
          </div>

          {/* Instruments tags */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 font-semibold">
              {currentLang === 'en' ? 'Key Instruments & Sound Palette:' : 'အသုံးပြုမည့် တူရိယာများနှင့် အသံဖွဲ့စည်းမှု:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activePreset.instruments.map((inst, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800 text-xs"
                >
                  🎵 {inst}
                </span>
              ))}
            </div>
          </div>

          {/* Ready-to-Paste Prompt Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {currentLang === 'en'
                    ? 'Prompt (Ready for Suno, Udio, Google Lyria / Vids):'
                    : 'Prompt (Suno, Udio, Google Lyria / Vids တွင် ထည့်သွင်းရန် အသင့်):'}
                </span>
              </span>
              <button
                onClick={() => handleCopyPresetPrompt(activePreset)}
                className="text-indigo-400 hover:text-indigo-300 transition text-[11px] font-mono cursor-pointer"
              >
                {copiedPresetId === activePreset.id ? 'Copied to Clipboard' : 'Click to Copy'}
              </button>
            </div>
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed select-all">
              {activePreset.prompt}
            </div>
          </div>
        </div>

        {/* 3 Golden Audio Mixing Rules for Commercial Ads */}
        <div className="bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              {currentLang === 'en'
                ? '3 Audio Engineering Golden Rules for Commercial AI Videos'
                : 'ကြော်ငြာဗီဒီယိုများတွင် မဖြစ်မနေ လိုက်နာရမည့် အသံချိန်ညှိမှု စည်းမျဉ်း ၃ ခု'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-1">
              <strong className="text-white block font-semibold">
                {currentLang === 'en' ? '1. The -16dB Ducking Rule' : '၁။ -16dB Ducking စည်းမျဉ်း'}
              </strong>
              <p className="text-slate-400 leading-relaxed">
                {currentLang === 'en'
                  ? 'Whenever Burmese voiceover speaks, lower the background music by -14dB to -18dB so the spoken words cut through cleanly without masking.'
                  : 'မြန်မာစကားပြော ပါဝင်ချိန်တွင် နောက်ခံ BGM ကို -14dB မှ -18dB အထိ လျှော့ချပေးပါ။ စကားပြောသံကို BGM က ဖုံးမသွားစေရန် ဖြစ်သည်။'}
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-1">
              <strong className="text-white block font-semibold">
                {currentLang === 'en' ? '2. Strictly [Instrumental Only]' : '၂။ [Instrumental Only] စည်းမျဉ်း'}
              </strong>
              <p className="text-slate-400 leading-relaxed">
                {currentLang === 'en'
                  ? 'Always append "[instrumental only, no vocals]" in AI music generators. English or foreign vocal chops will clash chaotically with Burmese dialogue.'
                  : 'AI သီချင်းထုတ်ရာတွင် [instrumental only, no vocals] ကို အမြဲထည့်ပါ။ အင်္ဂလိပ်သီချင်းစာသားများနှင့် မြန်မာစကားပြော ရောထွေးရှုပ်ထွေးမသွားစေရန် ဖြစ်သည်။'}
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-1">
              <strong className="text-white block font-semibold">
                {currentLang === 'en' ? '3. Instant 3-Second Audio Hook' : '၃။ ပထမ ၃ စက္ကန့် Audio Hook'}
              </strong>
              <p className="text-slate-400 leading-relaxed">
                {currentLang === 'en'
                  ? 'Do not use slow 10-second fade-ins. Start right away with an engaging acoustic strum, riser, or drum hit from 0.0s to hook social media viewers.'
                  : 'ပထမ ၃ စက္ကန့်တွင် အသံတိုးတိုးဖြင့် စတင်ခြင်းမျိုး မလုပ်ပါနှင့်။ အစကတည်းက စိတ်ဝင်စားဖွယ် တီးလုံးသံ သို့မဟုတ် စည်းချက်ဖြင့် ချက်ချင်း ဖမ်းစားပါ။'}
              </p>
            </div>
          </div>
        </div>
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

