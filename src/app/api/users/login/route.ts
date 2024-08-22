import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
  const response = await request.json();
  const { username, password } = response;
  try {
    // checking if the user filled all the required field
    if (!username || !password) {
      return NextResponse.json(
        { error: "All field required" },
        { status: 400 }
      );
    }
    // checking if the user is already registered
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }

    // checking password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "User login successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
