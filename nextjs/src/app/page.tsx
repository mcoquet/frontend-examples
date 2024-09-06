import { Card, CardContent } from "@/components/ui/card"
import TodoList from './components/TodoList';
import TodoListHeader from './components/TodoListHeader';
import { ThemeToggle } from './components/ThemeToggle';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="container mx-auto p-8 flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Todo App</h1>
        <ThemeToggle />
      </div>
      <Card className="flex-grow">
        <TodoListHeader />
        <CardContent>
          <TodoList />
        </CardContent>
      </Card>
      <Footer />
    </main>
  );
}
