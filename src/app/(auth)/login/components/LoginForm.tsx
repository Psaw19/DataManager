"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/derived/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { FormError } from "@/components/ui/derived/form-error";

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
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    toast.loading("Logging in...");
    const { email, password } = values;

    startTransition(async () => {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(response);
      if (response?.error) {
        toast.dismiss();
        setError(response.error);
        return;
      }

      router.replace("/");
      toast.dismiss();
      toast.success("User logged in");
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
