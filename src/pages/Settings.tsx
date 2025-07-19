import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Avatar } from '../components/common/Avatar';

export default function Settings() {
  const { state, dispatch } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Settings
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  src={state.user?.avatar}
                  alt={state.user?.name}
                  size="lg"
                />
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={state.user?.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={state.user?.email}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Appearance Settings */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Palette size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Appearance
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => state.theme === 'dark' && dispatch({ type: 'TOGGLE_THEME' })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      state.theme === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-12 h-8 bg-white rounded border border-gray-300 mb-2"></div>
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => state.theme === 'light' && dispatch({ type: 'TOGGLE_THEME' })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      state.theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-12 h-8 bg-gray-800 rounded border border-gray-600 mb-2"></div>
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button fullWidth variant="outline">
                Export Data
              </Button>
              <Button fullWidth variant="outline">
                Import Projects
              </Button>
              <Button fullWidth variant="danger">
                Delete Account
              </Button>
            </div>
          </Card>

          {/* Developer Credit */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Developer
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AD</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Ajay Dhangar
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Full Stack Developer
              </p>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => window.open('https://github.com/ajay-dhangar', '_blank')}
              >
                GitHub Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}