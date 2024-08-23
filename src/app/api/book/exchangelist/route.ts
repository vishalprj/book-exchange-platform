import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  try {
    const exchangeRequest = await prisma.exchangeRequest.findMany({
      where: {
        OR: [{ requesterId: userId }, { ownerId: userId }],
      },
      include: {
        requestedBook: true,
        offeredBook: true,
      },
    });
    return NextResponse.json({ data: exchangeRequest }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
