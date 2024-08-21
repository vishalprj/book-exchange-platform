import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(request: NextRequest, respond: NextResponse) {
  const body = await request.json();
  const { username, email, password } = body;

  try {
    // checking if the user feild all the required field
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "All input field required" },
        { status: 400 }
      );
    }
    // checking if user already exist in the database
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    // creating new user
    const newUser = await prisma.users.create({
      data: { email, username, password },
    });
    return NextResponse.json(
      { message: "User registered successfully", data: newUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
