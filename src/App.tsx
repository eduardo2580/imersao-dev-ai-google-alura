import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { ObjectiveForm } from './components/ObjectiveForm';
import { ObjectiveList } from './components/ObjectiveList';
import { ConfirmModal } from './components/ConfirmModal';
import { storageService } from './services/storageService';
import { Objective, ObjectiveFormData, ObjectiveStatus } from './types/objective';
import { Heart, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [editingObjective, setEditingObjective] = useState<Objective | null>(null);
  const [objectiveToDelete, setObjectiveToDelete] = useState<Objective | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Carrega os objetivos ao inicializar a página a partir do localStorage
  useEffect(() => {
    const loaded = storageService.getObjectives();
    setObjectives(loaded);
  }, []);

  // Exibe toast temporário de feedback
  const showNotification = useCallback((message: string) => {
    setNotification(message);
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Cadastra novo objetivo ou salva edição
  const handleFormSubmit = (data: ObjectiveFormData) => {
    if (editingObjective) {
      // Edição
      const updated = storageService.updateObjective(editingObjective.id, data);
      if (updated) {
        setObjectives((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        showNotification('Objetivo atualizado com sucesso!');
      }
      setEditingObjective(null);
    } else {
      // Criação
      const created = storageService.addObjective(data);
      setObjectives((prev) => [created, ...prev]);
      showNotification('Novo objetivo cadastrado com sucesso!');
    }
  };

  // Inicia edição e rola suavemente até o formulário
  const handleEditRequest = (objective: Objective) => {
    setEditingObjective(objective);
    const formElement = document.getElementById('objective-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Cancela o modo de edição
  const handleCancelEdit = () => {
    setEditingObjective(null);
  };

  // Abre o modal de confirmação para exclusão
  const handleDeleteRequest = (objective: Objective) => {
    setObjectiveToDelete(objective);
  };

  // Confirma e remove o objetivo
  const handleConfirmDelete = () => {
    if (objectiveToDelete) {
      const removedId = objectiveToDelete.id;
      const success = storageService.deleteObjective(removedId);
      if (success) {
        setObjectives((prev) => prev.filter((item) => item.id !== removedId));
        showNotification('Objetivo excluído com sucesso.');
      }
      // Se estava editando o item excluído, sai do modo edição
      if (editingObjective?.id === removedId) {
        setEditingObjective(null);
      }
      setObjectiveToDelete(null);
    }
  };

  // Altera rapidamente o status pelo card
  const handleStatusChange = (id: string, newStatus: ObjectiveStatus) => {
    const updated = storageService.updateObjective(id, { status: newStatus });
    if (updated) {
      setObjectives((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );

      const statusMessages: Record<ObjectiveStatus, string> = {
        nao_iniciado: 'Objetivo marcado como não iniciado.',
        em_andamento: 'Objetivo iniciado! Bom foco nos estudos.',
        concluido: 'Parabéns! Mais um objetivo concluído!',
      };
      showNotification(statusMessages[newStatus]);
    }
  };

  const handleCreateNewRequest = () => {
    setEditingObjective(null);
    const formElement = document.getElementById('objective-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const titleInput = document.getElementById('title');
      if (titleInput) {
        titleInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Cabeçalho */}
      <Header />

      {/* Notificação Toast Flutuante */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-fade-in border border-stone-800">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{notification}</span>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Banner de Boas-Vindas & Foco Educacional */}
        <div className="mb-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-indigo-200 border border-white/10 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Ambiente de Estudos Sem Distrações
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Transforme grandes sonhos em passos diários.
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 mt-2 leading-relaxed">
              O segredo do aprendizado consistente não é estudar tudo de uma vez, mas manter metas claras, prazos realistas e comemorar cada conquista.
            </p>
          </div>
          {/* Elemento visual de fundo sutil */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Resumo e Quantidade de Objetivos */}
        <StatsOverview objectives={objectives} />

        {/* Formulário de Cadastro e Edição */}
        <ObjectiveForm
          onSubmit={handleFormSubmit}
          onCancelEdit={handleCancelEdit}
          editingObjective={editingObjective}
        />

        {/* Listagem de Objetivos em Cartões */}
        <ObjectiveList
          objectives={objectives}
          onEdit={handleEditRequest}
          onDeleteRequest={handleDeleteRequest}
          onStatusChange={handleStatusChange}
          onCreateNewRequest={handleCreateNewRequest}
        />
      </main>

      {/* Modal de Confirmação para Exclusão */}
      <ConfirmModal
        isOpen={Boolean(objectiveToDelete)}
        objective={objectiveToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setObjectiveToDelete(null)}
      />

      {/* Rodapé Acolhedor */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center justify-center gap-1.5">
            <span>StudyFlow • Feito com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para impulsionar seus estudos</span>
          </p>
          <p className="text-[11px] text-stone-400">
            Seus dados ficam salvos com segurança diretamente no seu navegador.
          </p>
        </div>
      </footer>
    </div>
  );
}
