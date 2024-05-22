import { NextRequest, NextResponse } from "next/server";

import { UserModel } from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";

export async function PUT(request: NextRequest) {
  dbConnect();
  try {
    const { email } = await request.json();

    const user = await UserModel.findOne({ email }).select("-password");

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User is logged out",
          data: null,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User is logged in",
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while fetching user data", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching user data",
      },
      {
        status: 500,
      }
    );
  }
}
