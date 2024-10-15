import type { SignInAPIError } from "@/lib/definitions";
import { useSignInMutation } from "@/redux/features/authApiSlice";
import { signIn as signInAction } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

export function useSignInForm() {
  const formSchema = z.object({
    email: z.string().min(1, "Required field.").email("Enter correct email."),
    password: z.string().min(1, "Required field."),
  });

  type FormInputs = z.infer<typeof formSchema>;

  const [signIn, { isLoading }] = useSignInMutation();

  const dispatch = useAppDispatch();

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await signIn(data).unwrap();
      dispatch(signInAction());
      toast.success("Signed in.");
      navigate("/", { replace: true });
    } catch (error) {
      const apiError = error as SignInAPIError;
      const message = apiError.data.detail;
      form.setError("root", { type: "server", message });
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
}
