import React, { useState } from 'react';
import { Video, ExternalLink, Copy, Check, Sparkles, Compass, Eye, Maximize, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CameraAngleResourceCardProps {
  currentLang: Language;
  onCopySuccess: (msg: string) => void;
  onSelectAngleSnippet?: (snippet: string) => void;
}

interface CameraAngleItem {
  id: string;
  nameEn: string;
  nameMy: string;
  icon: string;
  descEn: string;
  descMy: string;
  promptSnippet: string;
  tag: string;
}

const POPULAR_CAMERA_ANGLES: CameraAngleItem[] = [
  {
    id: 'eye-level-medium',
    nameEn: 'Eye-Level Medium (35mm)',
    nameMy: 'မျက်စိအမြင့် 35mm Medium Shot',
    icon: '👁️',
    descEn: 'Natural conversational framing. Keeps facial proportions realistic with zero lens distortion.',
    descMy: 'သဘာဝကျသော လူ့မျက်စိအမြင့် ရှုထောင့်။ မျက်နှာသွင်ပြင်နှင့် အချိုးအစား မပြောင်းလဲစေပါ။',
    promptSnippet: 'Eye-level medium shot, 35mm lens, natural commercial eye perspective, balanced composition',
    tag: 'Spokesperson',
  },
  {
    id: 'low-angle-hero',
    nameEn: 'Low-Angle Hero Shot',
    nameMy: 'အောက်မှအထက်သို့ မော့ကြည့် Low Angle',
    icon: '📐',
    descEn: 'Camera tilted upward from waist height. Imparts confidence, stature, and brand authority.',
    descMy: 'ခါးအမြင့်မှ အထက်သို့ အနည်းငယ်မော့ရိုက်ခြင်း။ ယုံကြည်မှုနှင့် ခန့်ညားထည်ဝါမှုကို ပေးစွမ်းသည်။',
    promptSnippet: 'Cinematic low-angle hero shot, camera tilted slightly upward from waist level, dynamic posture',
    tag: 'Hero Shot',
  },
  {
    id: 'birds-eye-topdown',
    nameEn: "Bird's Eye / Top-Down View",
    nameMy: "ငှက်မျက်လုံး အပေါ်စီး Top-Down Shot",
    icon: '🦅',
    descEn: '90° directly overhead shot showing table arrangements, product flat-lays, or store layout.',
    descMy: 'အထက်မှ အောက်သို့ ၉၀ ဒီဂရီ တည့်တည့်ရိုက်သော အပေါ်စီးပုံစံ။ ကုန်ပစ္စည်းနှင့် ဆိုင်အပြင်အဆင်အတွက် အထူးကောင်း။',
    promptSnippet: "90-degree bird's-eye top-down view, geometric flat-lay composition, crisp overhead studio lighting",
    tag: 'Flat Lay',
  },
  {
    id: 'macro-close-up',
    nameEn: 'Macro Extreme Close-Up',
    nameMy: 'အနီးကပ် Macro Extreme Close-Up',
    icon: '🔍',
    descEn: 'Super tight framing on textures: coffee crema, skincare drops, or artisanal craftsmanship.',
    descMy: 'အနီးကပ်ဆုံး ရှုထောင့်။ ကော်ဖီအမြှုပ်၊ အသားအရေဆီစက်နှင့် ကုန်ပစ္စည်းအသားစများကို အသေးစိတ်ပြသသည်။',
    promptSnippet: 'Macro extreme close-up, shallow depth of field, f/1.8 bokeh, ultra-crisp surface textures',
    tag: 'Texture / Product',
  },
  {
    id: 'over-the-shoulder',
    nameEn: 'Over-The-Shoulder (OTS)',
    nameMy: 'ပခုံးကျော် Over-the-Shoulder (OTS)',
    icon: '👤',
    descEn: 'Framed over a secondary subject’s shoulder looking at the spokesperson or cashier desk.',
    descMy: 'ရှေ့လူ၏ ပခုံးစွန်းကို မဝေမစဲပြကာ အဓိကဇာတ်ကောင် သို့မဟုတ် ကောင်တာကို ကြည့်ရှုသော ရှုထောင့်။',
    promptSnippet: 'Over-the-shoulder medium shot (OTS), foreground shoulder slightly blurred, focal subject in crisp focus',
    tag: 'Dialogue',
  },
  {
    id: 'dutch-angle-canted',
    nameEn: 'Dutch Angle (Canted Tilt)',
    nameMy: 'တိမ်းစောင်း Dutch Angle (Canted)',
    icon: '🌀',
    descEn: 'Camera tilted 15°-25° off the horizontal axis. Injects dynamic energy, tension, or excitement.',
    descMy: 'ကင်မရာကို ၁၅-၂၅ ဒီဂရီ ဘေးသို့ စောင်းရိုက်ခြင်း။ တက်ကြွလှုပ်ရှားမှုနှင့် စိတ်လှုပ်ရှားဖွယ် ရသကို ဖန်တီးပေးသည်။',
    promptSnippet: 'Dynamic Dutch angle shot, 20-degree canted camera roll, modern commercial fashion energy',
    tag: 'Energy / Promo',
  },
  {
    id: 'worms-eye-view',
    nameEn: "Worm's Eye View",
    nameMy: "မြေပြင်ကပ် Worm's Eye View",
    icon: '🪱',
    descEn: 'Camera positioned right at floor level looking up. Creates dramatic monumental scale.',
    descMy: 'မြေပြင်နှင့် တပြေးတည်း ကပ်ရိုက်သော ရှုထောင့်။ အဆောက်အအုံနှင့် လူကို အလွန်ကြီးမားထည်ဝါစေသည်။',
    promptSnippet: "Ground-level worm's-eye view, dramatic upward tilt, architectural perspective and towering depth",
    tag: 'Scale / Architecture',
  },
  {
    id: 'steadicam-push-in',
    nameEn: 'Steadicam Push-In Motion',
    nameMy: 'ချောမွေ့စွာ ရှေ့တိုး Steadicam Push-In',
    icon: '🎬',
    descEn: 'Smooth, subtle continuous forward motion toward the character or hero product.',
    descMy: 'ဇာတ်ကောင် သို့မဟုတ် ကုန်ပစ္စည်းဆီသို့ ချောမွေ့စွာ ဖြည်းညင်းစွာ ရှေ့တိုးသွားသော လှုပ်ရှားမှု။',
    promptSnippet: 'Slow smooth steadicam push-in, cinematic camera tracking forward at eye level, subtle parallax',
    tag: 'Motion Prompt',
  },
];

export const CameraAngleResourceCard: React.FC<CameraAngleResourceCardProps> = ({
  currentLang,
  onCopySuccess,
  onSelectAngleSnippet,
}) => {
  const t = translations[currentLang];
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const websiteUrl = 'https://camera-angle.komoe.org/';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopiedLink(true);
    onCopySuccess(
      currentLang === 'en'
        ? 'Camera Angle Learning website link copied! (https://camera-angle.komoe.org/)'
        : 'Camera Angle လေ့လာရေး ဝဘ်ဆိုက်လင့်ခ်ကို ကူးယူပြီးပါပြီ!'
    );
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySnippet = (item: CameraAngleItem) => {
    navigator.clipboard.writeText(item.promptSnippet);
    setCopiedSnippetId(item.id);
    if (onSelectAngleSnippet) {
      onSelectAngleSnippet(item.promptSnippet);
    }
    onCopySuccess(
      currentLang === 'en'
        ? `Copied "${item.nameEn}" camera prompt snippet!`
        : `"${item.nameMy}" ကင်မရာ Prompt ကို ကူးယူပြီးပါပြီ!`
    );
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/20 via-slate-900/90 to-slate-950 space-y-5 shadow-xl relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -right-16 -top-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Launch Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30 flex items-center space-x-1.5">
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.camera_angle_badge}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              camera-angle.komoe.org
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
            <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>{t.camera_angle_card_title}</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.camera_angle_card_desc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 relative z-10">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            title="Copy website link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">{t.btn_copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.btn_copy_camera_link}</span>
              </>
            )}
          </button>

          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-md shadow-cyan-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Video className="w-4 h-4 text-cyan-200" />
            <span>{t.btn_open_camera_website}</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
          </a>
        </div>
      </div>

      {/* Interactive Quick Camera Angles Cheat Sheet */}
      <div className="pt-2 border-t border-slate-800/80 space-y-3 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-cyan-300 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.camera_angles_cheat_title}</span>
          </h4>
          <span className="text-[11px] text-slate-400">
            {currentLang === 'en'
              ? 'Click any angle to copy its prompt syntax'
              : 'ကလစ်နှိပ်ရုံဖြင့် Prompt Syntax ကို ကူးယူနိုင်သည်'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {POPULAR_CAMERA_ANGLES.map((angle) => {
            const isCopied = copiedSnippetId === angle.id;

            return (
              <div
                key={angle.id}
                onClick={() => handleCopySnippet(angle)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 group ${
                  isCopied
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/50'
                }`}
                title="Click to copy camera prompt snippet"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{angle.icon}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {angle.tag}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                    {currentLang === 'en' ? angle.nameEn : angle.nameMy}
                  </h5>

                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                    {currentLang === 'en' ? angle.descEn : angle.descMy}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                  <span className="truncate max-w-[140px]">
                    {isCopied ? (currentLang === 'en' ? 'Copied to prompt!' : 'ကူးယူပြီး!') : 'Copy snippet'}
                  </span>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
