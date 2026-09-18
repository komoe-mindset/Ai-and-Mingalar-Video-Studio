import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, ExternalLink, Copy, Check, ArrowRight, Bot, Layers, Image as ImageIcon, Music } from 'lucide-react';
import { GEMINI_APPS, GeminiAppInfo, WORKFLOW_GEMINI_APPS, VISUAL_REF_GEMINI_APPS, AUDIO_GEMINI_APPS } from '../data/geminiApps';
import { Language, TabType } from '../types';

interface GeminiAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSelectTab: (tab: TabType) => void;
  onCopySuccess: (msg: string) => void;
}

type ModalFilter = 'all' | 'workflow' | 'reference' | 'audio';

export const GeminiAppsModal: React.FC<GeminiAppsModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectTab,
  onCopySuccess,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ModalFilter>('all');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Accessible ESC key listener, background scroll lock, and focus trap
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button smoothly on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Accessible ESC key listener
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Accessible Focus Trapping
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (app: GeminiAppInfo) => {
    navigator.clipboard.writeText(app.url);
    setCopiedId(app.id);
    const msg =
      currentLang === 'en'
        ? `${app.titleEn} link copied to clipboard!`
        : `${app.titleMy} လင့်ခ်ကို ကူးယူပြီးပါပြီ!`;
    onCopySuccess(msg);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleJumpToTab = (tab: TabType) => {
    onSelectTab(tab);
    onClose();
  };

  const displayedApps =
    filter === 'workflow'
      ? WORKFLOW_GEMINI_APPS
      : filter === 'reference'
      ? VISUAL_REF_GEMINI_APPS
      : filter === 'audio'
      ? AUDIO_GEMINI_APPS
      : GEMINI_APPS;

  return (
    <div
      id="gemini-apps-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gemini-modal-title"
        aria-describedby="gemini-modal-desc"
        tabIndex={-1}
        id="gemini-apps-modal-content"
        className="glass-panel border border-indigo-500/40 bg-slate-950/95 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 space-y-5 relative focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0" aria-hidden="true">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h3 id="gemini-modal-title" className="text-base sm:text-lg font-bold text-white">
                  {currentLang === 'en' ? 'Official Gemini Mini Apps & Visual References' : 'တရားဝင် Gemini Mini Apps & Visual References'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
                  {GEMINI_APPS.length} Pre-Trained Gems
                </span>
              </div>
              <p id="gemini-modal-desc" className="text-xs text-slate-400 mt-0.5">
                {currentLang === 'en'
                  ? 'Access pre-engineered Gemini assistants for production workflow blocks and AI video visual references.'
                  : 'ထုတ်လုပ်ရေးကဏ္ဍများနှင့် AI ဗီဒီယို Visual Reference များအတွက် ကြိုတင်ပြင်ဆင်ထားသော Gemini Apps များ'}
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label={currentLang === 'en' ? 'Close Gemini Apps modal' : 'Gemini Apps ဝင်းဒိုးကို ပိတ်မည်'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div
          role="group"
          aria-label={currentLang === 'en' ? 'Filter Gemini Apps' : 'Gemini Apps စစ်ထုတ်ရန်'}
          className="flex items-center space-x-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80 text-xs font-semibold"
        >
          <button
            id="filter-all-gems-btn"
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'All Gems' : 'အားလုံး'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 ml-1">
              {GEMINI_APPS.length}
            </span>
          </button>

          <button
            id="filter-workflow-gems-btn"
            onClick={() => setFilter('workflow')}
            className={`flex-1 py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              filter === 'workflow'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Workflow' : 'Workflow ကဏ္ဍများ'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 ml-1">
              3
            </span>
          </button>

          <button
            id="filter-reference-gems-btn"
            onClick={() => setFilter('reference')}
            className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              filter === 'reference'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="truncate">{currentLang === 'en' ? 'Visuals' : 'Visuals'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 ml-0.5">
              3
            </span>
          </button>

          <button
            id="filter-audio-gems-btn"
            onClick={() => setFilter('audio')}
            className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              filter === 'audio'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="truncate">{currentLang === 'en' ? 'Audio & BGM' : 'တေးဂီတ/BGM'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 ml-0.5">
              1
            </span>
          </button>
        </div>

        {/* List of Apps */}
        <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
          {displayedApps.map((app) => {
            const isCopied = copiedId === app.id;
            
            const accentClasses = {
              indigo: {
                box: 'border-indigo-500/30 hover:border-indigo-500/60 bg-indigo-950/20',
                badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
                launchBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white',
              },
              emerald: {
                box: 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/20',
                badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
                launchBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
              },
              cyan: {
                box: 'border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-950/20',
                badge: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
                launchBtn: 'bg-cyan-600 hover:bg-cyan-500 text-white',
              },
              purple: {
                box: 'border-purple-500/30 hover:border-purple-500/60 bg-purple-950/20',
                badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
                launchBtn: 'bg-purple-600 hover:bg-purple-500 text-white',
              },
              amber: {
                box: 'border-amber-500/30 hover:border-amber-500/60 bg-amber-950/20',
                badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
                launchBtn: 'bg-amber-600 hover:bg-amber-500 text-white',
              },
              teal: {
                box: 'border-teal-500/30 hover:border-teal-500/60 bg-teal-950/20',
                badge: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
                launchBtn: 'bg-teal-600 hover:bg-teal-500 text-white',
              },
              rose: {
                box: 'border-rose-500/30 hover:border-rose-500/60 bg-rose-950/20',
                badge: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
                launchBtn: 'bg-rose-600 hover:bg-rose-500 text-white',
              },
            }[app.accentColor] || {
              box: 'border-slate-800 bg-slate-900/40',
              badge: 'bg-slate-800 text-slate-300',
              launchBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white',
            };

            const tagLabel = currentLang === 'en' ? app.tagEn : app.tagMy;

            return (
              <div
                key={app.id}
                className={`p-4 rounded-xl border ${accentClasses.box} transition-all duration-200 space-y-3`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-0.5">{app.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${accentClasses.badge}`}>
                          {tagLabel}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {currentLang === 'en' ? app.titleEn : app.titleMy}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {currentLang === 'en' ? app.subtitleEn : app.subtitleMy}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
                    <button
                      onClick={() => handleCopy(app)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition flex items-center space-x-1 cursor-pointer"
                      title={currentLang === 'en' ? 'Copy Link' : 'လင့်ခ် ကူးယူပါ'}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px] text-emerald-300 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold shadow transition cursor-pointer ${accentClasses.launchBtn}`}
                    >
                      <span>{currentLang === 'en' ? 'Launch' : 'ဖွင့်မည်'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                  <button
                    onClick={() => handleJumpToTab(app.tabKey)}
                    className="text-slate-400 hover:text-indigo-300 flex items-center space-x-1 transition cursor-pointer"
                  >
                    <span>
                      {app.category === 'workflow'
                        ? currentLang === 'en'
                          ? `Go to Block ${app.blockNumber} Guide`
                          : `Block ${app.blockNumber} လမ်းညွှန်သို့`
                        : app.category === 'audio_bgm'
                        ? currentLang === 'en'
                          ? 'Go to Block 4 (Assembly & Audio) Guide'
                          : 'Block 4 (Audio & Assembly) လမ်းညွှန်သို့'
                        : currentLang === 'en'
                        ? `Open Related Guide (${app.tabKey.toUpperCase()})`
                        : `${app.tabKey.toUpperCase()} လမ်းညွှန်သို့`}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <span className="text-slate-500 font-mono truncate max-w-[200px] sm:max-w-xs">
                    {app.url}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              {currentLang === 'en'
                ? 'Tip: Use the Visual Reference gems to establish consistent cartoon styles or photo-real product packshots.'
                : 'အကြံပြုချက်: ကာတွန်းပုံစံများနှင့် ကုန်ပစ္စည်း Packshot များ တသမတ်တည်းဖြစ်စေရန် Visual Reference Gems များကို အသုံးပြုပါ။'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
