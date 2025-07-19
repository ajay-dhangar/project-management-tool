import { motion } from 'framer-motion';
import { FolderOpen, CheckSquare, Users, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ProjectChart } from '../components/dashboard/ProjectChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines';

export default function Dashboard() {
  const { state } = useApp();

  const stats = [
    {
      title: 'Total Projects',
      value: state.projects.length,
      change: { value: 12, type: 'increase' as const },
      icon: <FolderOpen size={20} className="text-blue-600 dark:text-blue-400" />,
      color: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Active Tasks',
      value: state.tasks.filter(t => t.status !== 'completed').length,
      change: { value: 8, type: 'increase' as const },
      icon: <CheckSquare size={20} className="text-green-600 dark:text-green-400" />,
      color: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Team Members',
      value: 4,
      icon: <Users size={20} className="text-purple-600 dark:text-purple-400" />,
      color: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'Overdue Tasks',
      value: state.tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length,
      change: { value: 3, type: 'decrease' as const },
      icon: <Clock size={20} className="text-red-600 dark:text-red-400" />,
      color: 'bg-red-100 dark:bg-red-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {state.user?.name}! Here's what's happening with your projects.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectChart />
        <RecentActivity />
      </div>

      <UpcomingDeadlines />
    </div>
  );
}