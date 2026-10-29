import React from 'react';
import { Compass, Sparkles, Plus, SearchX } from 'lucide-react';

interface EmptyStateProps {
  isFiltered?: boolean;
  onClearFilters?: () => void;
  onCreateNew?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered = false,
  onClearFilters,
  onCreateNew,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center max-w-md mx-auto my-6 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 mx-auto flex items-center justify-center mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900">
          Nenhum objetivo encontrado
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed">
          Não encontramos objetivos que correspondam ao filtro ou busca selecionados.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
          >
            Limpar filtros e ver todos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4 shadow-inner">
        <Compass className="w-8 h-8 stroke-[1.8]" />
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        Sua jornada começa aqui
      </div>
      <h3 className="text-lg font-bold text-stone-900">
        Nenhum objetivo cadastrado ainda
      </h3>
      <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed max-w-sm mx-auto">
        Todo grande aprendizado começa com um primeiro passo simples. Cadastre agora o que você deseja estudar nesta semana!
      </p>

      {onCreateNew && (
        <button
          type="button"
          onClick={onCreateNew}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shadow-indigo-200 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Criar meu primeiro objetivo
        </button>
      )}
    </div>
  );
};
