"use client";

import { SquarePenIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { NoteSchema } from "@/schemas";
import DeleteButton from "@/components/ui/derived/delete-btn";
import { useActions } from "@/hooks/useActions";
import { AutosizeTextarea } from "@/components/ui/derived/autosize-textarea";
import useOutsideClick from "@/hooks/useOutsideClick";

interface NotesActionsProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  id: string;
}

const NotesAction: React.FC<NotesActionsProps> = ({
  title,
  description,
  id,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const { actions, loading } = useActions({
    method: "PUT",
    dataVariant: "notes",
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

  const watchedValues = useWatch({ control: form.control });
  const initialValues = form.formState.defaultValues;

  const hasChanges = Object.keys(watchedValues).some((key) => {
    const watchedValue = watchedValues[key as keyof typeof watchedValues];
    const initialValue = initialValues?.[key as keyof typeof initialValues];
    return watchedValue?.trim() !== initialValue?.trim();
  });

  const getChangedValues = () => {
    const changedValues: Partial<z.infer<typeof NoteSchema>> = {};
    Object.keys(watchedValues).forEach((key) => {
      if (
        watchedValues[key as keyof typeof watchedValues] !==
        initialValues?.[key as keyof typeof initialValues]
      ) {
        changedValues[key as keyof typeof watchedValues] =
          watchedValues[key as keyof typeof watchedValues];
      }
    });
    return changedValues;
  };

  const onSubmit = async (values: z.infer<typeof NoteSchema>) => {
    if (hasChanges) {
      try {
        const updatedValues = getChangedValues();
        await actions(updatedValues);
        console.log({ updatedValues });
        console.log({ initialValues });
        // form.formState.defaultValues = updatedValues
        console.log(form.formState.defaultValues);
        setEdit(false);
        return;
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
    setEdit(false);
  };

  const onCancel = () => {
    setEdit((edit) => !edit);
    form.reset();
  };
  return (
    <div ref={ref} className="flex border rounded-md py-3 px-5 gap-5">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!edit ? (
              <div className="space-y-2 px-2">
                <p className="font-medium ">{title}</p>
                <ul>
                  {description.split("\n").map((ele, idx) => (
                    <li key={idx}>{ele} </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!edit || loading}
                          type="text"
                          placeholder="Add your title here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <AutosizeTextarea
                          className="resize-y"
                          disabled={!edit || loading}
                          placeholder="Enter your description here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {edit && (
              <div className="flex gap-4">
                <Button
                  variant="default"
                  disabled={loading || !hasChanges}
                  className="px-2 py-1 h-min "
                  type="submit"
                >
                  save
                </Button>
                <DeleteButton dataVariant="notes" id={id} />
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

export default NotesAction;
