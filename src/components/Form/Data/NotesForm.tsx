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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NoteSchema } from "@/schemas";
import { useActions } from "@/hooks/useActions";
import { AutosizeTextarea } from "@/components/ui/derived/autosize-textarea";

const NotesForm = () => {
  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { actions, loading, error } = useActions({
    method: "POST",
    dataVariant: "notes",
  });

  const onSubmit = async (values: z.infer<typeof NoteSchema>) => {
    console.log(values);
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
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
                      minHeight={100}
                      className="resize-y"
                      disabled={loading}
                      placeholder="Enter your description here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            Add Notes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NotesForm;
