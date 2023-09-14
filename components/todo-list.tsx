"use client";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";

interface Todo {
  id: number;
  userId: string;
  text: string;
  done: boolean;
}

export const TodoList = ({ todos }: { todos: Array<Todo> }) => {
  if (todos.length === 0) {
    return <Empty />;
  }
  return (
    <div className="mx-auto flex w-full flex-col-reverse gap-4  sm:max-w-xl">
      {todos.map((todo) => (
        <TodoItem key={todo.text} todo={todo} />
      ))}
    </div>
  );
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const router = useRouter();
  const [complete, setComplete] = useState(todo.done);

  const handleCompleteChange = async (checked: CheckedState) => {
    try {
      setComplete((c) => !c);
      await axios.patch("/api/update", { id: todo.id, done: checked });
    } catch (error) {
      console.error("Error updating todo:", error);
      setComplete((c) => !c);
    }
  };

  const handleDelete = () => {
    axios
      .delete("/api/delete", { data: { id: todo.id } })
      .then(() => router.refresh())
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id={todo.text}
            checked={complete}
            onCheckedChange={handleCompleteChange}
          />
          <Label
            htmlFor={todo.text}
            className={cn(
              "opacity-90",
              complete && "text-muted-foreground line-through",
            )}
          >
            {todo.text}
          </Label>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleDelete}
          type="submit"
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

const Empty = () => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-lg font-semibold opacity-80">No do-dos</p>
    </div>
  );
};
