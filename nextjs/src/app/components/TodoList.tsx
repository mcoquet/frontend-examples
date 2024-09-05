'use client'

import { useEffect, useState, useCallback } from 'react';
import { Todo } from '../types/todo';
import { api, SortOrder } from '../lib/api';
import CreateTodoInput from './CreateTodoInput';
import TodoTable from './TodoTable';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);  // Initialize with an empty array
  const [sortBy, setSortBy] = useState<keyof Todo>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const fetchTodos = useCallback(async () => {
    try {
      const fetchedTodos = await api.todos.find(sortBy, sortOrder);
      setTodos(fetchedTodos || []); // Ensure we always set an array
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]); // Set empty array in case of error
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSort = (column: keyof Todo) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleTodoAdded = async (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleTodoToggle = async (id: number, completed: boolean) => {
    try {
      await api.todos.update(id, { completed });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      // Revert the change if the API call fails
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    }
  };

  const handleTodoDelete = async (id: number) => {
    try {
      await api.todos.delete(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <>
      <CreateTodoInput onTodoAdded={handleTodoAdded} />
      <TodoTable 
        todos={todos} 
        onTodoToggle={handleTodoToggle} 
        onTodoDelete={handleTodoDelete}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </>
  );
}