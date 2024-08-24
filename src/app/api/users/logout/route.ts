import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        message: "Logout Successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
