import { CardWrapper } from "@/components/ui/derived/card-wrapper";
import CredentialData from "@/app/(protected)/credentials/components/CredentialData";
import CredentialForm from "@/app/(protected)/credentials/components/CredentialForm";

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
