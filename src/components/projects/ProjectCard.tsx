import { motion } from 'framer-motion';
import { Calendar, Users, MoreHorizontal } from 'lucide-react';
import { Project } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { getStatusColor, getProgressColor } from '../../utils/colorUtils';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Card } from '../common/Card';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card hover onClick={onClick} className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.description}
          </p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={getStatusColor(project.status)}>
            {project.status.replace('-', ' ')}
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {project.progress}% complete
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={14} />
            <span>{formatDate(project.endDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={14} className="text-gray-500 dark:text-gray-400" />
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member) => (
                <Avatar
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  size="sm"
                  className="border-2 border-white dark:border-gray-800"
                />
              ))}
              {project.members.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    +{project.members.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}