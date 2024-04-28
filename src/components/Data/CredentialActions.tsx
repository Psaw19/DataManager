import React, { useState, useTransition } from "react";
import { DataCardWrapper } from "../CardWrapper/DataCardWrapper";
import { SquarePenIcon } from "lucide-react";
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
import DeleteButton from "./delete-btn";
import { useActions } from "@/hooks/useActions";

interface CredentialActionsProps {
  children?: React.ReactNode;
  username: string;
  password: string;
  id: string;
}

const CredentialActions = ({
  username,
  password,
  id,
}: CredentialActionsProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CredentialSchema>>({
    resolver: zodResolver(CredentialSchema),
    defaultValues: {
      username: username,
      password: password,
    },
  });

  const { loading, error, actions } = useActions({
    method: "PUT",
    dataVariant: "credentials",
    id,
  });

  const onSubmit = async (values: z.infer<typeof CredentialSchema>) => {
    actions(values);

    if (!error) {
      setEdit(false);
    }
  };

  return (
    <DataCardWrapper>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel>Username: </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!edit || loading}
                        className="h-min py-1 px-3 disabled:opacity-70"
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
                  <FormItem className="flex space-y-0 gap-x-2 items-center">
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!edit || loading}
                        className="h-min py-1 px-3 disabled:opacity-70"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {edit && (
              <div className="flex gap-4">
                <Button
                  variant="default"
                  disabled={loading}
                  className="bg-neutral-600 px-2 py-1 h-min "
                  type="submit"
                >
                  save
                </Button>
                <DeleteButton dataVariant="credentials" id={id} />
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={() => setEdit((edit) => !edit)}
                  className="bg-neutral-100 text-bg-neutral-700 hover:bg-neutral-200 py-1 px-2 h-min"
                >
                  cancel
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
      <div>
        <div className="relative group">
          <SquarePenIcon
            className="h-4 w-4 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setEdit((edit) => !edit)}
          />
          <p className="absolute hidden items-center justify-center z-50 group-hover:flex text-[10px] bottom-full opacity-80">
            edit
          </p>
        </div>
      </div>
    </DataCardWrapper>
  );
};

export default CredentialActions;
