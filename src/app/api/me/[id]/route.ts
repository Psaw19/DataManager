import dbConnect from "@/lib/dbConnect";
import { CredentialModel } from "@/models/credential.model";
import { NoteModel } from "@/models/note.model";
import { UserModel } from "@/models/user.model";
// import mongoose from "mongoose";
import { NextRequest } from "next/server";

interface UserParams {
  id: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: UserParams }
) {
  dbConnect();
  // const session = await mongoose.startSession();
  try {
    const { id: userId } = params;

    const user = UserModel.findById(userId);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User doesn't exist",
        },
        {
          status: 404,
        }
      );
    }

    const deletedUserCredential = await CredentialModel.deleteMany({ userId });
    if (!deletedUserCredential) {
      return Response.json(
        {
          success: false,
          message: "Unable to delete user credentials",
        },
        {
          status: 400,
        }
      );
    }
    const deletedUserNotes = await NoteModel.deleteMany({ userId });
    if (!deletedUserNotes) {
      return Response.json(
        {
          success: false,
          message: "Unable to delete user notes",
        },
        {
          status: 400,
        }
      );
    }
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return Response.json(
        {
          success: false,
          message: "Unable to delete user",
        },
        {
          status: 400,
        }
      );
    }

    // await session.commitTransaction();
    // session.endSession();

    return Response.json(
      {
        success: true,
        message: "User deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();

    console.error("Error during deletion operation:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to delete account please try again later",
      },
      {
        status: 500,
      }
    );
  }
}
