import React, { useState } from 'react';
import { Sparkles, Languages, Menu, X, Wand2, Bot } from 'lucide-react';
import { Language, TabType } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenGeminiModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  setLanguage,
  activeTab,
  setActiveTab,
  onOpenGeminiModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleTabSelect = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jumpToPromptBuilder = () => {
    setActiveTab('block3');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('blueprint-tool');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & App Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white font-black text-lg tracking-wider shrink-0">
            AI
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                {t.app_title}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30 whitespace-nowrap">
                {t.app_badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block max-w-md truncate">
              {t.app_subtitle}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Toggle */}
          <div className="bg-slate-900/90 border border-slate-700/80 p-1 rounded-xl flex items-center shadow-inner">
            <button
              id="lang-toggle-en"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                currentLang === 'en'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              id="lang-toggle-my"
              onClick={() => setLanguage('my')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                currentLang === 'my'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Switch to Myanmar"
            >
              မြန်မာ
            </button>
          </div>

          {/* Quick Action: Gemini Mini Apps Launcher */}
          <button
            id="btn-quick-gemini-apps"
            onClick={onOpenGeminiModal}
            className="inline-flex items-center space-x-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition shadow-sm cursor-pointer"
            title="Open Official Gemini Mini Apps"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Gemini Apps</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Quick Action: Prompt Builder */}
          <button
            id="btn-quick-prompt-builder"
            onClick={jumpToPromptBuilder}
            className="hidden md:inline-flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-medium px-3.5 py-2 rounded-xl transition shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            <span>{t.btn_generator}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-800 space-y-1.5 pb-2 animate-in fade-in duration-150">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGeminiModal();
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between bg-indigo-600/25 text-indigo-200 border border-indigo-500/40 my-1"
          >
            <span className="flex items-center space-x-2.5">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>{currentLang === 'en' ? 'Launch Gemini Mini Apps' : 'Gemini Mini Apps ဖွင့်ရန်'}</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 font-mono">
              3 Apps
            </span>
          </button>

          <button
            onClick={() => handleTabSelect('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 ${
              activeTab === 'overview'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span>📌</span>
            <span>{t.tab_overview}</span>
          </button>

          <button
            onClick={() => handleTabSelect('block1')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 ${
              activeTab === 'block1'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span>👤</span>
            <span>{t.tab_character}</span>
          </button>

          <button
            onClick={() => handleTabSelect('block2')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 ${
              activeTab === 'block2'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span>🏢</span>
            <span>{t.tab_location}</span>
          </button>

          <button
            onClick={() => handleTabSelect('block3')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 ${
              activeTab === 'block3'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span>📋</span>
            <span>{t.tab_blueprint}</span>
          </button>

          <button
            onClick={() => handleTabSelect('block4')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 ${
              activeTab === 'block4'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span>🎬</span>
            <span>{t.tab_assembly}</span>
          </button>

          <button
            onClick={() => handleTabSelect('calculator')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 ${
              activeTab === 'calculator'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span>⚡</span>
            <span>{t.tab_calculator}</span>
          </button>
        </div>
      )}
    </header>
  );
};
