import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NoteModel } from "@/models/note.model";
import getUser from "@/lib/getUserFromServerSession";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const userSession = await getUser();
    const userId = userSession?._id;
    const { title, description } = await request.json();

    const newNote = await NoteModel.create({
      userId,
      title,
      description,
    });

    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while adding note",
        },
        {
          status: 404,
        }
      );
    }

    user.notes.push(newNote._id);
    await user.save();

    const userNotes = await NoteModel.find({ _id: { $in: user?.notes } });

    return Response.json(
      {
        success: true,
        message: "Noted Added successfully",
        data: userNotes,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Unable to add note", error);
    return Response.json(
      {
        success: false,
        message: "Unable to add note",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const userSession = await getUser();
    const userId = userSession?._id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while adding note",
        },
        {
          status: 404,
        }
      );
    }
    const userNotes = await NoteModel.find({ _id: { $in: user?.notes } });

    return Response.json(
      {
        success: true,
        message: "Notes fetched successfully",
        data: userNotes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unable to get notes", error);
    return Response.json(
      {
        success: false,
        message: "Unable to get notes",
      },
      {
        status: 500,
      }
    );
  }
}
