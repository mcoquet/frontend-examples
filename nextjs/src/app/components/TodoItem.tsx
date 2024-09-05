import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Todo } from '../types/todo';
import { format } from 'date-fns'

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const formatDate = (date: string | number) => {
    return format(new Date(date), 'MM/dd/yyyy, HH:mm:ss')
  }

  const completedStyle = todo.completed ? 'line-through opacity-60' : '';

  return (
    <TableRow className={completedStyle}>
      <TableCell>{todo.title}</TableCell>
      <TableCell>{todo.description || '-'}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center w-6 h-6">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={(checked) => onToggle(todo.id, checked as boolean)}
            className="w-4 h-4"
          />
        </div>
      </TableCell>
      <TableCell>{formatDate(todo.createdAt)}</TableCell>
    </TableRow>
  );
};

export default TodoItem;