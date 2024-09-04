'use client'

import { useState } from 'react'
import Manifest from "@mnfst/sdk";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Todo } from '../types/todo'
import { format } from 'date-fns'
import { Alert, AlertDescription } from "@/components/ui/alert"

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

  const formatDate = (date: string | number) => {
    return format(date, 'MM/dd/yyyy, HH:mm:ss')
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
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) => toggleTodo(todo.id, checked as boolean)}
                  />
                  <Button 
                    variant={todo.completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleTodo(todo.id, !todo.completed)}
                  >
                    {todo.completed ? 'Done' : 'Not Done'}
                  </Button>
                </div>
              </TableCell>
              <TableCell>{formatDate(todo.createdAt.toString())}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}