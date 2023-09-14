import { db } from "@/lib/db";
import { getUserProfile } from "@/lib/get-user";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { id, done } = await req.json();
    const profile = await getUserProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the todo with the given ID exists and belongs to the user
    const todo = await db.todo.findUnique({
      where: {
        id,
        userId: profile.userId,
      },
    });

    if (!todo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    // Update the 'done' value of the todo
    const updatedTodo = await db.todo.update({
      where: {
        id,
      },
      data: {
        done,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (e) {
    console.log("[SERVERS_PATCH] ", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
