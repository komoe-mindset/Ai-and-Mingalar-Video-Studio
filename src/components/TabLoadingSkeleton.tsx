import React from 'react';

export const TabLoadingSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading content..."
      className="space-y-6 max-w-7xl mx-auto w-full animate-pulse py-2"
    >
      {/* Skeleton Top Banner / Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-slate-900/40 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-5 w-28 bg-slate-800 rounded-full" />
          <div className="h-5 w-16 bg-slate-800/70 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-8 w-3/4 max-w-md bg-slate-800 rounded-lg" />
          <div className="h-4 w-full max-w-xl bg-slate-800/60 rounded-md" />
        </div>
      </div>

      {/* Skeleton Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-slate-900/30 space-y-4 min-h-[220px]">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-slate-800 rounded-md" />
            <div className="h-6 w-6 bg-slate-800 rounded-full" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-800/50 rounded" />
            <div className="h-4 w-5/6 bg-slate-800/40 rounded" />
            <div className="h-4 w-2/3 bg-slate-800/30 rounded" />
          </div>
          <div className="pt-4 flex justify-end">
            <div className="h-8 w-24 bg-slate-800/70 rounded-lg" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-slate-900/30 space-y-4 min-h-[220px]">
          <div className="flex items-center justify-between">
            <div className="h-6 w-28 bg-slate-800 rounded-md" />
            <div className="h-6 w-6 bg-slate-800 rounded-full" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-800/50 rounded" />
            <div className="h-4 w-4/5 bg-slate-800/40 rounded" />
            <div className="h-4 w-3/4 bg-slate-800/30 rounded" />
          </div>
          <div className="pt-4 flex justify-end">
            <div className="h-8 w-24 bg-slate-800/70 rounded-lg" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-slate-900/30 space-y-4 min-h-[220px] md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="h-6 w-20 bg-slate-800 rounded-md" />
            <div className="h-6 w-6 bg-slate-800 rounded-full" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-800/50 rounded" />
            <div className="h-4 w-3/4 bg-slate-800/40 rounded" />
            <div className="h-4 w-1/2 bg-slate-800/30 rounded" />
          </div>
          <div className="pt-4 flex justify-end">
            <div className="h-8 w-24 bg-slate-800/70 rounded-lg" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading tab content...</span>
    </div>
  );
};
