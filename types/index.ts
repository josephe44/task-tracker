export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
};

export type FilterType = 'All' | 'Active' | 'Completed';
