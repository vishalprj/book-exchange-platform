import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch other users and their books
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

    // Fetch the current user's books
    const currentUser = await prisma.users.findUnique({
      where: { id: userId },
      include: { Books: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Current user not found" },
        { status: 404 }
      );
    }

    const currentUserBooks = currentUser.Books;
    const allBooks = usersWithBooks.flatMap((user) => user.Books);

    // Create a set of book IDs to exclude
    const excludedBooks = new Set(currentUserBooks.map((book) => book.id));

    // Match books based on title or genre, excluding certain books
    const matches = allBooks.filter((book) =>
      currentUserBooks.some(
        (userBook) =>
          (userBook.title === book.title || userBook.genre === book.genre) &&
          !excludedBooks.has(book.id)
      )
    );

    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    console.error("Error fetching users with books:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
