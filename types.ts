
export interface Project {
  id: string;
  title: string;
  description: string;
  lastModified: number;
  category: 'Design' | 'Craft' | 'Tech' | 'Planning';
  status: 'Draft' | 'In Progress' | 'Completed';
  thumbnail?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string;
}

export enum AppRoute {
  DASHBOARD = '/',
  PROJECT = '/project/:id',
  EXPLORE = '/explore'
}
