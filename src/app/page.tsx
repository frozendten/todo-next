import TodoItem from "@/components/TodoItem";
import prisma from "@/db";
import Link from "next/link";

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl">Todo</h1>
        <Link
          href={`/new`}
          className="border border-slate-400 p-2 rounded focus-within:bg-slate-700 hover:bg-slate-700"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
