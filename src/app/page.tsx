"use client";

import { Button } from "@/components/ui/button";
import useClientUser from "@/hooks/useClientUser";
import { Quote } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { loading, user } = useClientUser();

  return (
    <div
      className={`w-full h-full flex flex-col items-center ${
        user ? "pt-32" : "justify-center"
      } space-y-10`}
    >
      {user && (
        <h2 className="text-2xl font-medium">{`Welcome ${user?.fullname},`}</h2>
      )}
      <div className="text-3xl font-semibold opacity-80 text-center relative">
        <div className=" flex justify-between opacity-30 absolute z-50 w-full">
          <Quote className="rotate-180 h-16 w-16 -translate-x-10 -translate-y-10" />
          <Quote className="w-16 h-16 translate-x-10 -translate-y-10" />
        </div>
        <h1>Cipher your notes, fortify your passwords.</h1>
        <h1>Step into your secure realm for peace and privacy.</h1>
      </div>
      {user && (
        <div className="flex gap-10">
          <Link href="/credentials">
            <Button disabled={loading} className="text-xl px-8 py-6">
              Passwords
            </Button>
          </Link>
          <Link href="/notes">
            <Button disabled={loading} className="text-xl px-8 py-6">
              Notes
            </Button>
          </Link>
        </div>
      )}
      {!user && (
        <div className="flex gap-10">
          <Link href="/login">
            <Button className="text-xl px-8 py-6">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-xl px-8 py-6">Signup</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
