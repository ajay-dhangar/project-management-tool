import { User, Project, Task, Notification, Activity } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ajay Dhangar',
    email: 'ajay@codeharborhub.github.io',
    role: 'admin',
    avatar: 'https://avatars.githubusercontent.com/u/99037494?v=4',
    isOnline: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@codeharborhub.github.io',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    isOnline: true
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@codeharborhub.github.io',
    role: 'contributor',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    isOnline: false
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@codeharborhub.github.io',
    role: 'contributor',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    isOnline: true
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-06-30'),
    status: 'in-progress',
    progress: 65,
    priority: 'high',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasks: [],
    createdBy: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20')
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Creating a cross-platform mobile app using React Native',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-08-15'),
    status: 'in-progress',
    progress: 30,
    priority: 'medium',
    members: [mockUsers[1], mockUsers[3]],
    tasks: [],
    createdBy: '2',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '3',
    title: 'Data Analytics Dashboard',
    description: 'Building a comprehensive analytics dashboard for business insights',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-05-30'),
    status: 'planning',
    progress: 15,
    priority: 'medium',
    members: [mockUsers[0], mockUsers[3]],
    tasks: [],
    createdBy: '1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05')
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Database Schema',
    description: 'Create comprehensive database schema for the e-commerce platform',
    projectId: '1',
    assignedTo: [mockUsers[0]],
    status: 'completed',
    priority: 'high',
    dueDate: new Date('2024-02-15'),
    createdBy: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10'),
    comments: [],
    attachments: [],
    tags: ['database', 'backend']
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up JWT-based authentication system',
    projectId: '1',
    assignedTo: [mockUsers[1]],
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2024-03-01'),
    createdBy: '1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-20'),
    comments: [],
    attachments: [],
    tags: ['auth', 'security']
  },
  {
    id: '3',
    title: 'Build Product Catalog',
    description: 'Create product listing and catalog functionality',
    projectId: '1',
    assignedTo: [mockUsers[2]],
    status: 'todo',
    priority: 'medium',
    dueDate: new Date('2024-03-15'),
    createdBy: '1',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    comments: [],
    attachments: [],
    tags: ['frontend', 'ui']
  },
  {
    id: '4',
    title: 'Setup CI/CD Pipeline',
    description: 'Configure automated testing and deployment pipeline',
    projectId: '2',
    assignedTo: [mockUsers[1]],
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date('2024-03-10'),
    createdBy: '2',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-18'),
    comments: [],
    attachments: [],
    tags: ['devops', 'automation']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline_approaching',
    title: 'Deadline Approaching',
    message: 'Task "Implement User Authentication" is due in 2 days',
    userId: '1',
    read: false,
    createdAt: new Date('2024-02-20'),
    relatedId: '2'
  },
  {
    id: '2',
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'You have been assigned to "Build Product Catalog"',
    userId: '2',
    read: false,
    createdAt: new Date('2024-02-15'),
    relatedId: '3'
  },
  {
    id: '3',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'Ajay Dhangar completed "Design Database Schema"',
    userId: '1',
    read: true,
    createdAt: new Date('2024-02-10'),
    relatedId: '1'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task_updated',
    description: 'Updated task "Implement User Authentication"',
    userId: '1',
    user: mockUsers[0],
    projectId: '1',
    taskId: '2',
    createdAt: new Date('2024-02-20')
  },
  {
    id: '2',
    type: 'task_created',
    description: 'Created new task "Build Product Catalog"',
    userId: '1',
    user: mockUsers[0],
    projectId: '1',
    taskId: '3',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '3',
    type: 'project_created',
    description: 'Created new project "Data Analytics Dashboard"',
    userId: '1',
    user: mockUsers[0],
    projectId: '3',
    createdAt: new Date('2024-03-01')
  }
];