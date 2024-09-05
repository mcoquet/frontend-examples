import Manifest from "@mnfst/sdk";
import { Todo } from '../types/todo';

const manifest = new Manifest();
global.manifest = manifest;

export type SortOrder = 'asc' | 'desc';

export const api = {
  todos: {
    find: async (sortBy: keyof Todo = 'createdAt', sortOrder: SortOrder = 'desc'): Promise<Todo[]> => {
      const result = await manifest.from('todos')
        .orderBy(sortBy, { desc: sortOrder === 'desc' })
        .find();  // Removed pagination parameters
      return result.data as Todo[];
    },
    create: async (title: string): Promise<Todo> => {
      const newTodo = await manifest.from('todos').create({
        title,
        completed: false,
        createdAt: new Date().toISOString()
      });
      return newTodo as Todo;
    },
    update: async (id: number, data: Partial<Todo>): Promise<void> => {
      await manifest.from('todos').update(id, data);
    },
    delete: async (id: number): Promise<void> => {
      await manifest.from('todos').delete(id);
    },
  }
};