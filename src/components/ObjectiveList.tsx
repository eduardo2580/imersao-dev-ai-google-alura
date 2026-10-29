import React, { useState, useMemo } from 'react';
import { Objective, ObjectiveFilter, ObjectiveStatus } from '../types/objective';
import { ObjectiveCard } from './ObjectiveCard';
import { EmptyState } from './EmptyState';
import { Filters } from './Filters';
import { LayoutGrid, ArrowDownUp } from 'lucide-react';

interface ObjectiveListProps {
  objectives: Objective[];
  onEdit: (objective: Objective) => void;
  onDeleteRequest: (objective: Objective) => void;
  onStatusChange: (id: string, newStatus: ObjectiveStatus) => void;
  onCreateNewRequest: () => void;
}

export const ObjectiveList: React.FC<ObjectiveListProps> = ({
  objectives,
  onEdit,
  onDeleteRequest,
  onStatusChange,
  onCreateNewRequest,
}) => {
  const [filter, setFilter] = useState<ObjectiveFilter>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'deadline' | 'recent'>('deadline');

  // Contagens para os botões de filtro
  const counts = useMemo(() => {
    return {
      todos: objectives.length,
      nao_iniciado: objectives.filter((o) => o.status === 'nao_iniciado').length,
      em_andamento: objectives.filter((o) => o.status === 'em_andamento').length,
      concluido: objectives.filter((o) => o.status === 'concluido').length,
    };
  }, [objectives]);

  // Filtragem e busca
  const filteredObjectives = useMemo(() => {
    return objectives
      .filter((obj) => {
        // Filtro por status
        if (filter !== 'todos' && obj.status !== filter) {
          return false;
        }

        // Busca textual no título ou descrição
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchTitle = obj.title.toLowerCase().includes(term);
          const matchDesc = obj.description?.toLowerCase().includes(term);
          return matchTitle || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          // Objetivos sem data vão para o final
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return a.deadline.localeCompare(b.deadline);
        } else {
          // Mais recentes primeiro
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        }
      });
  }, [objectives, filter, searchTerm, sortBy]);

  // Se o usuário não tem nenhum objetivo cadastrado no total
  if (objectives.length === 0) {
    return <EmptyState onCreateNew={onCreateNewRequest} />;
  }

  return (
    <section className="mt-8">
      {/* Cabeçalho da Lista e Controles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200/80 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-stone-900">
            Seus Objetivos de Estudo
          </h2>
          <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-semibold">
            {filteredObjectives.length} {filteredObjectives.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {/* Ordenador */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 self-end sm:self-auto">
          <ArrowDownUp className="w-3.5 h-3.5" />
          <span>Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'deadline' | 'recent')}
            className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs text-stone-800 font-medium focus:outline-none focus:border-indigo-400"
          >
            <option value="deadline">Prazo mais próximo</option>
            <option value="recent">Mais recentes</option>
          </select>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <Filters
        currentFilter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        counts={counts}
      />

      {/* Resultados da Listagem */}
      {filteredObjectives.length === 0 ? (
        <EmptyState
          isFiltered={true}
          onClearFilters={() => {
            setFilter('todos');
            setSearchTerm('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredObjectives.map((obj) => (
            <ObjectiveCard
              key={obj.id}
              objective={obj}
              onEdit={onEdit}
              onDeleteRequest={onDeleteRequest}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
};
