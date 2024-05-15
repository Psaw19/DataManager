import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";
import getUser from "@/lib/getUserFromServerSession";
import { CredentialModel } from "@/models/credential.model";
import { UserModel } from "@/models/user.model";

export async function PUT(request: NextRequest, { params }: any) {
  console.log("............PUT CREDENTIAL RUNNING..............");
  await dbConnect();

  try {
    const userSession = await getUser();
    const user = await UserModel.findById(userSession?._id);
    const { username, password } = await request.json();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while deleting credential",
        },
        {
          status: 404,
        }
      );
    }
    const { id: credentialId } = params;

    if (!user.credentials.includes(credentialId)) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized to delete credential",
        },
        {
          status: 401,
        }
      );
    }

    const updatedCredential = await CredentialModel.findByIdAndUpdate(
      credentialId,
      {
        username,
        password,
      }
    );

    if (!updatedCredential) {
      console.error("Error in updating credential");
      return Response.json(
        {
          success: false,
          message: "Error in updating credential",
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
        message: "Credential updated successfully",
        data: userCredentials,
      },
      {
        status: 202,
      }
    );
  } catch (error) {
    console.error("Unable to update credential", error);
    return Response.json(
      {
        success: false,
        message: "Unable to update credential",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  console.log("............DELETE CREDENTIAL RUNNING..............");
  await dbConnect();
  try {
    const userSession = await getUser();
    const { id: credentialId } = params;
    // console.log({ userSession });
    // console.log({ credentialId });

    const user = await UserModel.findById(userSession?._id);
    const credential = await CredentialModel.findById(credentialId);

    if (!credential) {
      return Response.json(
        {
          success: false,
          message: "Credential not found",
        },
        {
          status: 404,
        }
      );
    }
    console.log({ Credential: credential });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while deleting credential",
        },
        {
          status: 404,
        }
      );
    }

    if (!user?.credentials.includes(credentialId)) {
      return Response.json(
        {
          success: false,
          message: "Credential not found in user",
        },
        {
          status: 404,
        }
      );
    }

    await UserModel.findByIdAndUpdate(
      { _id: user?._id },
      {
        $pull: {
          credentials: credentialId,
        },
      },
      { new: true }
    );

    await CredentialModel.findByIdAndDelete(credentialId);

    const userCredentials = await CredentialModel.find({
      _id: { $in: user?.credentials },
    });

    return Response.json(
      {
        success: true,
        message: "Credential deleted successfully",
        data: userCredentials,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unable to delete credential", error);
    return Response.json(
      {
        success: false,
        message: "Internal:Unable to delete credential",
      },
      {
        status: 500,
      }
    );
  }
}
