import { CardWrapper } from "@/components/ui/derived/card-wrapper";
import NotesData from "@/app/(protected)/notes/components/NotesData";
import NotesForm from "@/app/(protected)/notes/components/NotesForm";

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
