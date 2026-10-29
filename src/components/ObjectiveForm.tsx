import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X, Calendar, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Objective, ObjectiveFormData, ObjectiveStatus } from '../types/objective';
import { STATUS_LABELS } from '../utils/dateHelpers';

interface ObjectiveFormProps {
  onSubmit: (data: ObjectiveFormData) => void;
  onCancelEdit?: () => void;
  editingObjective?: Objective | null;
}

export const ObjectiveForm: React.FC<ObjectiveFormProps> = ({
  onSubmit,
  onCancelEdit,
  editingObjective,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ObjectiveStatus>('nao_iniciado');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Preenche o formulário se estiver em modo de edição
  useEffect(() => {
    if (editingObjective) {
      setTitle(editingObjective.title);
      setDescription(editingObjective.description || '');
      setDeadline(editingObjective.deadline || '');
      setStatus(editingObjective.status);
      setErrorMessage(null);
    } else {
      resetForm();
    }
  }, [editingObjective]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setStatus('nao_iniciado');
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Por favor, informe o título do seu objetivo de estudo.');
      return;
    }

    setErrorMessage(null);
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline,
      status,
    });

    if (!editingObjective) {
      resetForm();
    }
  };

  // Atalhos rápidos para preenchimento de prazo
  const setQuickDeadline = (daysFromToday: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromToday);
    setDeadline(target.toISOString().split('T')[0]);
  };

  return (
    <div
      id="objective-form-section"
      className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 shadow-xs ${
        editingObjective
          ? 'border-indigo-400 ring-2 ring-indigo-100'
          : 'border-stone-200'
      }`}
    >
      {/* Cabeçalho do Formulário */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl ${
              editingObjective
                ? 'bg-amber-100 text-amber-800'
                : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {editingObjective ? (
              <Save className="w-5 h-5" />
            ) : (
              <PlusCircle className="w-5 h-5" />
            )}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              {editingObjective ? 'Editar Objetivo de Estudo' : 'Cadastrar Novo Objetivo'}
            </h2>
            <p className="text-xs text-stone-500">
              {editingObjective
                ? 'Modifique os detalhes abaixo e clique em salvar alterações'
                : 'Defina o que você quer aprender com clareza e metas atingíveis'}
            </p>
          </div>
        </div>

        {editingObjective && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-1.5 rounded-lg transition-colors"
            title="Cancelar edição"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Alerta de erro de validação */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Título */}
        <div>
          <label
            htmlFor="title"
            className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
          >
            Título do Objetivo <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Ex: Dominar Funções e Arrays no JavaScript"
            className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Campo Descrição */}
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
          >
            Descrição / O que você vai fazer? <span className="text-stone-400 font-normal lowercase">(opcional)</span>
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Assistir aulas 1 a 4, fazer anotações no caderno e resolver 10 exercícios práticos da lista."
            className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y min-h-[75px]"
          />
        </div>

        {/* Grid: Prazo e Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prazo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="deadline"
                className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                Prazo de Conclusão
              </label>
            </div>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {/* Atalhos rápidos de data */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[11px] text-stone-500">
              <span className="text-stone-400">Atalhos:</span>
              <button
                type="button"
                onClick={() => setQuickDeadline(0)}
                className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              >
                Hoje
              </button>
              <button
                type="button"
                onClick={() => setQuickDeadline(7)}
                className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              >
                +7 dias
              </button>
              <button
                type="button"
                onClick={() => setQuickDeadline(15)}
                className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              >
                +15 dias
              </button>
              {deadline && (
                <button
                  type="button"
                  onClick={() => setDeadline('')}
                  className="px-2 py-0.5 rounded text-stone-400 hover:text-stone-600 transition-colors ml-auto"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
            >
              Status Atual
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ObjectiveStatus)}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            >
              <option value="nao_iniciado">🟡 {STATUS_LABELS.nao_iniciado}</option>
              <option value="em_andamento">🔵 {STATUS_LABELS.em_andamento}</option>
              <option value="concluido">🟢 {STATUS_LABELS.concluido}</option>
            </select>
            <p className="text-[11px] text-stone-400 mt-2">
              Você pode mudar o status a qualquer momento nos cartões
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="pt-3 border-t border-stone-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
          {editingObjective && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors text-center"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {editingObjective ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Salvar Alterações
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                Cadastrar Objetivo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
