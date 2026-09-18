import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, AlertTriangle, UserCheck, ShieldCheck, ExternalLink, Bot, Palette } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { GeminiAppCard } from './GeminiAppCard';
import { GEMINI_APPS, VISUAL_REF_GEMINI_APPS } from '../data/geminiApps';

interface CharacterSheetTabProps {
  currentLang: Language;
  onCopySuccess: (msg: string) => void;
}

export const CharacterSheetTab: React.FC<CharacterSheetTabProps> = ({
  currentLang,
  onCopySuccess,
}) => {
  const t = translations[currentLang];
  const geminiApp = GEMINI_APPS[0];
  const cartoonAvatarGem = VISUAL_REF_GEMINI_APPS[0];
  const [showCartoonRef, setShowCartoonRef] = useState(false);

  // Generator form states
  const [gender, setGender] = useState('Myanmar woman in her late 20s');
  const [appearance, setAppearance] = useState(
    'clean glowing skin, neat shoulder-length black hair tied in a clean ponytail, pleasant gentle eyes'
  );
  const [dress, setDress] = useState(
    'minimalist modern navy blue buttoned linen shirt with rolled-up sleeves, silver wrist watch'
  );
  const [copied, setCopied] = useState(false);

  // Generate Character Prompt
  const generatedPrompt = `A hyper-detailed professional Character Turnaround Sheet for commercial video production.
SUBJECT: A friendly, professional ${gender}, ${appearance}.
WARDROBE: ${dress}.
LAYOUT SPECIFICATION: Split into multiple clean panels on a single page:
1. Full front view (looking directly at camera, neutral pleasant gaze, closed mouth).
2. Three-quarter view (45-degree angle, confident welcoming posture).
3. Side profile view (precise 90-degree angle showing clean jawline, nose, and ear).
4. Back turnaround view (showing hairstyle, collar, and posture from behind).
5. 3 facial expressions: neutral, warm smile, and engaged explainer.
CRITICAL CONSISTENCY RULES: Identical face, identical facial proportions, identical bone structure, identical hair and outfit across every panel.
LIGHTING & BACKGROUND: Perfectly even studio soft lighting, no harsh shadows, plain uniform light-neutral grey background. Photorealistic 8K, commercial quality.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    onCopySuccess(currentLang === 'en' ? 'Character prompt copied to clipboard!' : 'Character Prompt ကို ကူးယူပြီးပါပြီ!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePresetSelect = (preset: { gender: string; appearance: string; dress: string }) => {
    setGender(preset.gender);
    setAppearance(preset.appearance);
    setDress(preset.dress);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              Block 1 • 60 Minutes
            </span>
            <span className="text-xs text-slate-400">
              Tool: Nano Banana Pro / Gemini / Flow
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            {t.b1_title}
          </h2>
          <p className="text-sm text-slate-400 mt-1 italic">
            {t.b1_subtitle}
          </p>
        </div>
      </div>

      {/* Official Gemini Mini App Feature Card */}
      <GeminiAppCard
        blockNumber={1}
        title={currentLang === 'en' ? geminiApp.titleEn : geminiApp.titleMy}
        subtitle={currentLang === 'en' ? geminiApp.subtitleEn : geminiApp.subtitleMy}
        description={currentLang === 'en' ? geminiApp.descEn : geminiApp.descMy}
        url={geminiApp.url}
        accentColor="indigo"
        currentLang={currentLang}
        onCopySuccess={onCopySuccess}
      />

      {/* Visual Reference Companion: 2D Cartoon Avatar */}
      <div className="glass-panel p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xl shrink-0">
            {cartoonAvatarGem.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                {currentLang === 'en' ? 'Visual Reference Gem' : 'Visual Reference အထူးလင့်ခ်'}
              </span>
              <h4 className="text-sm font-bold text-white">
                {currentLang === 'en' ? cartoonAvatarGem.titleEn : cartoonAvatarGem.titleMy}
              </h4>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {currentLang === 'en'
                ? 'Creating an animated cartoon commercial? Use this dedicated Gemini app to lock 2D vector style, cel-shading, and expressive facial geometry.'
                : '2D ကာတွန်းပုံစံ ဗီဒီယိုကြော်ငြာများအတွက် အထူးသီးသန့် ရုပ်သွင်ထိန်းသိမ်းပေးမည့် Gemini App ဖြစ်ပါသည်။'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
          <button
            onClick={() => {
              navigator.clipboard.writeText(cartoonAvatarGem.url);
              onCopySuccess(
                currentLang === 'en'
                  ? '2D Cartoon Avatar Gemini link copied!'
                  : '2D Cartoon Avatar Gemini လင့်ခ်ကို ကူးယူပြီးပါပြီ!'
              );
            }}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-purple-500/30 text-xs font-medium transition cursor-pointer flex items-center space-x-1"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Copy Link' : 'လင့်ခ်ယူမည်'}</span>
          </button>
          <a
            href={cartoonAvatarGem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Launch Reference' : 'Reference ဖွင့်မည်'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Why Turnaround Sheet Matters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="text-2xl">📐</div>
          <h3 className="text-base font-bold text-white">{t.b1_why1_title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.b1_why1_desc}
          </p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="text-2xl">📸</div>
          <h3 className="text-base font-bold text-white">{t.b1_why2_title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.b1_why2_desc}
          </p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="text-2xl">🤖</div>
          <h3 className="text-base font-bold text-white">{t.b1_why3_title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.b1_why3_desc}
          </p>
        </div>
      </div>

      {/* 5 Essential Panels Visualizer */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-indigo-400" />
          <span>{t.b1_panels_title}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Panel 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center space-y-2.5 hover:border-indigo-500/40 transition">
            <div className="h-28 bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-slate-800/80 shadow-inner">
              <span className="text-3xl">👤</span>
              <span className="text-[11px] font-mono text-indigo-400 mt-1 font-semibold">0° Front</span>
            </div>
            <h4 className="text-xs font-bold text-white">{t.p1_name}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">{t.p1_desc}</p>
          </div>

          {/* Panel 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center space-y-2.5 hover:border-indigo-500/40 transition">
            <div className="h-28 bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-slate-800/80 shadow-inner">
              <span className="text-3xl">🗣️</span>
              <span className="text-[11px] font-mono text-indigo-400 mt-1 font-semibold">45° Angle</span>
            </div>
            <h4 className="text-xs font-bold text-white">{t.p2_name}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">{t.p2_desc}</p>
          </div>

          {/* Panel 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center space-y-2.5 hover:border-indigo-500/40 transition">
            <div className="h-28 bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-slate-800/80 shadow-inner">
              <span className="text-3xl">👥</span>
              <span className="text-[11px] font-mono text-indigo-400 mt-1 font-semibold">90° Side</span>
            </div>
            <h4 className="text-xs font-bold text-white">{t.p3_name}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">{t.p3_desc}</p>
          </div>

          {/* Panel 4 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center space-y-2.5 hover:border-indigo-500/40 transition">
            <div className="h-28 bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-slate-800/80 shadow-inner">
              <span className="text-3xl">🔙</span>
              <span className="text-[11px] font-mono text-indigo-400 mt-1 font-semibold">180° Back</span>
            </div>
            <h4 className="text-xs font-bold text-white">{t.p4_name}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">{t.p4_desc}</p>
          </div>

          {/* Panel 5 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center space-y-2.5 col-span-2 sm:col-span-1 hover:border-indigo-500/40 transition">
            <div className="h-28 bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-slate-800/80 shadow-inner">
              <span className="text-3xl">😊</span>
              <span className="text-[11px] font-mono text-indigo-400 mt-1 font-semibold">3 Moods</span>
            </div>
            <h4 className="text-xs font-bold text-white">{t.p5_name}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">{t.p5_desc}</p>
          </div>
        </div>
      </div>

      {/* 4 Critical Mistakes that Ruin a Sheet */}
      <div className="glass-panel p-6 rounded-2xl border-amber-500/25 bg-amber-950/10 space-y-4">
        <h3 className="text-base font-bold text-amber-300 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>{t.b1_mistakes_title}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-rose-400 font-bold block">{t.m1_title}</span>
            <p className="text-slate-400 leading-relaxed">{t.m1_desc}</p>
          </div>
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-rose-400 font-bold block">{t.m2_title}</span>
            <p className="text-slate-400 leading-relaxed">{t.m2_desc}</p>
          </div>
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-rose-400 font-bold block">{t.m3_title}</span>
            <p className="text-slate-400 leading-relaxed">{t.m3_desc}</p>
          </div>
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-rose-400 font-bold block">{t.m4_title}</span>
            <p className="text-slate-400 leading-relaxed">{t.m4_desc}</p>
          </div>
        </div>
      </div>

      {/* Interactive Character Sheet Formula Generator */}
      <div className="glass-panel p-6 rounded-2xl border-indigo-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>{t.char_gen_title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.char_gen_subtitle}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() =>
                handlePresetSelect({
                  gender: 'Myanmar woman in her late 20s',
                  appearance:
                    'clean glowing skin, neat shoulder-length black hair tied in a clean ponytail, pleasant gentle eyes',
                  dress:
                    'minimalist modern navy blue buttoned linen shirt with rolled-up sleeves, silver wrist watch',
                })
              }
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              👩 Professional Female
            </button>
            <button
              onClick={() =>
                handlePresetSelect({
                  gender: 'Myanmar man in his early 30s',
                  appearance:
                    'well-groomed short hair, confident warm smile, trimmed neat goatee, modern sharp posture',
                  dress:
                    'charcoal grey polo shirt, tailored black trousers, leather strap watch',
                })
              }
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              👨 Professional Male
            </button>
            <button
              onClick={() =>
                handlePresetSelect({
                  gender: 'Southeast Asian young barista man in early 20s',
                  appearance:
                    'friendly enthusiastic eyes, modern wavy fade hairstyle, radiant smile',
                  dress:
                    'dark green barista apron over an off-white cotton crewneck t-shirt',
                })
              }
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              ☕ Artisan Barista
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {t.field_gender}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="Myanmar woman in her late 20s">
                Myanmar woman in late 20s / မြန်မာအမျိုးသမီး
              </option>
              <option value="Myanmar man in his early 30s">
                Myanmar man in early 30s / မြန်မာအမျိုးသား
              </option>
              <option value="Southeast Asian female entrepreneur in her 30s">
                Southeast Asian female entrepreneur
              </option>
              <option value="Southeast Asian young barista man in early 20s">
                Young male barista in early 20s
              </option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {t.field_appearance}
            </label>
            <input
              type="text"
              value={appearance}
              onChange={(e) => setAppearance(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {t.field_dress}
            </label>
            <input
              type="text"
              value={dress}
              onChange={(e) => setDress(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Generated Result Box */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
              {t.prompt_output_label}
            </span>
            <div className="flex items-center space-x-2">
              <a
                id="open-gemini-char-prompt-btn"
                href={geminiApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 shadow"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentLang === 'en' ? 'Open in Gemini App' : 'Gemini App တွင် ဖွင့်မည်'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <button
                id="copy-char-prompt-btn"
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition flex items-center space-x-1.5 shadow cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{t.btn_copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.btn_copy}</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="text-xs font-mono text-slate-300 leading-relaxed break-words bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 select-all whitespace-pre-wrap">
            {generatedPrompt}
          </p>
          <div className="flex items-start sm:items-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="text-emerald-400 font-bold mr-1">{t.lock_rules_tag}</span>
              <span>{t.lock_rules_text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
