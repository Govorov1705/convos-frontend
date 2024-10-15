import SignUpForm from "@/components/forms/SignUpForm";
import { useSignUp } from "@/hooks/useSignUp";
import { MessageSquareMore } from "lucide-react";
import type { AuthVariant } from "../lib/definitions";

type Props = {
  setAuthVariant: React.Dispatch<React.SetStateAction<AuthVariant>>;
};

export default function SignUp({ setAuthVariant }: Props) {
  const { isFilledOut, handleResend, setFormStatus } = useSignUp();

  return (
    <div className="h-full flex justify-center items-center">
      {isFilledOut ? (
        <div className="place-items-center px-6 lg:px-8">
          <div className="text-center">
            <MessageSquareMore className="mx-auto h-10 w-auto" />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Check your email
            </h1>
            <p className="mt-5">
              We have sent an email to your email address.
              <br />
              Activate your account by following the link in the email.
            </p>
            <p className="text-center text-sm mt-5">
              Didn&apos;t receive the letter?{" "}
              <span
                role="button"
                className="font-semibold leading-6 text-primary hover:text-primary/90"
                onClick={handleResend}
              >
                Resend
              </span>
            </p>
          </div>
        </div>
      ) : (
        <SignUpForm
          setFormStatus={setFormStatus}
          setAuthVariant={setAuthVariant}
        />
      )}
    </div>
  );
}
