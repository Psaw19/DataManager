"use client";

import { Quote } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import useClientUser from "@/hooks/useClientUser";
import MaxWidthWrapper from "@/components/ui/derived/max-width-wrapper";

export default function Home() {
  const { loading, user } = useClientUser();

  return (
    <MaxWidthWrapper
      className={`grid gap-5 md:gap-10 justify-center grid-rows-[auto_auto_auto] h-auto`}
    >
      <h2
        className={`text-xl mt-40 flex justify-center items-end font-medium md:text-2xl ${user ? "" : "opacity-0"}`}
      >{`Welcome ${user?.name?.split(" ")[0]},`}</h2>
      <div className="relative text-balance text-center text-2xl font-semibold w-fit opacity-80 md:text-3xl">
        <div className=" absolute z-50 flex w-full justify-between opacity-30">
          <Quote className="h-12 w-12 -translate-y-7 rotate-180 md:h-16 md:w-16 md:-translate-x-10 md:-translate-y-10" />
          <Quote className="h-12 w-12 -translate-y-7 md:h-16 md:w-16 md:-translate-y-10 md:translate-x-10 " />
        </div>
        <h1>Cipher your notes, fortify your passwords.</h1>
        <h1>Step into your secure realm for peace and privacy.</h1>
      </div>
      {user && (
        <div className="flex justify-center gap-5 sm:gap-10">
          <Link href="/credentials">
            <Button disabled={loading} className="px-8 py-6 text-xl">
              Credential
            </Button>
          </Link>
          <Link href="/notes">
            <Button disabled={loading} className="px-8 py-6 text-xl">
              Notes
            </Button>
          </Link>
        </div>
      )}
      {!user && (
        <div className="flex gap-5 justify-center md:gap-10">
          <Link href="/login">
            <Button className="px-8 py-6 text-xl">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="px-8 py-6 text-xl">Signup</Button>
          </Link>
        </div>
      )}
    </MaxWidthWrapper>
  );
}
