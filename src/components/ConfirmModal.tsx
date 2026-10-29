import React, { useEffect } from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';
import { Objective } from '../types/objective';

interface ConfirmModalProps {
  isOpen: boolean;
  objective: Objective | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  objective,
  onConfirm,
  onCancel,
}) => {
  // Fecha com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !objective) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-start justify-between gap-3">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <AlertCircle className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-1.5 rounded-lg transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensagem e detalhes */}
        <div className="mt-4">
          <h3
            id="confirm-modal-title"
            className="text-lg font-bold text-stone-900"
          >
            Excluir objetivo de estudo?
          </h3>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Você tem certeza de que deseja excluir o objetivo:{' '}
            <span className="font-semibold text-stone-800 break-words">
              "{objective.title}"
            </span>
            ? Esta ação removerá o objetivo e não poderá ser desfeita.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar e manter
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-xs shadow-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Sim, excluir objetivo
          </button>
        </div>
      </div>
    </div>
  );
};
