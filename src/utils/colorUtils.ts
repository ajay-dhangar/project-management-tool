export const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'low': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
    case 'medium': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20';
    case 'high': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
    default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'todo': return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
    case 'in-progress': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
    case 'completed': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
    case 'planning': return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20';
    case 'on-hold': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20';
    default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
  }
};

export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 60) return 'bg-blue-500';
  if (progress >= 40) return 'bg-yellow-500';
  if (progress >= 20) return 'bg-orange-500';
  return 'bg-red-500';
};