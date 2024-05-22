import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { SignUpSchema } from "@/schemas";

export async function POST(request: NextRequest) {
  console.log("-----------Signing Up----------");
  await dbConnect();

  try {
    const userData: z.infer<typeof SignUpSchema> = await request.json();
    const isValidUserDetails = SignUpSchema.safeParse(userData);
    if (!isValidUserDetails) {
      return Response.json(
        {
          success: false,
          message: "Invalid User Data",
        },
        {
          status: 400,
        }
      );
    }

    const { name, email, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
      return Response.json(
        {
          success: false,
          message: "Passwords do not match",
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
      name,
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
