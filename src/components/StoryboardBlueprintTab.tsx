import React, { useState } from 'react';
import { Link2, Copy, Check, Wand2, Film, Video, Mic2, ExternalLink, Bot } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { GeminiAppCard } from './GeminiAppCard';
import { CameraAngleResourceCard } from './CameraAngleResourceCard';
import { GEMINI_APPS } from '../data/geminiApps';

interface StoryboardBlueprintTabProps {
  currentLang: Language;
  onCopySuccess: (msg: string) => void;
}

export const StoryboardBlueprintTab: React.FC<StoryboardBlueprintTabProps> = ({
  currentLang,
  onCopySuccess,
}) => {
  const t = translations[currentLang];
  const geminiApp = GEMINI_APPS[2];

  // Generator states
  const [biz, setBiz] = useState('Modern specialty coffee shop & roastery in Yangon');
  const [offer, setOffer] = useState('50% off second cup on weekends + fresh artisan bakery');
  const [audience, setAudience] = useState('Young professionals, digital nomads, remote creatives');
  const [aspectRatio, setAspectRatio] = useState('9:16 vertical (for TikTok, Reels, Shorts)');
  const [scenesCount, setScenesCount] = useState('7');
  const [copied, setCopied] = useState(false);

  // Generate Master Blueprint Prompt
  const masterBlueprintText = `CONTEXT:
Business & Offer: ${biz}.
Campaign Promotion: ${offer}.
Target Audience: ${audience}.
Attached Assets: [character-01.png turnaround sheet, location-01.png location sheet].

STRUCTURE:
A 60-second commercial. Provide ${scenesCount} sequentially numbered scenes.
Aspect Ratio: ${aspectRatio}.
Rule: Use ONLY the exact spokesperson face from the attached character sheet and the exact architecture from the location sheet.

FOR EACH SCENE, SPECIFY EXACTLY:
1. Scene number + exact duration in seconds (e.g. Scene 1: 0-4 seconds).
2. Image Prompt in English:
   - Subject (Reference character sheet)
   - Single Action (One movement only)
   - Environment (Specific corner from location sheet & lighting state)
   - Visual Style & Aesthetics (Commercial grade, 35mm lens, warm natural lighting)
   - Camera Shot & Angle (Close-up, Medium 45°, Wide establishing)
3. Animated Motion Prompt for Veo 3.1:
   - Body Movement
   - Camera Movement (slow push-in or tripod lock)
   - Background Movement (steam, subtle passersby, lighting shift)
4. Burmese Dialogue (Only for dialogue scenes):
   - Prefix every dialogue line with: "She speaks in Burmese language:" followed by natural, concise Burmese spoken phrasing.

RULES:
Keep the visual grade and spokesperson clothing strictly identical in every scene. Do not introduce new cast members. Keep motions clean and cinematic.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(masterBlueprintText);
    setCopied(true);
    onCopySuccess(
      currentLang === 'en'
        ? 'Master blueprint prompt copied to clipboard!'
        : 'Master Blueprint Prompt ကို ကူးယူပြီးပါပြီ!'
    );
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyPreset = (preset: { biz: string; offer: string; audience: string }) => {
    setBiz(preset.biz);
    setOffer(preset.offer);
    setAudience(preset.audience);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
            Block 3 • 75 Minutes
          </span>
          <span className="text-xs text-slate-400">
            Tool: Gemini / Claude / ChatGPT (Chain-of-Thought)
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
          {t.b3_title}
        </h2>
        <p className="text-sm text-slate-400 mt-1 italic">
          {t.b3_subtitle}
        </p>
      </div>

      {/* Official Gemini Mini App Feature Card */}
      <GeminiAppCard
        blockNumber={3}
        title={currentLang === 'en' ? geminiApp.titleEn : geminiApp.titleMy}
        subtitle={currentLang === 'en' ? geminiApp.subtitleEn : geminiApp.subtitleMy}
        description={currentLang === 'en' ? geminiApp.descEn : geminiApp.descMy}
        url={geminiApp.url}
        accentColor="cyan"
        currentLang={currentLang}
        onCopySuccess={onCopySuccess}
      />

      {/* Camera Angle Learning Website for AI Video Resource & Cheat Sheet */}
      <CameraAngleResourceCard
        currentLang={currentLang}
        onCopySuccess={onCopySuccess}
      />

      {/* The 6 Links of Chain-of-Thought Prompting */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Link2 className="w-5 h-5 text-indigo-400" />
          <span>{t.cot_six_title}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-panel p-4 sm:p-5 rounded-xl border-slate-800 space-y-2 hover:border-indigo-500/40 transition">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
                1
              </span>
              <span>{t.link1_name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.link1_desc}</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-xl border-slate-800 space-y-2 hover:border-indigo-500/40 transition">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
                2
              </span>
              <span>{t.link2_name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.link2_desc}</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-xl border-slate-800 space-y-2 hover:border-indigo-500/40 transition">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
                3
              </span>
              <span>{t.link3_name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.link3_desc}</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-xl border-slate-800 space-y-2 hover:border-indigo-500/40 transition">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
                4
              </span>
              <span>{t.link4_name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.link4_desc}</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-xl border-slate-800 space-y-2 hover:border-indigo-500/40 transition">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
                5
              </span>
              <span>{t.link5_name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.link5_desc}</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-xl border-slate-800 space-y-2 hover:border-indigo-500/40 transition">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
                6
              </span>
              <span>{t.link6_name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.link6_desc}</p>
          </div>
        </div>
      </div>

      {/* Anatomy of Image & Motion Prompts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800 space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
            <Film className="w-4 h-4 text-indigo-400" />
            <span>{t.anatomy_img_title}</span>
          </h4>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
            <li>
              <strong className="text-indigo-400">Subject:</strong> Who is in the frame? (Reference character-01.png).
            </li>
            <li>
              <strong className="text-indigo-400">Action:</strong> ONE single clear action per shot (never chain multiple actions).
            </li>
            <li>
              <strong className="text-indigo-400">Environment:</strong> Location sheet segment & specific lighting state.
            </li>
            <li>
              <strong className="text-indigo-400">Visual Style:</strong> 35mm lens, subtle film grain, natural commercial grade (keep identical across all 7 scenes).
            </li>
            <li>
              <strong className="text-indigo-400">Camera:</strong> Shot size & angle (Close-up, Medium over-the-shoulder, Wide).
            </li>
          </ul>
        </div>

        <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800 space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
            <Video className="w-4 h-4 text-emerald-400" />
            <span>{t.anatomy_motion_title}</span>
          </h4>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
            <li>
              <strong className="text-emerald-400">Body Movement:</strong> Subtle turns, handing coffee, warm smile, pointing to menu.
            </li>
            <li>
              <strong className="text-emerald-400">Camera Movement:</strong> Slow push-in, subtle pan left, or static tripod shot (static is often cleanest).
            </li>
            <li>
              <strong className="text-emerald-400">Background Movement:</strong> Coffee steam rising, ceiling fan turning, customers walking in distance (makes AI video feel real!).
            </li>
            <li className="text-slate-400 italic pt-1 text-xs">
              Note: Not every scene needs all 3 motions. Keep motions subtle to avoid AI warping.
            </li>
          </ul>
        </div>
      </div>

      {/* Burmese Dialogue Syntax Rules */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border-indigo-500/30 bg-slate-900/80 space-y-3">
        <h4 className="text-sm sm:text-base font-bold text-indigo-300 flex items-center space-x-2">
          <Mic2 className="w-4 h-4 text-indigo-400" />
          <span>{t.burmese_syntax_title}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-200 font-semibold block mb-1">1. English Container</span>
            <p className="text-slate-400 leading-relaxed">
              Write all prompts in English, only Burmese spoken dialogue inside quotes.
            </p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-200 font-semibold block mb-1">2. Mandatory Prefix</span>
            <p className="text-slate-400 leading-relaxed">
              Always write: <code className="text-indigo-400 text-[11px] block mt-0.5">She speaks in Burmese language: "..."</code>
            </p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-200 font-semibold block mb-1">3. Short Sentences</span>
            <p className="text-slate-400 leading-relaxed">
              Keep spoken lines under 5-8 words so lips don't de-sync from video timing.
            </p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-200 font-semibold block mb-1">4. Rely on B-Roll</span>
            <p className="text-slate-400 leading-relaxed">
              Silence and product B-roll with upbeat music are punchier than non-stop dialogue.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MASTER BLUEPRINT PROMPT GENERATOR */}
      <div id="blueprint-tool" className="glass-panel p-6 rounded-2xl border-indigo-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-cyan-400" />
              <span>{t.master_gen_title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.master_gen_sub}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() =>
                handleApplyPreset({
                  biz: 'Specialty coffee roastery and bakery cafe in Yangon',
                  offer: '50% discount on second signature drink on weekends',
                  audience: 'Urban youth, remote workers, cafe lovers',
                })
              }
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              ☕ Cafe / Bakery
            </button>
            <button
              onClick={() =>
                handleApplyPreset({
                  biz: 'Organic skincare & wellness brand formulated with local botanical botanicals',
                  offer: 'Buy 1 Glow Serum get 1 Sunscreen mini + free delivery',
                  audience: 'Women 20-40 seeking radiant, sun-safe healthy skin',
                })
              }
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              🌿 Skincare
            </button>
            <button
              onClick={() =>
                handleApplyPreset({
                  biz: 'Contemporary fashion atelier with modern traditional silk blend attire',
                  offer: 'New festival collection launch with 20% early-bird code',
                  audience: 'Fashion conscious young professionals and wedding guests',
                })
              }
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              👗 Fashion Boutique
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-slate-300 font-semibold mb-1">
              {t.form_biz}
            </label>
            <input
              type="text"
              value={biz}
              onChange={(e) => setBiz(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-slate-300 font-semibold mb-1">
              {t.form_offer}
            </label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {t.form_audience}
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {t.form_aspect}
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="9:16 vertical (for TikTok, Reels, Shorts)">
                9:16 Vertical (TikTok / Reels)
              </option>
              <option value="16:9 landscape (for YouTube, Website)">
                16:9 Landscape (YouTube / Web)
              </option>
              <option value="1:1 square (for Instagram Feeds)">
                1:1 Square (Instagram Feed)
              </option>
            </select>
          </div>
        </div>

        {/* Master Prompt Output Box */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              {t.bp_output_title}
            </span>
            <div className="flex items-center space-x-2">
              <a
                id="open-gemini-bp-prompt-btn"
                href={geminiApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 shadow"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentLang === 'en' ? 'Open in Gemini App' : 'Gemini App တွင် ဖွင့်မည်'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <button
                id="copy-master-bp-btn"
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition flex items-center justify-center space-x-1.5 shadow cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{t.btn_copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.btn_copy_bp}</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 max-h-80 select-all">
            {masterBlueprintText}
          </pre>
        </div>
      </div>
    </div>
  );
};
