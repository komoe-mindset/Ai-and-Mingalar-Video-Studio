import React, { useState } from 'react';
import { Sparkles, ExternalLink, Copy, Check, Bot } from 'lucide-react';
import { Language } from '../types';

interface GeminiAppCardProps {
  blockNumber?: 1 | 2 | 3 | string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  accentColor: 'indigo' | 'emerald' | 'cyan' | 'purple' | 'amber' | 'teal' | 'rose';
  currentLang: Language;
  onCopySuccess: (msg: string) => void;
  badgeLabel?: string;
  categoryLabel?: string;
  icon?: string;
}

export const GeminiAppCard: React.FC<GeminiAppCardProps> = ({
  blockNumber,
  title,
  subtitle,
  description,
  url,
  accentColor,
  currentLang,
  onCopySuccess,
  badgeLabel,
  categoryLabel,
  icon,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopied(true);
    const label = blockNumber ? `Block ${blockNumber}` : title;
    const msg =
      currentLang === 'en'
        ? `${label} Gemini link copied!`
        : `${label} Gemini လင့်ခ်ကို ကူးယူပြီးပါပြီ!`;
    onCopySuccess(msg);
    setTimeout(() => setCopied(false), 2200);
  };

  // Color schemes
  const colorMap = {
    indigo: {
      border: 'border-indigo-500/40 hover:border-indigo-400/60',
      bgGlow: 'bg-indigo-500/10',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      btnPrimary:
        'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30',
      btnSecondary:
        'bg-slate-900/90 hover:bg-slate-800 text-indigo-200 border border-indigo-500/30',
      accentText: 'text-indigo-400',
    },
    emerald: {
      border: 'border-emerald-500/40 hover:border-emerald-400/60',
      bgGlow: 'bg-emerald-500/10',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      btnPrimary:
        'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30',
      btnSecondary:
        'bg-slate-900/90 hover:bg-slate-800 text-emerald-200 border border-emerald-500/30',
      accentText: 'text-emerald-400',
    },
    cyan: {
      border: 'border-cyan-500/40 hover:border-cyan-400/60',
      bgGlow: 'bg-cyan-500/10',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      btnPrimary:
        'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/30',
      btnSecondary:
        'bg-slate-900/90 hover:bg-slate-800 text-cyan-200 border border-cyan-500/30',
      accentText: 'text-cyan-400',
    },
    purple: {
      border: 'border-purple-500/40 hover:border-purple-400/60',
      bgGlow: 'bg-purple-500/10',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      btnPrimary:
        'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-600/30',
      btnSecondary:
        'bg-slate-900/90 hover:bg-slate-800 text-purple-200 border border-purple-500/30',
      accentText: 'text-purple-400',
    },
    amber: {
      border: 'border-amber-500/40 hover:border-amber-400/60',
      bgGlow: 'bg-amber-500/10',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      btnPrimary:
        'bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-600/30',
      btnSecondary:
        'bg-slate-900/90 hover:bg-slate-800 text-amber-200 border border-amber-500/30',
      accentText: 'text-amber-400',
    },
    teal: {
      border: 'border-teal-500/40 hover:border-teal-400/60',
      bgGlow: 'bg-teal-500/10',
      badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      btnPrimary:
        'bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-lg shadow-teal-600/30',
      btnSecondary:
        'bg-slate-900/90 hover:bg-slate-800 text-teal-200 border border-teal-500/30',
      accentText: 'text-teal-400',
    },
    rose: {
      border: 'border-rose-500/40 hover:border-rose-400/60',
      bgGlow: 'bg-rose-500/10',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      btnPrimary:
        'bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-600/30',
      btnSecondary:
        'bg-slate-900/90 hover:bg-slate-800 text-rose-200 border border-rose-500/30',
      accentText: 'text-rose-400',
    },
  }[accentColor];

  return (
    <div
      id={`gemini-app-card-${blockNumber || 'ref'}`}
      className={`glass-panel p-5 sm:p-6 rounded-2xl border ${colorMap.border} ${colorMap.bgGlow} transition-all duration-300 relative overflow-hidden space-y-4`}
    >
      {/* Decorative ambient blur */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Info Column */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span
              className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorMap.badgeBg}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badgeLabel || 'Official Gemini Mini App'}</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {categoryLabel || (blockNumber ? `Block ${blockNumber} Pre-Engineered Assistant` : 'AI Video Visual Reference')}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
            {icon && <span className="text-xl">{icon}</span>}
            <span>{title}</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {description}
          </p>

          <p className="text-xs text-slate-400 italic font-mono">
            {subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex sm:flex-col lg:flex-col xl:flex-row items-stretch sm:items-end lg:items-end xl:items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
          <a
            id={`launch-gemini-${blockNumber || 'ref'}-btn`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${colorMap.btnPrimary}`}
          >
            <Bot className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'Launch Gemini App' : 'Gemini App ဖွင့်မည်'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            id={`copy-gemini-link-${blockNumber || 'ref'}-btn`}
            onClick={handleCopyLink}
            className={`inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${colorMap.btnSecondary}`}
            title={currentLang === 'en' ? 'Copy Mini App shareable URL' : 'လင့်ခ်ကို ကူးယူပါ'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">
                  {currentLang === 'en' ? 'Link Copied!' : 'ကူးယူပြီးပါပြီ!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? 'Copy Link' : 'လင့်ခ်ယူမည်'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tiny clickable URL reference bar */}
      <div className="pt-2 border-t border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400">
        <span className="flex items-center space-x-1.5 truncate max-w-full">
          <span className="text-slate-500 font-mono">Share URL:</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 underline underline-offset-2 truncate font-mono"
          >
            {url}
          </a>
        </span>
        <span className="text-slate-500 shrink-0">
          {currentLang === 'en'
            ? 'Free Google Gemini Shared Prompt (Instant Load)'
            : 'Google Gemini တွင် တိုက်ရိုက်အသုံးပြုနိုင်သည်'}
        </span>
      </div>
    </div>
  );
};
