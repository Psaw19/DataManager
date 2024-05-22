import React, { useRef, useState } from "react";
import { SquarePenIcon, UserCircle } from "lucide-react";
import { useForm } from "react-hook-form";
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
import DeleteButton from "@/components/ui/derived/delete-btn";
import { useActions } from "@/hooks/useActions";
import useOutsideClick from "@/hooks/useOutsideClick";
import { CredentialSchema } from "@/schemas";

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
  console.log("running..");
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

  const ref = useRef(null);
  const handleOutsideClick = () => {
    if (edit) {
      setEdit((edit) => !edit);
      form.reset();
    }
  };

  useOutsideClick(ref, handleOutsideClick);

  const onSubmit = async (values: z.infer<typeof CredentialSchema>) => {
    console.log("PUTTING FROM CREDENTIAL ACTIONS");

    await actions(values);

    if (!error) {
      setEdit(false);
    }
  };

  const onCancel = () => {
    setEdit((edit) => !edit);
    form.reset();
  };

  return (
    <div ref={ref} className="flex border rounded-md py-3 px-5 gap-5">
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
                  className="px-2 py-1 h-min "
                  type="submit"
                >
                  save
                </Button>
                <DeleteButton dataVariant="credentials" id={id} />
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={() => onCancel()}
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
        <button onClick={() => setEdit((edit) => !edit)}>
          <SquarePenIcon className="h-4 w-4 cursor-pointer opacity-70 hover:opacity-80" />
        </button>
      </div>
    </div>
  );
};

export default CredentialActions;
