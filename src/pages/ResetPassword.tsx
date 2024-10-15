import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { MessageSquareMore } from "lucide-react";
import { useState } from "react";

export default function ResetPassword() {
  const [isFormFilledOut, setIsFormFilledOut] = useState(false);

  return (
    <div className="h-full flex justify-center items-center">
      {!isFormFilledOut ? (
        <ResetPasswordForm setIsFormFilledOut={setIsFormFilledOut} />
      ) : (
        <div className="grid min-h-full place-items-center px-6 lg:px-8">
          <div className="text-center">
            <MessageSquareMore className="mx-auto h-10 w-auto" />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Check your email
            </h1>
            <p className="mt-5">
              We have sent an email to your email address.
              <br />
              Follow the link in the email to set a new password.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
