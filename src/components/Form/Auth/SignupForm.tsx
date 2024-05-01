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
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Link from "next/link";
import { PasswordInput } from "../../ui/derived/password-input";
import { MailIcon, UserCircle } from "lucide-react";
import axios from "axios";
import { SignUpSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { FormError } from "../../ui/derived/form-error";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const SignupForm = () => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/sign-up";
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
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setError("");
    const { confirmPassword, ...formData } = values;
    toast.loading("Creating User...");

    try {
      startTransition(async () => {
        const response = await axios.post(url, formData);

        if (!response?.data?.success) {
          console.log(response);
          setError("Unable to register, please try again!");
        }
        form.reset();
        router.replace("/login");
        toast.dismiss();
        toast.success("User registered successfully");
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Unable to register user, Please try again after sometime");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="fullname"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="john_doe"
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
          <FormError message={error} />
          <Button disabled={isPending} className="w-full" type="submit">
            Submit
          </Button>
        </form>
        <div className="flex items-center justify-evenly w-full mx-auto my-4 before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
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
