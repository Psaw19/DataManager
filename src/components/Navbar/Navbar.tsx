"use client";

import Link from "next/link";
import Image from "next/image";

import Logout from "@/components/ui/derived/logout-btn";
import { ThemeToggler } from "@/components/ui/derived/theme-toggler";
import useClientUser from "@/hooks/useClientUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MaxWidthWrapper from "../ui/derived/max-width-wrapper";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { loading, user } = useClientUser();
  const { theme } = useTheme();
  const fallbackImage = user?.name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <MaxWidthWrapper className="flex h-[10%] justify-between mb-5">
      {loading ? (
        <>
          <div className="flex items-center gap-5 py-4">
            <Skeleton className="h-full w-12" />
          </div>

          <div className="flex items-center gap-5 py-4">
            <Skeleton className="h-full w-20" />
            <Skeleton className="h-full w-20" />
            <Skeleton className="h-full w-8" />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center pr-8">
            <Link href="/">
              {theme === "light" ? (
                <Image
                  src="/logo-light.svg"
                  alt="logo"
                  width={50}
                  height={50}
                />
              ) : (
                <Image src="/logo-dark.svg" alt="logo" width={50} height={50} />
              )}
            </Link>
          </div>

          {user && (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-x-8">
                <Link href="/credentials">Passwords</Link>
                <Link href="/notes">Notes</Link>
              </div>
              <div className="flex items-center gap-x-5">
                <Link href="/me">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>{fallbackImage as string}</AvatarFallback>
                    </Avatar>
                    <p className=" whitespace-nowrap text-xs">
                      {user.name?.split(" ")[0]}
                    </p>
                  </div>
                </Link>

                <Logout />
              </div>
            </div>
          )}

          {!user && (
            <div className="flex w-full justify-end items-center gap-5">
              <Link href="/login">Login</Link>
              <Link href="/sign-up">Signup</Link>
            </div>
          )}

          <div className="ml-1 flex items-center">
            <ThemeToggler />
          </div>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Navbar;
