"use client";

import { useEffect } from "react";

import { useActions } from "@/hooks/useActions";
import { useUserData } from "@/hooks/useUserData";
import { NotesSkeleton } from "@/components/ui/derived/skeleton-template";
import NotesAction from "@/components/Data/Notes/NotesAction";

const NotesData = () => {
  const { loading, actions } = useActions({
    method: "GET",
    dataVariant: "notes",
  });

  const { notes: data } = useUserData();

  useEffect(() => {
    actions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-[50%]">
      {loading ? (
        <div className="flex flex-col gap-4">
          <NotesSkeleton />
          <NotesSkeleton />
          <NotesSkeleton />
          <NotesSkeleton />
        </div>
      ) : (
        <div>
          {data?.length === 0 && !loading ? (
            <div>
              <h1>You haven&apos;t added any notes</h1>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {data?.map(({ _id, title, description }, idx) => (
                <div key={_id}>
                  <NotesAction
                    title={title}
                    description={description}
                    id={_id}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesData;
