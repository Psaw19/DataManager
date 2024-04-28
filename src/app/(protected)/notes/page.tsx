import { CardWrapper } from "@/components/CardWrapper/CardWrapper";
import NotesData from "@/components/Data/NotesData";
import NotesForm from "@/components/Form/NotesForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-between mx-auto p-5 gap-10 w-full max-w-5xl">
      <CardWrapper heading="Notes" subHeading="Add your notes here">
        <NotesForm />
      </CardWrapper>
      <NotesData />
    </div>
  );
};

export default page;
