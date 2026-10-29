import React from 'react';
import { Target, Clock, CheckCircle2, ListOrdered, Award } from 'lucide-react';
import { Objective } from '../types/objective';

interface StatsOverviewProps {
  objectives: Objective[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ objectives }) => {
  const total = objectives.length;
  const naoIniciados = objectives.filter((item) => item.status === 'nao_iniciado').length;
  const emAndamento = objectives.filter((item) => item.status === 'em_andamento').length;
  const concluidos = objectives.filter((item) => item.status === 'concluido').length;

  const progressPercentage = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs transition-all mb-8">
      {/* Cabeçalho da Seção de Quantidades */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
            <ListOrdered className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-stone-900">
              Resumo dos seus Estudos
            </h2>
            <p className="text-xs text-stone-500">
              Acompanhamento geral de metas e progresso de aprendizado
            </p>
          </div>
        </div>

        {/* Indicador de progresso */}
        {total > 0 && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold">
              {progressPercentage}% concluído
            </span>
          </div>
        )}
      </div>

      {/* Grid de Contadores / Quantidades */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
        {/* Total de Objetivos */}
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/70 hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Cadastrados</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-stone-900">{total}</span>
            <span className="text-xs text-stone-500">
              {total === 1 ? 'objetivo' : 'objetivos'}
            </span>
          </div>
        </div>

        {/* Em Andamento */}
        <div className="bg-sky-50/60 rounded-xl p-3.5 border border-sky-100 hover:border-sky-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-sky-800">Em andamento</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-sky-950">{emAndamento}</span>
            <span className="text-xs text-sky-700">em foco</span>
          </div>
        </div>

        {/* Não Iniciados */}
        <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-100 hover:border-amber-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-800">Não iniciados</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-amber-950">{naoIniciados}</span>
            <span className="text-xs text-amber-700">na fila</span>
          </div>
        </div>

        {/* Concluídos */}
        <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-100 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-800">Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-emerald-950">{concluidos}</span>
            <span className="text-xs text-emerald-700">finalizados</span>
          </div>
        </div>
      </div>

      {/* Barra de Progresso */}
      {total > 0 && (
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex justify-between items-center text-xs text-stone-500 mb-1.5">
            <span>Rendimento dos estudos</span>
            <span className="font-medium text-stone-700">{concluidos} de {total} metas concluídas</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
