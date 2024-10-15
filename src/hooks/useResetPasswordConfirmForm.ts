import { ResetPasswordConfirmAPIError } from "@/lib/definitions";
import { useConfirmPasswordResetMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

type Params = {
  uid: string | undefined;
  token: string | undefined;
};

export function useResetPasswordConfirmForm({ uid, token }: Params) {
  const formSchema = z
    .object({
      new_password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .max(50, "Password must not be longer than 50 characters.")
        .refine(
          (value) => /\D/.test(value),
          "Password must not consist only of numbers."
        ),
      re_new_password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .max(50, "Password must not be longer than 50 characters.")
        .refine(
          (value) => /\D/.test(value),
          "Password must not consist only of numbers."
        ),
    })
    .refine((schema) => schema.new_password === schema.re_new_password, {
      message: "Passwords don't match.",
      path: ["re_new_password"],
    });

  type FormInputs = z.infer<typeof formSchema>;

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      re_new_password: "",
    },
  });

  const [confirmPasswordReset, { isLoading }] =
    useConfirmPasswordResetMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    try {
      await confirmPasswordReset({ uid, token, ...data }).unwrap();
      toast.success("Password changed.");
      navigate("/", { replace: true });
    } catch (error) {
      const apiError = error as ResetPasswordConfirmAPIError;
      for (const [field, messages] of Object.entries(apiError.data)) {
        if (messages) {
          for (const message of messages) {
            form.setError(field as keyof FormInputs, {
              type: "server",
              message,
            });
          }
        }
      }
    }
  };
  return {
    form,
    onSubmit,
    isLoading,
  };
}
