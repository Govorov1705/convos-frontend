import { useResendActivationMutation } from "@/redux/features/authApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import type { SignUpFormStatus } from "../lib/definitions";

export function useSignUp() {
  const [formStatus, setFormStatus] = useState<SignUpFormStatus>({
    isFilledOut: false,
    email: null,
  });

  const { isFilledOut, email } = formStatus;

  const [resendActivation] = useResendActivationMutation();

  const handleResend = async () => {
    try {
      await resendActivation(email).unwrap();
      toast.info("Email sent.");
    } catch (error) {
      toast.error("An error accured.");
    }
  };

  return {
    isFilledOut,
    handleResend,
    setFormStatus,
  };
}
