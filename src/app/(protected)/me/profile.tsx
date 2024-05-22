"use client";

import React from "react";

import useClientUser from "@/hooks/useClientUser";
import DeleteUserBtn from "./delete-user-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { user } = useClientUser();

  const fallbackImage = user?.name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div className=" border p-5 w-80 h-80 bg-white/5 rounded-lg flex items-center justify-center flex-col gap-3">
      <Avatar className="w-20 h-20">
        <AvatarImage src="" />
        <AvatarFallback className="text-2xl font-semibold">
          {fallbackImage as string}
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center flex-col w-full gap-1">
        <p className="text-3xl font-light">{user?.name}</p>
        <p className="font-medium">{user?.email}</p>
      </div>
      <DeleteUserBtn className="mt-8" id={user?._id as string} />
    </div>
  );
};

export default Profile;
