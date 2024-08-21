import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  try {
    const book = await prisma.book.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { message: "Book deleted successfully", data: book },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
