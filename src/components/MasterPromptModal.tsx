import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Bot,
  Layers,
  ShieldAlert,
  HelpCircle,
  FileText,
  Workflow,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import {
  FULL_MASTER_PROMPT,
  STAGE1_CHARACTER_SHEET_PROMPT,
  MASTER_PROMPT_STAGES
} from '../data/masterPrompt';

interface MasterPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onCopySuccess: (msg: string) => void;
  initialMode?: 'full' | 'stage1';
}

export const MasterPromptModal: React.FC<MasterPromptModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onCopySuccess,
  initialMode = 'full',
}) => {
  const [mode, setMode] = useState<'full' | 'stage1'>(initialMode);
  const [copied, setCopied] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // WAI-ARIA Focus Trap, Escape listener, and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (
            document.activeElement === lastElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            firstElement.focus();
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

  const currentPromptText = mode === 'full' ? FULL_MASTER_PROMPT : STAGE1_CHARACTER_SHEET_PROMPT;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPromptText);
    setCopied(true);
    const msg =
      currentLang === 'en'
        ? mode === 'full'
          ? 'Creative Director Master Prompt copied to clipboard!'
          : 'Stage 1 Character Sheet Master Prompt copied to clipboard!'
        : mode === 'full'
        ? 'Creative Director Master Prompt ကို ကူးယူပြီးပါပြီ!'
        : 'Stage 1 Character Sheet Prompt ကို ကူးယူပြီးပါပြီ!';
    onCopySuccess(msg);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenChatGPT = () => {
    // Copy prompt first so user can simply paste into ChatGPT
    navigator.clipboard.writeText(currentPromptText);
    setCopied(true);
    onCopySuccess(
      currentLang === 'en'
        ? 'Prompt copied! Opening ChatGPT in a new tab... Press Ctrl+V to paste.'
        : 'Prompt ကို ကူးယူပြီးပါပြီ! ChatGPT ကို ဖွင့်နေပါသည်... စာတိုက်ရိုက် Paste လုပ်ရန် Ctrl+V နှိပ်ပါ။'
    );
    setTimeout(() => setCopied(false), 3000);
    window.open('https://chatgpt.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="master-prompt-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="master-prompt-modal-title"
        aria-describedby="master-prompt-modal-desc"
        tabIndex={-1}
        id="master-prompt-modal-content"
        className="glass-panel border border-emerald-500/40 bg-slate-950/98 max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] relative focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/60 shrink-0">
          <div className="flex items-start space-x-3.5">
            <div
              className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h3
                  id="master-prompt-modal-title"
                  className="text-base sm:text-lg font-bold text-white tracking-tight"
                >
                  {currentLang === 'en'
                    ? 'AI Commercial Creative Director — Master Prompt'
                    : 'AI Commercial Creative Director — Master Prompt စနစ်'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/30">
                  ChatGPT & Claude Mode
                </span>
              </div>
              <p id="master-prompt-modal-desc" className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl">
                {currentLang === 'en'
                  ? 'Turn ChatGPT into an authoritative Commercial Creative Director with strict stage locks for Character Turnarounds, Product Freeze, Location Specs, and Flow AI Agent packaging.'
                  : 'ChatGPT ကို ဇာတ်ကောင်၊ ကုန်ပစ္စည်း၊ နေရာနှင့် Storyboard များကို အဆင့်ဆင့် ထိန်းချုပ်ပေးမည့် Creative Director အဖြစ် ပြောင်းလဲပေးသည့် Master Prompt ဖြစ်ပါသည်။'}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shrink-0"
            aria-label={currentLang === 'en' ? 'Close Master Prompt dialog' : 'ဝင်းဒိုးကို ပိတ်မည်'}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mode Selector & Quick Actions Strip */}
        <div className="px-5 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Mode Switcher */}
          <div
            role="group"
            aria-label="Master prompt format selector"
            className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold"
          >
            <button
              aria-pressed={mode === 'full'}
              onClick={() => setMode('full')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                mode === 'full'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentLang === 'en' ? 'Full 11-Stage Director' : 'အဆင့် ၁၁ ဆင့် Master Prompt'}</span>
            </button>
            <button
              aria-pressed={mode === 'stage1'}
              onClick={() => setMode('stage1')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                mode === 'stage1'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentLang === 'en' ? 'Stage 1 Character Only' : 'Stage 1 Character သီးသန့်'}</span>
            </button>
          </div>

          {/* Quick Launch Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyPrompt}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-300">
                    {currentLang === 'en' ? 'Copied to Clipboard!' : 'ကူးယူပြီးပါပြီ!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{currentLang === 'en' ? 'Copy Prompt' : 'Prompt ကူးယူမည်'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenChatGPT}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-md shadow-emerald-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Bot className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentLang === 'en' ? 'Launch in ChatGPT' : 'ChatGPT တွင် ဖွင့်မည်'}</span>
              <ExternalLink className="w-3 h-3 text-emerald-200" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* How It Works Guide Box */}
          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span>
                {currentLang === 'en'
                  ? 'How to Use with ChatGPT (Quick 3-Step Guide)'
                  : 'ChatGPT တွင် အသုံးပြုပုံ အဆင့်ဆင့်'}
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 space-y-1">
                <span className="font-bold text-white flex items-center space-x-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>{currentLang === 'en' ? 'Paste Master Prompt' : 'Master Prompt ကို ထည့်သွင်းပါ'}</span>
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {currentLang === 'en'
                    ? 'Click "Launch in ChatGPT" or copy the prompt into a fresh ChatGPT chat (GPT-4o or Plus recommended).'
                    : 'Prompt ကို ကူးယူပြီး ChatGPT (GPT-4o အကြံပြုသည်) သစ်တစ်ခုထဲသို့ အစဆုံး ထည့်သွင်းပါ။'}
                </p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 space-y-1">
                <span className="font-bold text-white flex items-center space-x-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>{currentLang === 'en' ? 'Provide Character Image' : 'ဇာတ်ကောင် ဓာတ်ပုံ ပေးပို့ပါ'}</span>
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {currentLang === 'en'
                    ? 'ChatGPT will immediately ask: "Do you already have a character image you want to use?". Upload your reference image.'
                    : 'ChatGPT က ချက်ချင်းမေးပါမည်။ မိမိ အသုံးပြုလိုသော သရုပ်ဆောင် သို့မဟုတ် ဇာတ်ကောင်ပုံကို ပေးပို့ပါ။'}
                </p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 space-y-1">
                <span className="font-bold text-white flex items-center space-x-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>{currentLang === 'en' ? 'Step-by-Step Lock' : 'အဆင့်တိုင်း Lock ချ၍ ထုတ်ယူပါ'}</span>
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {currentLang === 'en'
                    ? 'ChatGPT follows the strict sequential lock: Character Sheet → Product → Location → Script → Storyboard → Flow AI Agent prompt.'
                    : 'ChatGPT က အဆင့်တစ်ခုချင်းစီကို တသွေမတိမ်း သီးသန့်ဆွဲပြီး နောက်ဆုံး Flow AI Agent Prompt အထိ ထုတ်ပေးပါမည်။'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 11-Stage Production Roadmap */}
          {mode === 'full' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                  <span>
                    {currentLang === 'en'
                      ? '11 Production Stages Enforced by this Prompt'
                      : 'ဤ Master Prompt မှ ထိန်းချုပ်ထားသော ထုတ်လုပ်မှုအဆင့် ၁၁ ဆင့်'}
                  </span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  {currentLang === 'en' ? 'Strict Sequential Lock' : 'အဆင့်ကျော်ခွင့်မပြုပါ'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {MASTER_PROMPT_STAGES.map((st, idx) => (
                  <button
                    key={st.stageNumber}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      activeStageIndex === idx
                        ? 'bg-emerald-950/40 border-emerald-500/50 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base" aria-hidden="true">{st.icon}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        Stage {st.stageNumber}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-white mt-1 line-clamp-1">
                      {currentLang === 'en' ? st.titleEn.split(':')[1] || st.titleEn : st.titleMy.split(':')[1] || st.titleMy}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Stage Details Banner */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/30 flex items-start space-x-3 text-xs">
                <span className="text-xl shrink-0" aria-hidden="true">
                  {MASTER_PROMPT_STAGES[activeStageIndex].icon}
                </span>
                <div>
                  <h5 className="font-bold text-white">
                    {currentLang === 'en'
                      ? MASTER_PROMPT_STAGES[activeStageIndex].titleEn
                      : MASTER_PROMPT_STAGES[activeStageIndex].titleMy}
                  </h5>
                  <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                    {currentLang === 'en'
                      ? MASTER_PROMPT_STAGES[activeStageIndex].summaryEn
                      : MASTER_PROMPT_STAGES[activeStageIndex].summaryMy}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Prompt Display Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {mode === 'full'
                  ? currentLang === 'en'
                    ? 'Raw Master Prompt Content (Ready for ChatGPT / Claude)'
                    : 'ChatGPT / Claude သို့ ထည့်သွင်းရမည့် Master Prompt'
                  : currentLang === 'en'
                  ? 'Stage 1 Character Sheet Focus Prompt'
                  : 'Stage 1 Character Sheet သီးသန့် Prompt'}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {currentPromptText.length} characters
              </span>
            </div>

            <div className="relative">
              <pre
                className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800/80 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-[380px] overflow-y-auto whitespace-pre-wrap select-all scrollbar-thin"
                tabIndex={0}
                aria-label="Master prompt text content"
              >
                {currentPromptText}
              </pre>

              <button
                onClick={handleCopyPrompt}
                className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-md transition cursor-pointer flex items-center space-x-1 text-xs"
                aria-label={currentLang === 'en' ? 'Copy prompt to clipboard' : 'Prompt ကို ကူးယူပါ'}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    <span className="text-[11px] text-emerald-300 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Strict Separation Principle Notice */}
          <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-xl flex items-start space-x-3 text-xs text-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-300">
                {currentLang === 'en'
                  ? 'Core Production Principle Enforced:'
                  : 'အဓိက ထုတ်လုပ်မှုစည်းကမ်း:'}
              </span>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                {currentLang === 'en'
                  ? 'The 4 major visual assets (1. Character Reference Sheet, 2. Product Reference Sheet, 3. Location Reference Sheet, 4. Complete Storyboard) must ALWAYS be independent standalone images. ChatGPT will NEVER merge them or jump ahead.'
                  : 'ရုပ်ပုံ ၄ မျိုး (Character Sheet, Product Sheet, Location Sheet, Complete Storyboard) တို့သည် သီးခြားစီသာ ဖြစ်ရပါမည်။ ChatGPT သည် မည်သည့်အခါမျှ အဆင့်ကျော်ခြင်း သို့မဟုတ် ပုံများကို ပေါင်းစပ်ခြင်း မပြုလုပ်ပါ။'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>
              {currentLang === 'en'
                ? 'Compatible with ChatGPT (GPT-4o), Claude 3.5 Sonnet, and Gemini Advanced'
                : 'ChatGPT (GPT-4o)၊ Claude 3.5 Sonnet နှင့် Gemini Advanced တို့တွင် သုံးနိုင်သည်'}
            </span>
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition cursor-pointer"
            >
              {currentLang === 'en' ? 'Close' : 'ပိတ်မည်'}
            </button>
            <button
              onClick={handleOpenChatGPT}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 cursor-pointer"
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
              <span>{currentLang === 'en' ? 'Launch in ChatGPT' : 'ChatGPT တွင် ဖွင့်မည်'}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
