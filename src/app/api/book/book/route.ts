import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const books = await prisma.book.findMany({});
    return NextResponse.json({ data: books }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
