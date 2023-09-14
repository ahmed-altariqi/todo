import { NextResponse } from "next/server";

import { getUserProfile } from "@/lib/get-user";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const profile = await getUserProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const todo = await db.todo.create({
      data: {
        text,
        userId: profile.userId,
        done: false,
      },
    });

    console.log({ apiCreate: todo });

    return NextResponse.json(todo);
  } catch (e) {
    console.log("[SERVERS_POST] ", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
