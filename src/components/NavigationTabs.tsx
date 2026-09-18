import React from 'react';
import { TabType, Language } from '../types';
import { translations } from '../data/translations';

interface NavigationTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentLang: Language;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  currentLang,
}) => {
  const t = translations[currentLang];

  const tabs: { id: TabType; icon: string; label: string }[] = [
    { id: 'overview', icon: '📌', label: t.tab_overview },
    { id: 'block1', icon: '👤', label: t.tab_character },
    { id: 'block2', icon: '🏢', label: t.tab_location },
    { id: 'block3', icon: '📋', label: t.tab_blueprint },
    { id: 'block4', icon: '🎬', label: t.tab_assembly },
    { id: 'calculator', icon: '⚡', label: t.tab_calculator },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-slate-900/70 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 sticky top-[57px] z-40 backdrop-blur-md overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex space-x-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => handleTabClick(tab.id)}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
