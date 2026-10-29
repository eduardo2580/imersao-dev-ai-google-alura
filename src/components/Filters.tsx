import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ObjectiveFilter } from '../types/objective';

interface FiltersProps {
  currentFilter: ObjectiveFilter;
  onFilterChange: (filter: ObjectiveFilter) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  counts: {
    todos: number;
    nao_iniciado: number;
    em_andamento: number;
    concluido: number;
  };
}

export const Filters: React.FC<FiltersProps> = ({
  currentFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  counts,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
      {/* Abas de Filtro por Status */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <button
          type="button"
          onClick={() => onFilterChange('todos')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentFilter === 'todos'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Todos ({counts.todos})
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('nao_iniciado')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentFilter === 'nao_iniciado'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Não iniciados ({counts.nao_iniciado})
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('em_andamento')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentFilter === 'em_andamento'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Em andamento ({counts.em_andamento})
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('concluido')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentFilter === 'concluido'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Concluídos ({counts.concluido})
        </button>
      </div>

      {/* Campo de Busca Rápida */}
      <div className="relative min-w-[220px]">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar objetivo..."
          className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-stone-400 hover:text-stone-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
