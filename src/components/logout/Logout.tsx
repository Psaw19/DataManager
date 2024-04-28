import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

const Logout = () => {
  const handleLogout = async () => {
    try {
      signOut();
    } catch (error) {
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
