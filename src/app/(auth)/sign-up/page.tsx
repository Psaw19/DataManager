import SignupForm from "@/app/(auth)/sign-up/components/SignupForm";
import { CardWrapper } from "@/components/ui/derived/card-wrapper";

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
