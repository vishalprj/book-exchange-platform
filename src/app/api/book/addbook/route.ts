import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { title, author, genre, userId, image } = await request.json();

  if (!title || !author || !genre || !userId || !image) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const existingBook = await prisma.book.findFirst({
      where: {
        title,
        userId,
      },
    });

    if (existingBook) {
      return NextResponse.json(
        { error: "You have already listed a book with this title" },
        { status: 400 }
      );
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        userId,
        image,
        status: "available",
      },
    });

    return NextResponse.json(
      { message: "Book added successfully", data: newBook },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
