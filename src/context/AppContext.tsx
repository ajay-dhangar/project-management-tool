import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, Project, Task, Notification, Activity } from '../types';
import { mockUsers, mockProjects, mockTasks, mockNotifications, mockActivities } from '../data/mockData';
import { storage, initializeStorage } from '../utils/localStorage';
import toast from 'react-hot-toast';

interface AppState {
  user: User | null;
  projects: Project[];
  tasks: Task[];
  notifications: Notification[];
  activities: Activity[];
  theme: 'light' | 'dark';
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_ACTIVITIES'; payload: Activity[] }
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  user: null,
  projects: [],
  tasks: [],
  notifications: [],
  activities: [],
  theme: 'light',
  loading: false,
  error: null,
  isAuthenticated: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      const newStateWithUser = { ...state, user: action.payload, isAuthenticated: !!action.payload };
      storage.set('user', action.payload);
      return newStateWithUser;
    
    case 'SET_PROJECTS':
      storage.set('projects', action.payload);
      return { ...state, projects: action.payload };
    
    case 'ADD_PROJECT':
      const newProjects = [...state.projects, action.payload];
      storage.set('projects', newProjects);
      return { ...state, projects: newProjects };
    
    case 'UPDATE_PROJECT':
      const updatedProjects = state.projects.map(p => p.id === action.payload.id ? action.payload : p);
      storage.set('projects', updatedProjects);
      return { ...state, projects: updatedProjects };
    
    case 'DELETE_PROJECT':
      const filteredProjects = state.projects.filter(p => p.id !== action.payload);
      storage.set('projects', filteredProjects);
      return { ...state, projects: filteredProjects };
    
    case 'SET_TASKS':
      storage.set('tasks', action.payload);
      return { ...state, tasks: action.payload };
    
    case 'ADD_TASK':
      const newTasks = [...state.tasks, action.payload];
      storage.set('tasks', newTasks);
      return { ...state, tasks: newTasks };
    
    case 'UPDATE_TASK':
      const updatedTasks = state.tasks.map(t => t.id === action.payload.id ? action.payload : t);
      storage.set('tasks', updatedTasks);
      return { ...state, tasks: updatedTasks };
    
    case 'DELETE_TASK':
      const filteredTasks = state.tasks.filter(t => t.id !== action.payload);
      storage.set('tasks', filteredTasks);
      return { ...state, tasks: filteredTasks };
    
    case 'SET_NOTIFICATIONS':
      storage.set('notifications', action.payload);
      return { ...state, notifications: action.payload };
    
    case 'ADD_NOTIFICATION':
      const newNotifications = [action.payload, ...state.notifications];
      storage.set('notifications', newNotifications);
      return { ...state, notifications: newNotifications };
    
    case 'MARK_NOTIFICATION_READ':
      const updatedNotifications = state.notifications.map(n => 
        n.id === action.payload ? { ...n, read: true } : n
      );
      storage.set('notifications', updatedNotifications);
      return { ...state, notifications: updatedNotifications };
    
    case 'SET_ACTIVITIES':
      storage.set('activities', action.payload);
      return { ...state, activities: action.payload };
    
    case 'ADD_ACTIVITY':
      const newActivities = [action.payload, ...state.activities];
      storage.set('activities', newActivities);
      return { ...state, activities: newActivities };
    
    case 'SET_THEME':
      storage.set('theme', action.payload);
      return { ...state, theme: action.payload };
    
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      storage.set('theme', newTheme);
      return { ...state, theme: newTheme };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    
    case 'LOGOUT':
      storage.clear();
      return { ...initialState };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize app with stored data or mock data
  useEffect(() => {
    const initializeApp = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // Initialize storage
        initializeStorage();
        
        // Load data from localStorage
        const storedUser = storage.get<User>('user');
        const storedProjects = storage.get<Project[]>('projects');
        const storedTasks = storage.get<Task[]>('tasks');
        const storedNotifications = storage.get<Notification[]>('notifications');
        const storedActivities = storage.get<Activity[]>('activities');
        const storedTheme = storage.get<'light' | 'dark'>('theme');

        // If no stored data, use mock data
        if (!storedUser) {
          dispatch({ type: 'SET_USER', payload: mockUsers[0] });
          dispatch({ type: 'SET_PROJECTS', payload: mockProjects });
          dispatch({ type: 'SET_TASKS', payload: mockTasks });
          dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
          dispatch({ type: 'SET_ACTIVITIES', payload: mockActivities });
        } else {
          dispatch({ type: 'SET_USER', payload: storedUser });
          dispatch({ type: 'SET_PROJECTS', payload: storedProjects || [] });
          dispatch({ type: 'SET_TASKS', payload: storedTasks || [] });
          dispatch({ type: 'SET_NOTIFICATIONS', payload: storedNotifications || [] });
          dispatch({ type: 'SET_ACTIVITIES', payload: storedActivities || [] });
        }

        // Set theme
        if (storedTheme) {
          dispatch({ type: 'SET_THEME', payload: storedTheme });
        }
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 800));
        
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize app' });
        toast.error('Failed to load application data');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeApp();
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}