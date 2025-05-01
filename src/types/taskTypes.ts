export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  isFavorite: boolean;
  createdAt?: Date;
  completed: boolean; // Indicates if the task is completed
}
