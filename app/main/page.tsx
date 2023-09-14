import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

import { getUserProfile } from "@/lib/get-user";
import { db } from "@/lib/db";
import { TodoList } from "@/components/todo-list";
import { TodoForm } from "@/components/todo-form";

const MainPage = async () => {
  const profile = await getUserProfile();

  const todos = await db.todo.findMany({
    where: {
      userId: profile.userId,
    },
  });

  return (
    <div className="space-y-10 p-4">
      <div className="flex items-center justify-between ">
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
      <div className="flex ">
        <h2 className="font-mono text-3xl font-bold">
          {profile.name ? `Welcome, ${profile.name}` : "Welcome"} 😸
        </h2>
      </div>
      <div className="mx-auto sm:max-w-xl">
        <TodoForm />
      </div>

      <TodoList todos={todos} />
    </div>
  );
};

export default MainPage;
