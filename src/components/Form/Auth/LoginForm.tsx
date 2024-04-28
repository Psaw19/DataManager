"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { UserCircle } from "lucide-react";
import { LoginSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormError } from "../form-error";

const LoginForm = () => {
  const router = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [session, router]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    const { username, password } = values;
    startTransition(async () => {
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      console.log(response?.error);
      if (response?.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("/");
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="username"
                      {...field}
                      suffix={<UserCircle className="opacity-80" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isPending}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />

          <Button disabled={isPending} className="w-full" type="submit">
            Login
          </Button>
        </form>
        <div className="flex items-center justify-evenly w-full mx-auto my-6 before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="w-full text-center">
          Don&apos;t have an account?&nbsp;
          <Link
            className={`text-blue-500 hover:underline ${
              isPending ? "pointer-events-none" : ""
            }`}
            href="/sign-up"
          >
            Register here
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
