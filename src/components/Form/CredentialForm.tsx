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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PasswordInput } from "../ui/password-input";
import { UserCircle } from "lucide-react";
import { CredentialSchema } from "@/schemas";
import { useActions } from "@/hooks/useActions";

const CredentialForm = () => {
  const form = useForm<z.infer<typeof CredentialSchema>>({
    resolver: zodResolver(CredentialSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loading, actions, error } = useActions({
    method: "POST",
    dataVariant: "credentials",
  });

  const onSubmit = async (values: z.infer<typeof CredentialSchema>) => {
    await actions(values);

    if (!error) {
      form.reset();
    }
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
                      disabled={loading}
                      type="text"
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
                      disabled={loading}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CredentialForm;
