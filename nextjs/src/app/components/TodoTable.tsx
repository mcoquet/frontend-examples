'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Todo } from '../types/todo'
import TodoItem from './TodoItem'
import { SortOrder } from '../lib/api'

interface TodoTableProps {
  todos: Todo[];
  onTodoToggle: (id: number, completed: boolean) => void;
  onTodoDelete: (id: number) => void;
  onSort: (column: keyof Todo) => void;
  sortBy: keyof Todo;
  sortOrder: SortOrder;
}

export default function TodoTable({ todos, onTodoToggle, onTodoDelete, onSort, sortBy, sortOrder }: TodoTableProps) {
  const SortableHeader = ({ column, children }: { column: keyof Todo, children: React.ReactNode }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => onSort(column)}>
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader column="completed">Status</SortableHeader>
          <SortableHeader column="title">Title</SortableHeader>
          <SortableHeader column="createdAt">Created At</SortableHeader>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={onTodoToggle} 
              onDelete={onTodoDelete}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">No todos found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}