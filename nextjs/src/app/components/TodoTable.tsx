'use client'

import { useState } from 'react'
import Manifest from "@mnfst/sdk";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Todo } from '../types/todo'
import TodoItem from './TodoItem'

const manifest = new Manifest();

interface TodoTableProps {
  todos: Todo[]
}

export default function TodoTable({ todos: initialTodos }: TodoTableProps) {
  const [todos, setTodos] = useState(initialTodos)
  const [error, setError] = useState<string | null>(null)

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await manifest.from('todos').update(parseInt(id, 10), { completed })
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      ))
      setError(null)
    } catch (error) {
      console.error('Failed to update todo:', error)
      setError('Failed to update todo. Please try again later.')
    }
  }

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}