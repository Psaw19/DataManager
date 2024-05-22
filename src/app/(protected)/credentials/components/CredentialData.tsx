/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";

import CredentialActions from "@/app/(protected)/credentials/components/CredentialActions";
import { useActions } from "@/hooks/useActions";
import { useUserData } from "@/hooks/useUserData";
import { CredentialSkeleton } from "@/components/ui/derived/skeleton-template";

const CredentialData = () => {
  const { loading, actions } = useActions({
    method: "GET",
    dataVariant: "credentials",
  });

  const { credentials: data } = useUserData();
  useEffect(() => {
    console.log("GETTING FROM CREDENTIAL DATA");

    actions();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-[50%] flex flex-col gap-5">
        <CredentialSkeleton />
        <CredentialSkeleton />
        <CredentialSkeleton />
        <CredentialSkeleton />
        <CredentialSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[50%]">
      {data?.length === 0 ? (
        <div>
          <h1>You haven&apos;t added any credentials</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data?.map((ele) => (
            <div key={ele._id}>
              <CredentialActions
                username={ele.username}
                password={ele.password}
                id={ele._id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredentialData;
