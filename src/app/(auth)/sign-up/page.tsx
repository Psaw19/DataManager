import SignupForm from "@/components/Form/Auth/SignupForm";
import { CardWrapper } from "@/components/CardWrapper/CardWrapper";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center">
      <CardWrapper
        heading="Register"
        subHeading="Enter into your private space"
      >
        <SignupForm />
      </CardWrapper>
    </div>
  );
};

export default page;
