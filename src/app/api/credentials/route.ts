import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { CredentialModel } from "@/models/credential.model";
import getUser from "@/lib/getUserFromServerSession";

export async function POST(request: NextRequest) {
  console.log("POST CREDENTIAL RUNNING..............");
  await dbConnect();
  try {
    const userSession = await getUser();
    const { username, password } = await request.json();
    // console.log(userSession);

    const user = await UserModel.findById(userSession?._id);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while adding credential",
        },
        {
          status: 404,
        }
      );
    }
    const newCredential = await CredentialModel.create({
      username,
      password,
    });

    if (!newCredential) {
      return Response.json(
        {
          success: false,
          message: "Unable to create credential",
        },
        {
          status: 400,
        }
      );
    }

    user.credentials.push(newCredential._id);
    await user.save();

    // console.log("=======================================");
    // console.log({ user });
    // console.log("=======================================");
    const userCredentials = await CredentialModel.find({
      _id: { $in: user?.credentials },
    });

    return Response.json(
      {
        success: true,
        message: "Credential Added successfully",
        data: userCredentials,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal: Unable to create Credential",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  console.log("GET CREDENTIAL RUNNING..............");
  await dbConnect();

  try {
    const userSession = await getUser();
    const user = await UserModel.findById(userSession?._id);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while getting credential",
        },
        {
          status: 404,
        }
      );
    }
    const userCredentials = await CredentialModel.find({
      _id: { $in: user?.credentials },
    });

    return Response.json(
      {
        success: true,
        message: "Credentials fetched successfully",
        data: userCredentials,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unable to get credentials", error);
    return Response.json(
      {
        success: false,
        message: "Unable to get credentials",
      },
      {
        status: 500,
      }
    );
  }
}
