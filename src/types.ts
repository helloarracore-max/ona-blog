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


export type Category = 'HOME' | 'TRAVEL' | 'STYLE' | 'GROWTH';