import { ObjectiveStatus } from '../types/objective';

export const STATUS_LABELS: Record<ObjectiveStatus, string> = {
  nao_iniciado: 'Não iniciado',
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
};

export const STATUS_CONFIG: Record<
  ObjectiveStatus,
  {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    dotClass: string;
  }
> = {
  nao_iniciado: {
    label: 'Não iniciado',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-800',
    borderClass: 'border-amber-200',
    dotClass: 'bg-amber-400',
  },
  em_andamento: {
    label: 'Em andamento',
    bgClass: 'bg-sky-50',
    textClass: 'text-sky-800',
    borderClass: 'border-sky-200',
    dotClass: 'bg-sky-500',
  },
  concluido: {
    label: 'Concluído',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-800',
    borderClass: 'border-emerald-200',
    dotClass: 'bg-emerald-500',
  },
};

/**
 * Formata data YYYY-MM-DD para formato amigável brasileiro (DD/MM/AAAA).
 */
export function formatDate(dateString: string): string {
  if (!dateString) return 'Sem prazo definido';
  try {
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
}

/**
 * Retorna o status de proximidade do prazo (atrasado, hoje, em breve, no prazo).
 */
export function getDeadlineUrgency(deadlineString: string, isCompleted: boolean) {
  if (isCompleted || !deadlineString) {
    return { text: '', isOverdue: false, isToday: false };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [y, m, d] = deadlineString.split('-').map(Number);
  const targetDate = new Date(y, m - 1, d);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      text: `Atrasado há ${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? 'dia' : 'dias'}`,
      isOverdue: true,
      isToday: false,
    };
  }

  if (diffDays === 0) {
    return {
      text: 'Vence hoje!',
      isOverdue: false,
      isToday: true,
    };
  }

  if (diffDays === 1) {
    return {
      text: 'Vence amanhã',
      isOverdue: false,
      isToday: false,
    };
  }

  return {
    text: `Faltam ${diffDays} dias`,
    isOverdue: false,
    isToday: false,
  };
}
