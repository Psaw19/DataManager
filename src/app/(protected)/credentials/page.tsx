import { CardWrapper } from "@/components/CardWrapper/CardWrapper";
import CredentialData from "@/components/Data/CredentialData";
import CredentialForm from "@/components/Form/CredentialForm";
import React from "react";

const page = () => {
  return (
    <div className="flex gap-10 justify-center w-full max-w-5xl mx-auto ">
      <CardWrapper heading="Credentials" subHeading="Add your credentials">
        <CredentialForm />
      </CardWrapper>
      <CredentialData />
    </div>
  );
};

export default page;
