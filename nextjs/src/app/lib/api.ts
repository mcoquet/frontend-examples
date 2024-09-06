import Manifest from "@mnfst/sdk";
import { Todo } from '../types/todo';
import { TodoList } from '../types/todoList';

const manifest = new Manifest();

export type SortOrder = 'asc' | 'desc';


export const api = {
  todos: {
    find: async (sortBy: keyof Todo = 'createdAt', sortOrder: SortOrder = 'desc', todoListId?: number): Promise<Todo[]> => {
      let query = manifest.from('todos')
        .orderBy(sortBy, { desc: sortOrder === 'desc' });
      
      if (todoListId) {
        query = query.where('todoListId', '==', todoListId);
      }
      
      const result = await query.find();
      return result.data as Todo[];
    },
    create: async (title: string, todoListId: number): Promise<Todo> => {
      const newTodo = await manifest.from('todos').create({
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        todoListId
      });
      return newTodo as Todo;
    },
    update: async (id: number, data: Partial<Todo>): Promise<void> => {
      await manifest.from('todos').update(id, data);
    },
    delete: async (id: number): Promise<void> => {
      await manifest.from('todos').delete(id);
    },
  },
  todoLists: {
    find: async (): Promise<TodoList[]> => {
      const result = await manifest.from("todo-lists").orderBy('createdAt', { desc: true }).find();
      return result.data as TodoList[];
    },
    create: async (title: string): Promise<TodoList> => {
      const newTodoList = await manifest.from("todo-lists").create({
        title,
        createdAt: new Date().toISOString()
      });
      return newTodoList as TodoList;
    },
    update: async (id: number, data: Partial<TodoList>): Promise<void> => {
      await manifest.from("todo-lists").update(id, data);
    },
    delete: async (id: number): Promise<void> => {
      await manifest.from("todo-lists").delete(id);
    },
  }
};