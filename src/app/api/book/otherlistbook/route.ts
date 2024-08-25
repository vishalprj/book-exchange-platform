import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const usersWithBooks = await prisma.users.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      include: {
        Books: true,
      },
    });
    const allBooks = usersWithBooks.flatMap((user) => user.Books);

    return NextResponse.json(allBooks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
