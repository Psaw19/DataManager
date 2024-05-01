import React from "react";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      toast.loading("Logging out");
      signOut();
      toast.dismiss();
      toast.success("Logged out");
    } catch (error) {
      toast.dismiss();
      toast.error("Error while Logging out");
      console.error("Error while logging out => ", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center gap-1">
          <LogOutIcon />
          <p className="text-xs">Logout</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleLogout()}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Logout;
