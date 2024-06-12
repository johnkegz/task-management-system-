export interface Task {
  id: number;
  title: string;
  description: string;
  user: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}
