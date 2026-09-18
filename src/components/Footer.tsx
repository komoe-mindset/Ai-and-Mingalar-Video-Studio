import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer className="glass-panel border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2 mt-12">
      <div className="max-w-7xl mx-auto space-y-2">
        <p className="text-slate-400">
          {t.footer_credits}
        </p>
        <p className="text-slate-500 font-mono text-[11px]">
          Nano Banana Pro • Gemini • Google Flow (Veo 3.1) • Google Vids • Lyria 3
        </p>
      </div>
    </footer>
  );
};
