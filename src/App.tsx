/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { OverviewTab } from './components/OverviewTab';
import { CharacterSheetTab } from './components/CharacterSheetTab';
import { LocationSheetTab } from './components/LocationSheetTab';
import { StoryboardBlueprintTab } from './components/StoryboardBlueprintTab';
import { AssemblyTab } from './components/AssemblyTab';
import { CalculatorTab } from './components/CalculatorTab';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { GeminiAppsModal } from './components/GeminiAppsModal';
import { Language, TabType } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        setLanguage={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGeminiModal={() => setGeminiModalOpen(true)}
      />

      {/* Main Workflow Tabs Navigation */}
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
      />

      {/* Main Content Area */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <OverviewTab
            currentLang={currentLang}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'block1' && (
          <CharacterSheetTab
            currentLang={currentLang}
            onCopySuccess={showToast}
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
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Quick Access Modal for Official Gemini Mini Apps */}
      <GeminiAppsModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        currentLang={currentLang}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onCopySuccess={showToast}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} />
    </div>
  );
}
