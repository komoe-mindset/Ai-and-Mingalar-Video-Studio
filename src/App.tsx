/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  startTransition,
  lazy,
} from 'react';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { GeminiAppsModal } from './components/GeminiAppsModal';
import { MasterPromptModal } from './components/MasterPromptModal';
import { TabLoadingSkeleton } from './components/TabLoadingSkeleton';
import { Language, TabType } from './types';

// Code-split heavy tab views with React.lazy() to optimize bundle size, LCP, and INP scores
const OverviewTab = lazy(() =>
  import('./components/OverviewTab').then((module) => ({ default: module.OverviewTab }))
);
const CharacterSheetTab = lazy(() =>
  import('./components/CharacterSheetTab').then((module) => ({ default: module.CharacterSheetTab }))
);
const LocationSheetTab = lazy(() =>
  import('./components/LocationSheetTab').then((module) => ({ default: module.LocationSheetTab }))
);
const StoryboardBlueprintTab = lazy(() =>
  import('./components/StoryboardBlueprintTab').then((module) => ({ default: module.StoryboardBlueprintTab }))
);
const AssemblyTab = lazy(() =>
  import('./components/AssemblyTab').then((module) => ({ default: module.AssemblyTab }))
);
const CalculatorTab = lazy(() =>
  import('./components/CalculatorTab').then((module) => ({ default: module.CalculatorTab }))
);

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);
  const [masterPromptModalOpen, setMasterPromptModalOpen] = useState(false);
  const [masterPromptMode, setMasterPromptMode] = useState<'full' | 'stage1'>('full');

  // Debounced toast timer ref to prevent memory leaks during rapid copy actions
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // Idle background prefetching for remaining tab chunks to keep INP near 0ms
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleCallbackId = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        import('./components/CharacterSheetTab');
        import('./components/LocationSheetTab');
        import('./components/StoryboardBlueprintTab');
        import('./components/AssemblyTab');
        import('./components/CalculatorTab');
      });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleCallbackId);
        }
      };
    }
  }, []);

  // Memoized handlers to eliminate unnecessary re-renders of memoized Header, NavigationTabs, and Modal
  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const handleSelectTab = useCallback((tab: TabType) => {
    // Wrap state update in startTransition to prioritize user input responsiveness (optimizing INP)
    startTransition(() => {
      setActiveTab(tab);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenGeminiModal = useCallback(() => {
    setGeminiModalOpen(true);
  }, []);

  const handleCloseGeminiModal = useCallback(() => {
    setGeminiModalOpen(false);
  }, []);

  const handleOpenMasterPrompt = useCallback((mode: 'full' | 'stage1' = 'full') => {
    setMasterPromptMode(mode);
    setMasterPromptModalOpen(true);
  }, []);

  const handleCloseMasterPrompt = useCallback(() => {
    setMasterPromptModalOpen(false);
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setCurrentLang(lang);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        setLanguage={handleSetLanguage}
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        onOpenGeminiModal={handleOpenGeminiModal}
        onOpenMasterPrompt={() => handleOpenMasterPrompt('full')}
      />

      {/* Main Workflow Tabs Navigation */}
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        currentLang={currentLang}
      />

      {/* Main Content Area with React.Suspense Fallback Skeleton */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="outline-none"
        >
          <React.Suspense fallback={<TabLoadingSkeleton />}>
            {activeTab === 'overview' && (
              <OverviewTab
                currentLang={currentLang}
                onSelectTab={handleSelectTab}
              />
            )}

            {activeTab === 'block1' && (
              <CharacterSheetTab
                currentLang={currentLang}
                onCopySuccess={showToast}
                onOpenMasterPrompt={handleOpenMasterPrompt}
              />
            )}

            {activeTab === 'block2' && (
              <LocationSheetTab
                currentLang={currentLang}
                onCopySuccess={showToast}
              />
            )}

            {activeTab === 'block3' && (
              <StoryboardBlueprintTab
                currentLang={currentLang}
                onCopySuccess={showToast}
              />
            )}

            {activeTab === 'block4' && (
              <AssemblyTab
                currentLang={currentLang}
                onCopySuccess={showToast}
              />
            )}

            {activeTab === 'calculator' && (
              <CalculatorTab
                currentLang={currentLang}
              />
            )}
          </React.Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Quick Access Modal for Official Gemini Mini Apps */}
      <GeminiAppsModal
        isOpen={geminiModalOpen}
        onClose={handleCloseGeminiModal}
        currentLang={currentLang}
        onSelectTab={handleSelectTab}
        onCopySuccess={showToast}
      />

      {/* AI Commercial Creative Director Master Prompt Modal for ChatGPT & Claude */}
      <MasterPromptModal
        isOpen={masterPromptModalOpen}
        onClose={handleCloseMasterPrompt}
        currentLang={currentLang}
        onCopySuccess={showToast}
        initialMode={masterPromptMode}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} />
    </div>
  );
}
