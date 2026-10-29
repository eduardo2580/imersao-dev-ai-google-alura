export type ObjectiveStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface Objective {
  id: string;
  title: string;
  description: string;
  deadline: string; // Formato YYYY-MM-DD
  status: ObjectiveStatus;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

export type ObjectiveFormData = {
  title: string;
  description: string;
  deadline: string;
  status: ObjectiveStatus;
};

export type ObjectiveFilter = 'todos' | ObjectiveStatus;
