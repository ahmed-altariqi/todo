import { NextResponse } from "next/server";

import { getUserProfile } from "@/lib/get-user";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const profile = await getUserProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const todo = await db.todo.findUnique({
      where: {
        id,
        userId: profile.userId,
      },
    });

    if (!todo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    await db.todo.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.log("[TODO_DELETE] ", e);
    return new NextResponse("[TODO_DELETE] Internal Error", { status: 500 });
  }
}
