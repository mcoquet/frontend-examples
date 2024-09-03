export interface Todo {
  id: string;
  title: string;
  description: string; // Add this line
  completed: boolean;
  createdAt: Date | string;
}