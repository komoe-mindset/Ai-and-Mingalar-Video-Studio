import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = React.memo(({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 text-xs sm:text-sm font-medium border border-emerald-400/40"
    >
      <CheckCircle className="w-5 h-5 text-white shrink-0" />
      <span>{message}</span>
    </div>
  );
});
