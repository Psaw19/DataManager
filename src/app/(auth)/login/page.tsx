import LoginForm from "@/components/Form/Auth/LoginForm";
import { CardWrapper } from "@/components/CardWrapper/CardWrapper";
import React from "react";

const page = () => {
  return (
    <div className=" flex justify-center pt-10">
      <CardWrapper heading="Login" subHeading="Welcome back!!">
        <LoginForm />
      </CardWrapper>
    </div>
  );
};

export default page;
