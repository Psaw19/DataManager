"use client";

import axios from "axios";
import { FC } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface DeleteUserBtnProps {
  id: string;
  className?: string;
}

const DeleteUserBtn: FC<DeleteUserBtnProps> = ({ id, className }) => {
  const handleDelete = async () => {
    toast.loading("Deleting account");
    try {
      const url =
        process.env.NEXT_PUBLIC_BASE_URL_PROD ||
        process.env.NEXT_PUBLIC_BASE_URL + "/me/" + id;

      const res = await axios.delete(url);
      console.log(res);
      toast.dismiss();
      toast.success("account deleted");
      signOut();
    } catch (error) {
      toast.dismiss();
      toast.error("error");
    }
  };

  return (
    <Button
      className={cn("", className)}
      onClick={handleDelete}
      variant="destructive"
    >
      Delete Account
    </Button>
  );
};

export default DeleteUserBtn;
