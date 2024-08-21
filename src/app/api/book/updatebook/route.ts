import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function PUT(request: NextRequest, respond: NextResponse) {
  const { id, title, author, genre } = await request.json();

  if (!id || !title || !author || !genre) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const updatedBook = await prisma.book.update({
      where: { id: id },
      data: {
        title: title,
        author: author,
        genre: genre,
      },
    });
    return NextResponse.json(
      { message: "Book updated successfully", data: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
