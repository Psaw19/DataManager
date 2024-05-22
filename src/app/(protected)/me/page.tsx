import React from "react";

import MaxWidthWrapper from "@/components/ui/derived/max-width-wrapper";
import Profile from "./profile";

const page = () => {
  return (
    <MaxWidthWrapper className="flex justify-center mt-20">
      <Profile />
    </MaxWidthWrapper>
  );
};

export default page;
