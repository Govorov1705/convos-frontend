import { User } from "@/lib/definitions";
import {
  useResetEmailMutation,
  useResetPasswordMutation,
} from "@/redux/features/authApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

export function useSettingsSecurity(user: User) {
  const [resetEmail, { isLoading: isEmailResetLoading }] =
    useResetEmailMutation();

  const [isEmailResetRequested, setIsEmailResetRequested] = useState(false);

  const [isPasswordResetRequested, setIsPasswordResetRequested] =
    useState(false);

  const [resetPassword, { isLoading: isPasswordResetLoading }] =
    useResetPasswordMutation();

  const handleEmailReset = async () => {
    try {
      await resetEmail(user?.email).unwrap();
      setIsEmailResetRequested(true);
      toast.info(
        `We have sent an email to your email address.
        Follow the link in the letter to change your email.`
      );
    } catch (error) {}
  };

  const handlePasswordReset = async () => {
    try {
      await resetPassword(user?.email).unwrap();
      setIsPasswordResetRequested(true);
      toast.info(
        `We have sent an email to your email address.
        Follow the link in the email to set a new password.`
      );
    } catch (error) {}
  };

  return {
    isEmailResetRequested,
    handleEmailReset,
    isEmailResetLoading,
    isPasswordResetRequested,
    handlePasswordReset,
    isPasswordResetLoading,
  };
}
