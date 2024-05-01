import dbConnect from "@/lib/dbConnect";
import getUser from "@/lib/getUserFromServerSession";
import { NoteModel } from "@/models/note.model";
import { UserModel } from "@/models/user.model";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  await dbConnect();

  try {
    const userSession = await getUser();
    const userId = userSession?._id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while deleting note",
        },
        {
          status: 404,
        }
      );
    }
    const { id: noteId } = params;
    const { title, description } = await request.json();

    const updatedNote = await NoteModel.findByIdAndUpdate(noteId, {
      title,
      description,
    });

    if (!updatedNote) {
      console.error("Error in updating notes");
      return Response.json(
        {
          success: false,
          message: "Error in updating notes",
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
        message: "Note updated successfully",
        data: userNotes,
      },
      {
        status: 202,
      }
    );
  } catch (error) {
    console.error("Unable to update note", error);
    return Response.json(
      {
        success: false,
        message: "Unable to update note",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  await dbConnect();
  try {
    const userSession = await getUser();
    const userId = userSession?._id;
    const { id: noteId } = params;

    const user = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { notes: noteId } },
      { new: true }
    );

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user while deleting note",
        },
        {
          status: 404,
        }
      );
    }

    await NoteModel.findByIdAndDelete(noteId);
    const userNotes = await NoteModel.find({ _id: { $in: user?.notes } });

    return Response.json(
      {
        success: true,
        message: "Note deleted successfully",
        data: userNotes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unable to delete note", error);
    return Response.json(
      {
        success: false,
        message: "Unable to delete note",
      },
      {
        status: 500,
      }
    );
  }
}
