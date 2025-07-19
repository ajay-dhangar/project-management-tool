import { motion } from 'framer-motion';
import { Users, Mail, Shield, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export default function Team() {
  const { state } = useApp();

  const allUsers = [
    ...state.projects.flatMap(p => p.members),
    state.user
  ].filter((user, index, self) => 
    user && self.findIndex(u => u?.id === user.id) === index
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'error';
      case 'manager': return 'warning';
      case 'contributor': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your team members and their roles
          </p>
        </div>
        <Button icon={<Users size={16} />}>
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUsers.map((user, index) => (
          <motion.div
            key={user!.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={user!.avatar}
                    alt={user!.name}
                    size="lg"
                    isOnline={user!.isOnline}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user!.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user!.email}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={getRoleColor(user!.role)} className="capitalize">
                    <Shield size={12} className="mr-1" />
                    {user!.role}
                  </Badge>
                  <span className={`w-2 h-2 rounded-full ${
                    user!.isOnline ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Projects</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {state.projects.filter(p => 
                        p.members.some(m => m.id === user!.id)
                      ).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500 dark:text-gray-400">Tasks</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {state.tasks.filter(t => 
                        t.assignedTo.some(u => u.id === user!.id)
                      ).length}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}