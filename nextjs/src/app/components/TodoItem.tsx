import { TableCell, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const completedStyle = todo.completed ? 'line-through text-gray-500' : '';

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked) => onToggle(todo.id, checked as boolean)}
        />
      </TableCell>
      <TableCell className={completedStyle}>
        {todo.title}
      </TableCell>
      <TableCell className={completedStyle}>
        {new Date(todo.createdAt).toLocaleString()}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="destructive" onClick={() => onDelete(todo.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}