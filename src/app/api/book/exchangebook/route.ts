import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function PATCH(request: NextRequest) {
  const { requesterId, requestedBookId, ownerId, offeredBookId } =
    await request.json();

  if (!requesterId || !requestedBookId || !ownerId || !offeredBookId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const exchangeRequestBook = await prisma.exchangeRequest.findFirst({
      where: {
        requesterId,
        requestedBookId,
        ownerId,
        offeredBookId,
      },
      include: {
        requestedBook: true,
        offeredBook: true,
      },
    });
    if (!exchangeRequestBook) {
      return NextResponse.json(
        { message: "Exchange request not found" },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.book.update({
        where: { id: requestedBookId },
        data: { userId: requesterId },
      });

      await prisma.book.update({
        where: { id: offeredBookId },
        data: { userId: ownerId },
      });

      await prisma.exchangeRequest.update({
        where: {
          id: exchangeRequestBook.id,
        },
        data: {
          status: "approved",
          updatedAt: new Date(),
        },
      });
    });

    return NextResponse.json(
      { message: "Exchange request approved" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
