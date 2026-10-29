import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  // Capitaliza a primeira letra do dia da semana
  const capitalizedDate = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <BookOpen className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-stone-900">StudyFlow</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Para Estudantes
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Organize o que você deseja aprender no seu próprio ritmo
              </p>
            </div>
          </div>

          {/* Data amigável */}
          <div className="flex items-center text-xs font-medium text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/80 w-fit">
            <span>📅 {capitalizedDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
