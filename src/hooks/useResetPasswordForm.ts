import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function useResetPasswordForm(
  setIsFormFilledOut: React.Dispatch<React.SetStateAction<boolean>>
) {
  const formSchema = z.object({
    email: z.string().min(1, "Required field.").email("Enter correct email."),
  });

  type FormInputs = z.infer<typeof formSchema>;

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    try {
      await resetPassword(data.email).unwrap();
      setIsFormFilledOut(true);
    } catch (error) {
      form.setError("root", { message: "Error sending letter." });
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
}
