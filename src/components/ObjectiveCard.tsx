import React from 'react';
import {
  Calendar,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PlayCircle,
  RotateCcw,
} from 'lucide-react';
import { Objective, ObjectiveStatus } from '../types/objective';
import {
  STATUS_CONFIG,
  formatDate,
  getDeadlineUrgency,
} from '../utils/dateHelpers';

interface ObjectiveCardProps {
  objective: Objective;
  onEdit: (objective: Objective) => void;
  onDeleteRequest: (objective: Objective) => void;
  onStatusChange: (id: string, newStatus: ObjectiveStatus) => void;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  objective,
  onEdit,
  onDeleteRequest,
  onStatusChange,
}) => {
  const isCompleted = objective.status === 'concluido';
  const statusInfo = STATUS_CONFIG[objective.status];
  const urgency = getDeadlineUrgency(objective.deadline, isCompleted);

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-200 p-5 shadow-xs hover:shadow-md flex flex-col justify-between ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/20'
          : urgency.isOverdue
          ? 'border-rose-200'
          : 'border-stone-200 hover:border-indigo-200'
      }`}
    >
      <div>
        {/* Cabeçalho do Card: Badge de Status e Ações */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.bgClass} ${statusInfo.textClass} ${statusInfo.borderClass}`}
          >
            <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`} />
            {statusInfo.label}
          </span>

          <div className="flex items-center gap-1 opacity-90 sm:opacity-75 sm:group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onEdit(objective)}
              title="Editar este objetivo"
              className="p-1.5 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDeleteRequest(objective)}
              title="Excluir este objetivo"
              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`text-base font-bold text-stone-900 leading-snug break-words ${
            isCompleted ? 'line-through text-stone-500' : ''
          }`}
        >
          {objective.title}
        </h3>

        {/* Descrição do Objetivo */}
        {objective.description ? (
          <p
            className={`text-xs sm:text-sm text-stone-600 mt-2 whitespace-pre-line leading-relaxed ${
              isCompleted ? 'text-stone-400' : ''
            }`}
          >
            {objective.description}
          </p>
        ) : (
          <p className="text-xs italic text-stone-400 mt-2">
            Nenhuma descrição adicional informada.
          </p>
        )}
      </div>

      {/* Rodapé do Card: Prazo e Botões de Ação Rápida */}
      <div className="mt-5 pt-3.5 border-t border-stone-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Informações de Prazo */}
        <div className="flex items-center gap-2 text-xs">
          <Calendar
            className={`w-3.5 h-3.5 ${
              urgency.isOverdue
                ? 'text-rose-500'
                : urgency.isToday
                ? 'text-amber-500'
                : 'text-stone-400'
            }`}
          />
          <span
            className={`font-medium ${
              urgency.isOverdue
                ? 'text-rose-700 font-semibold'
                : urgency.isToday
                ? 'text-amber-700 font-semibold'
                : 'text-stone-600'
            }`}
          >
            {formatDate(objective.deadline)}
          </span>

          {/* Tag de Urgência do Prazo */}
          {urgency.text && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-medium ${
                urgency.isOverdue
                  ? 'bg-rose-100 text-rose-800'
                  : urgency.isToday
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {urgency.isOverdue && <AlertTriangle className="w-3 h-3 text-rose-600" />}
              {urgency.text}
            </span>
          )}
        </div>

        {/* Transições Rápidas de Status para o Estudante */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {objective.status === 'nao_iniciado' && (
            <button
              type="button"
              onClick={() => onStatusChange(objective.id, 'em_andamento')}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 transition-colors cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 text-sky-600" />
              Iniciar
            </button>
          )}

          {objective.status === 'em_andamento' && (
            <button
              type="button"
              onClick={() => onStatusChange(objective.id, 'concluido')}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Concluir
            </button>
          )}

          {objective.status === 'concluido' && (
            <button
              type="button"
              onClick={() => onStatusChange(objective.id, 'em_andamento')}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              title="Voltar para em andamento"
            >
              <RotateCcw className="w-3 h-3" />
              Reabrir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
