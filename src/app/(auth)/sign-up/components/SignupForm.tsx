"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { MailIcon, UserCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { PasswordInput } from "@/components/ui/derived/password-input";
import { SignUpSchema } from "@/schemas";
import { FormError } from "@/components/ui/derived/form-error";
import { AxiosResponseData } from "@/types";

const SignupForm = () => {
  const router = useRouter();

  const url =
    (process.env.NEXT_PUBLIC_BASE_URL_PROD ||
      process.env.NEXT_PUBLIC_BASE_URL) + "/auth/sign-up";
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [session, router]);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    if (isPending) {
      toast.loading("Registeri");
    }
    startTransition(async () => {
      try {
        const response: AxiosResponse<AxiosResponseData> = await axios.post(
          url,
          values
        );
        form.reset();
        router.replace("/login");
        toast.dismiss();
        toast.success(response.data.message);
      } catch (error) {
        toast.dismiss();
        if (axios.isAxiosError<AxiosResponseData>(error)) {
          toast.error(error.response?.data.message as string);
        } else {
          toast.error("Unable to register user, Please try again later");
        }
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="John Doe"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                      suffix={<MailIcon className="opacity-80" />}
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isPending}
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError />
          <Button disabled={isPending} className="w-full" type="submit">
            Submit
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="w-full text-center">
          Already have an account?&nbsp;
          <Link
            className={`text-blue-500 hover:underline ${
              isPending ? "pointer-events-none" : ""
            }`}
            href="/login"
          >
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignupForm;
