import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { requesterId, requestedBookId, ownerId, offeredBookId } =
    await request.json();

  try {
    const exchangeRequest = await prisma.exchangeRequest.create({
      data: {
        requesterId,
        requestedBookId,
        ownerId,
        offeredBookId,
        status: "pending",
      },
    });
    return NextResponse.json(
      { message: "Exchange request created", data: exchangeRequest },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// We have send these payload ( requesterId, requestedBookId, ownerId, offeredBookId, status )

// The requesterId refers to the ID of the user who is making the exchange request
// The requestedBookId refers to the ID of the book that the requester wants to receive in the exchange
// The ownerId refers to the ID of the user who owns the book that the requester is requesting
// The offeredBookId refers to the ID of the book that the requester is offering to the owner in exchange
// Optional status where user can set status of the book [pending , approved]
