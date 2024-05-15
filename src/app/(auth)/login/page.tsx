import LoginForm from "@/components/Form/Auth/LoginForm";
import { CardWrapper } from "@/components/ui/derived/card-wrapper";

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
