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
import { NoteSchema } from "@/schemas";
import DeleteButton from "./delete-btn";
import { DataCardWrapper } from "../CardWrapper/DataCardWrapper";
import { SquarePenIcon } from "lucide-react";
import { useActions } from "@/hooks/useActions";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { useState } from "react";
import {
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "../ui/accordion";

interface NotesActionsProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  id: string;
  idx: number;
}

const NotesAction: React.FC<NotesActionsProps> = ({
  title,
  description,
  id,
  idx,
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

  const onSubmit = async (values: z.infer<typeof NoteSchema>) => {
    await actions(values);
  };
  return (
    <DataCardWrapper>
      <AccordionItem value={`item-${idx}`} className="w-full flex">
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

              <AccordionContent className="flex gap-2">
                <Button
                  variant="default"
                  disabled={loading}
                  className="bg-neutral-600 px-2 py-1 h-min "
                  type="submit"
                  onClick={() => {
                    if (edit) {
                      setEdit(false);
                    }
                  }}
                >
                  save
                </Button>
                <DeleteButton dataVariant="notes" id={id} />
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => setEdit(!edit)}
                  className="bg-neutral-100 text-bg-neutral-700 hover:bg-neutral-200 py-1 px-2 h-min"
                >
                  edit
                </Button>
              </AccordionContent>
            </form>
          </Form>
        </div>
        <div>
          <AccordionTrigger className="relative group">
            <SquarePenIcon className="h-4 w-4 cursor-pointer opacity-80 hover:opacity-100" />
          </AccordionTrigger>
        </div>
      </AccordionItem>
    </DataCardWrapper>
  );
};

export default NotesAction;
