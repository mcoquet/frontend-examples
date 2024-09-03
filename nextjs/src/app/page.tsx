import { manifest } from './manifest';

async function getTodoLists() {
  const lists = await manifest.from('todo-lists').find({ page: 1, perPage: 10 });
  return lists;
}

async function getTodos() {
  const todos = await manifest.from('todos').find({ page: 1, perPage: 10 });
  return todos;
}

export default async function Home() {
  const todoLists = await getTodoLists();
  const todos = await getTodos();

  console.log(todoLists);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Todo Lists</h2>
        <ul className="list-disc pl-5">
          {todoLists.data && (todoLists.data as Array<{ id: string; title: string }>).map((list) => (
            <li key={list.id}>{list.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Todos</h2>
        <ul className="list-disc pl-5">
          {todos.data && (todos.data as Array<{ id: string; title: string }>).map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
