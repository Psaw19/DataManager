import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { fullname, username, email, password } = await request.json();
    console.log(fullname, username, email, password);
    if (!fullname || !username || !email || !password) {
      return Response.json({
        success: false,
        message: "Signup data nhi mila",
      });
    }
    const existingUserByUsername = await UserModel.findOne({
      username,
    });

    if (existingUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "Email already in use",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error while registering user, Please try again later",
      },
      {
        status: 500,
      }
    );
  }
}
