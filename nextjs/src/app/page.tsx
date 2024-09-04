import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Manifest from "@mnfst/sdk";
import TodoTable from './components/TodoTable';
import { ThemeToggle } from './components/ThemeToggle';
import Footer from './components/Footer';
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
  let content;
  try {
    const todos = await getTodos();
    content = (
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Your Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoTable todos={todos.data} />
        </CardContent>
      </Card>
    );
  } catch (error) {
    content = (
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>An error occurred while fetching todos. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <main className="container mx-auto p-8 flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Todo App</h1>
        <ThemeToggle />
      </div>
      {content}
      <Footer />
    </main>
  );
}
