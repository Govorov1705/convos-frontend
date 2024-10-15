import type { SignUpAPIError, SignUpFormStatus } from "@/lib/definitions";
import { useSignUpMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function useSignUpForm(
  setFormStatus: React.Dispatch<React.SetStateAction<SignUpFormStatus>>
) {
  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, "Required field.")
        .email("Enter correct email.")
        .max(154, "Email must not be longer than 154 characters."),
      first_name: z
        .string()
        .min(1, "Required field.")
        .max(50, "First name must not be longer than 50 characters."),
      last_name: z
        .string()
        .min(1, "Required field.")
        .max(50, "Last name must not be longer than 50 characters."),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .max(50, "Password must not be longer than 50 characters.")
        .refine(
          (value) => /\D/.test(value),
          "Password must not consist only of numbers."
        ),
      re_password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .max(50, "Password must not be longer than 50 characters.")
        .refine(
          (value) => /\D/.test(value),
          "Password must not consist only of numbers."
        ),
    })
    .refine((schema) => schema.password === schema.re_password, {
      message: "Passwords don't match.",
      path: ["re_password"],
    });

  type FormInputs = z.infer<typeof formSchema>;

  const [signUp, { isLoading }] = useSignUpMutation();

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    try {
      await signUp(data).unwrap();
      setFormStatus({
        isFilledOut: true,
        email: data.email,
      });
    } catch (error) {
      const apiError = error as SignUpAPIError;
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
