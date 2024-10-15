import { useAddFriendSearchQuery } from "@/redux/features/friendsApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useAddFriendSearchForm() {
  const formSchema = z.object({
    email: z.string().min(1, "Required field."),
  });

  type FormInputs = z.infer<typeof formSchema>;

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = form.watch("email");
  const [debouncedEmail, setDebouncedEmail] = useState(email);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedEmail(email);
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [email]);

  const { data: users, refetch } = useAddFriendSearchQuery(debouncedEmail, {
    skip: debouncedEmail.length < 1,
  });

  return {
    form,
    debouncedEmail,
    users,
    refetch,
  };
}
