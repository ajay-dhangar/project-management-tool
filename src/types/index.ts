export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'contributor';
  avatar?: string;
  isOnline?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  priority: 'low' | 'medium' | 'high';
  members: User[];
  tasks: Task[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: User[];
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  attachments: Attachment[];
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  user: User;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'deadline_approaching' | 'task_completed' | 'project_updated';
  title: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: Date;
  relatedId?: string;
}

export interface Activity {
  id: string;
  type: 'project_created' | 'task_created' | 'task_updated' | 'member_added';
  description: string;
  userId: string;
  user: User;
  projectId?: string;
  taskId?: string;
  createdAt: Date;
}