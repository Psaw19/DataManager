import { Skeleton } from "@/components/ui/skeleton";

export const NotesSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 border rounded-lg p-4">
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-14" />
    </div>
  );
};

export const CredentialSkeleton = () => {
  return (
    <div className="space-y-3 border p-4 rounded-lg">
      <div className="w-full flex justify-between">
        <Skeleton className="w-[18%] h-5" />
        <Skeleton className="w-[78%] h-5" />
      </div>

      <div className="w-full flex justify-between">
        <Skeleton className="w-[18%] h-5" />
        <Skeleton className="w-[78%] h-5" />
      </div>
    </div>
  );
};
