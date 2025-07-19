import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatDate } from '../utils/dateUtils';
import { getPriorityColor } from '../utils/colorUtils';

export default function Calendar() {
  const { state } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    return state.tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your tasks and deadlines in calendar format
          </p>
        </div>
        <Button icon={<Plus size={16} />}>
          Add Event
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {monthYear}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              icon={<ChevronLeft size={16} />}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              icon={<ChevronRight size={16} />}
            />
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-24" />;
              }

              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const tasksForDay = getTasksForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01 }}
                  className={`h-24 p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {tasksForDay.slice(0, 2).map(task => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded truncate ${getPriorityColor(task.priority)}`}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                    {tasksForDay.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{tasksForDay.length - 2} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Tasks
        </h3>
        <div className="space-y-3">
          {state.tasks
            .filter(task => task.status !== 'completed')
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 5)
            .map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CalendarIcon size={16} className="text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}