'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Todo } from '../types/todo';
import { api } from '../lib/api';

interface CreateTodoInputProps {
  onTodoAdded: (newTodo: Todo) => void;
}

export default function CreateTodoInput({ onTodoAdded }: CreateTodoInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        const newTodo = await api.todos.create(title);
        setTitle('');
        onTodoAdded(newTodo);
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo"
        className="flex-grow"
      />
      <Button type="submit">Add Todo</Button>
    </form>
  );
}