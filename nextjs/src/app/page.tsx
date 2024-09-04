import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Manifest from "@mnfst/sdk";
import TodoTable from './components/TodoTable';
import { ThemeToggle } from './components/ThemeToggle';
import { Todo } from './types/todo';

const manifest = new Manifest();

async function getTodos(): Promise<{ data: Todo[] }> {
  try {
    const todos = await manifest.from('todos').find({ page: 1, perPage: 50 });
    return todos as { data: Todo[] };
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

export default async function Home() {
  try {
    const todos = await getTodos();

    return (
      <main className="container mx-auto p-8 flex flex-col min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Todo App</h1>
          <ThemeToggle />
        </div>
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Your Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoTable todos={todos.data} />
          </CardContent>
        </Card>
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            This is a sample project from the{' '}
            <a href="https://github.com/manifestdottech/manifest" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              Manifest project
            </a>
            , made by{' '}
            <a href="https://github.com/mcoquet" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              @mcoquet
            </a>
          </p>
        </footer>
      </main>
    );
  } catch (error) {
    return (
      <main className="container mx-auto p-8 flex flex-col min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Todo App</h1>
          <ThemeToggle />
        </div>
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>An error occurred while fetching todos. Please try again later.</p>
          </CardContent>
        </Card>
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            This is a sample project from the{' '}
            <a href="manifest.build" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              Manifest project
            </a>
            , made by{' '}
            <a href="https://github.com/mcoquet" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              @mcoquet
            </a>
          </p>
        </footer>
      </main>
    );
  }
}
