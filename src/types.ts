export interface User {
  username: string;
  isAdmin: boolean;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  tags: string[];
  likes: number;
}

export type ViewState = 'HOME' | 'LOGIN' | 'SIGNUP' | 'ADMIN' | 'POST_DETAIL' | 'TRAVEL' | 'STYLE' | 'GROWTH';

export interface ViewContext {
  view: ViewState;
  data?: any; // To pass post ID or other data between views
}