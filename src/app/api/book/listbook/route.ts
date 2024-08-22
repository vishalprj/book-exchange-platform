import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const userWithBooks = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        Books: true,
      },
    });

    return NextResponse.json(userWithBooks?.Books, { status: 200 });
  } catch (error) {
    console.error("Error fetching user with books:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
