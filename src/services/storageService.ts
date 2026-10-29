import { Objective, ObjectiveFormData } from '../types/objective';

const STORAGE_KEY = '@studyflow:objectives_v1';

const INITIAL_DEMO_OBJECTIVES: Objective[] = [
  {
    id: 'demo-1',
    title: 'Aprender os Fundamentos de Algoritmos',
    description: 'Compreender variáveis, laços de repetição (loops) e estruturas condicionais praticando com exercícios simples.',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Revisar Técnicas de Estudo e Pomodoro',
    description: 'Ler sobre a técnica Pomodoro e configurar blocos de 25 minutos de foco para manter a consistência diária.',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'nao_iniciado',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Criar Cronograma Semanal de Estudos',
    description: 'Definir horários fixos de segunda a sexta-feira para estudar com tranquilidade e sem pressa.',
    deadline: new Date().toISOString().split('T')[0],
    status: 'concluido',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const storageService = {
  /**
   * Obtém a lista de objetivos salva no localStorage.
   * Se for a primeira vez que o usuário acessa, insere exemplos acolhedores.
   */
  getObjectives(): Objective[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Inicializa com dados amigáveis de exemplo na primeira visita
        this.saveObjectives(INITIAL_DEMO_OBJECTIVES);
        return INITIAL_DEMO_OBJECTIVES;
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista de objetivos no localStorage.
   */
  saveObjectives(objectives: Objective[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  /**
   * Cria um novo objetivo de estudo e persiste.
   */
  addObjective(data: ObjectiveFormData): Objective {
    const currentList = this.getObjectives();
    const newObjective: Objective = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: data.title.trim(),
      description: data.description.trim(),
      deadline: data.deadline,
      status: data.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedList = [newObjective, ...currentList];
    this.saveObjectives(updatedList);
    return newObjective;
  },

  /**
   * Atualiza um objetivo existente.
   */
  updateObjective(id: string, data: Partial<ObjectiveFormData>): Objective | null {
    const currentList = this.getObjectives();
    const index = currentList.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const existing = currentList[index];
    const updated: Objective = {
      ...existing,
      ...data,
      title: data.title !== undefined ? data.title.trim() : existing.title,
      description: data.description !== undefined ? data.description.trim() : existing.description,
      updatedAt: new Date().toISOString(),
    };

    currentList[index] = updated;
    this.saveObjectives(currentList);
    return updated;
  },

  /**
   * Exclui um objetivo do armazenamento.
   */
  deleteObjective(id: string): boolean {
    const currentList = this.getObjectives();
    const filteredList = currentList.filter((item) => item.id !== id);

    if (filteredList.length === currentList.length) {
      return false;
    }

    this.saveObjectives(filteredList);
    return true;
  },
};
