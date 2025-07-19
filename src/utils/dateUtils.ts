import { format, isToday, isTomorrow, isYesterday, differenceInDays, isPast } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  if (isYesterday(d)) return 'Yesterday';
  
  return format(d, 'MMM d, yyyy');
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM d, yyyy h:mm a');
};

export const isOverdue = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return isPast(d) && !isToday(d);
};

export const getDaysUntilDue = (date: Date | string): number => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return differenceInDays(d, new Date());
};

export const getDeadlineStatus = (date: Date | string): 'overdue' | 'due-soon' | 'upcoming' => {
  const days = getDaysUntilDue(date);
  
  if (days < 0) return 'overdue';
  if (days <= 2) return 'due-soon';
  return 'upcoming';
};