import { CardWrapper } from "@/components/ui/derived/card-wrapper";
import CredentialData from "@/components/Data/Credentials/CredentialData";
import CredentialForm from "@/components/Form/Data/CredentialForm";
import React from "react";

const page = () => {
  return (
    <div className="flex gap-10 justify-center w-full max-w-5xl mx-auto ">
      <CardWrapper
        heading="Passwords"
        subHeading="Save your passwords securely"
      >
        <CredentialForm />
      </CardWrapper>
      <CredentialData />
    </div>
  );
};

export default page;
