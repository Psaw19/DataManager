"use client";

import Link from "next/link";
import Logout from "../logout/Logout";
import { ThemeToggler } from "./theme-toggler";
import useClientUser from "@/hooks/useClientUser";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const { loading, user } = useClientUser();
  const fallbackImage = user?.fullname
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join("");

  if (loading) {
    return (
      <div className="w-full mx-auto max-w-5xl h-[10%] flex justify-between">
        <div className="flex items-center gap-5">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-16 h-3" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-10 h-3" />
          </div>
          <Skeleton className="w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto max-w-5xl h-[10%] flex justify-between">
      <div className="flex items-center pr-8">
        <Link href="/">Home</Link>
      </div>

      {user && (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-x-8">
            <Link href="/credentials">Credentials</Link>
            <Link href="/notes">Notes</Link>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>{fallbackImage as string}</AvatarFallback>
              </Avatar>
              <p className=" text-xs whitespace-nowrap">{user.fullname}</p>
            </div>

            <Logout />
          </div>
        </div>
      )}

      {!user && (
        <div className="flex gap-8 items-center w-full">
          <Link href="/login">Login</Link>
          <Link href="/sign-up">Signup</Link>
        </div>
      )}

      <div className="flex items-center ml-1">
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Navbar;
