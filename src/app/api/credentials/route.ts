import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { CredentialModel } from "@/models/credential.model";
import { NextRequest } from "next/server";
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
        message: "Internal:Unable to create Credential",
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

// export async function DELETE(request: NextRequest) {
//   console.log("............DELETE CREDENTIAL RUNNING..............");
//   await dbConnect();
//   try {
//     const userSession = await getUser();
//     const credentialId = request.nextUrl.searchParams.get("id");
//     // console.log({ userSession });
//     // console.log({ credentialId });

//     const user = await UserModel.findById(userSession?._id);
//     const credential = await CredentialModel.findById(credentialId);

//     if (!credential) {
//       return Response.json(
//         {
//           success: false,
//           message: "Credential not found",
//         },
//         {
//           status: 404,
//         }
//       );
//     }
//     console.log({ Credential: credential });

//     if (!user) {
//       return Response.json(
//         {
//           success: false,
//           message: "Unable to find user while deleting credential",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     if (!user?.credentials.includes(credentialId)) {
//       return Response.json(
//         {
//           success: false,
//           message: "Credential not found in user",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     await UserModel.findByIdAndUpdate(
//       { _id: user?._id },
//       {
//         $pull: {
//           credentials: credentialId,
//         },
//       },
//       { new: true }
//     );

//     await CredentialModel.findByIdAndDelete(credentialId);

//     return Response.json(
//       {
//         success: true,
//         message: "Credential deleted successfully",
//         user,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error("Unable to delete credential", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Internal:Unable to delete credential",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
