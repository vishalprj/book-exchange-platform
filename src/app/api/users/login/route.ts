import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const response = await request.json();
  const { username, password } = response;
  console.log("🚀 ~ POST ~ password:", password);
  console.log("🚀 ~ POST ~ username:", username);

  try {
    // checking if the user filled all the required fields
    if (!username || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
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
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    // Log the hashed password from the database
    console.log("🚀 ~ POST ~ Stored password hash:", user.password);

    // checking password
    const validPassword = await bcrypt.compare(password, user.password);

    console.log("🚀 ~ POST ~ validPassword:", validPassword);

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
    console.error("🚀 ~ POST ~ Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
