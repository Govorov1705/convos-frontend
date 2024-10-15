import type { ResetEmailConfirmAPIError } from "@/lib/definitions";
import { useConfirmEmailResetMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

type Params = {
  uid: string | undefined;
  token: string | undefined;
};

export function useResetEmailConfirmForm({ uid, token }: Params) {
  const formSchema = z
    .object({
      new_email: z
        .string()
        .min(1, "Required field.")
        .email("Enter correct email.")
        .max(154, "Email must not be longer than 154 characters."),
      re_new_email: z
        .string()
        .min(1, "Required field.")
        .email("Enter correct email.")
        .max(154, "Email must not be longer than 154 characters."),
    })
    .refine((schema) => schema.new_email === schema.re_new_email, {
      message: "Emails don't match.",
      path: ["re_new_email"],
    });

  type FormInputs = z.infer<typeof formSchema>;

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_email: "",
      re_new_email: "",
    },
  });

  const [confirmEmailReset, { isLoading }] = useConfirmEmailResetMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    try {
      await confirmEmailReset({ uid, token, ...data }).unwrap();
      toast.success("Email changed.");
      navigate("/settings", { replace: true });
    } catch (error) {
      const apiError = error as ResetEmailConfirmAPIError;
      for (const [field, messages] of Object.entries(apiError.data)) {
        if (field !== "token" && field !== "uid") {
          if (messages) {
            for (const message of messages) {
              form.setError(field as keyof FormInputs, {
                type: "server",
                message,
              });
            }
          }
        } else {
          form.setError("root", {
            type: "server",
            message: "Invalid token.",
          });
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
