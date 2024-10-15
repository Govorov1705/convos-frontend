import { User } from "@/lib/definitions";
import { useUpdateProfileMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isEqual } from "underscore";
import { z } from "zod";

export function useSettingsPersonal(user: User) {
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateProfileMutation();

  const formSchema = z.object({
    first_name: z
      .string()
      .min(1, "Required field.")
      .max(50, "First name must not be longer than 50 characters."),
    last_name: z
      .string()
      .min(1, "Required field.")
      .max(50, "Last name must not be longer than 50 characters."),
  });

  type FormInputs = z.infer<typeof formSchema>;

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user, form]);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    if (
      !isEqual(
        { first_name: user?.first_name, last_name: user?.last_name },
        { ...data }
      )
    ) {
      try {
        await updateProfile(data);
        toast.success("Profile updated.");
      } catch (error) {
        toast.error("Error updating profile.");
      }
    }
  };

  return {
    form,
    onSubmit,
    isUpdateLoading,
  };
}
