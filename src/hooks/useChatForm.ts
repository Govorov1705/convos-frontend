import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useChatForm(
  chatSocketRef: React.MutableRefObject<WebSocket | undefined>
) {
  const formSchema = z.object({
    message: z.string().min(1).max(500),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const text = data.message.trim();

    if (text) {
      const message = {
        event: "message",
        message: text,
      };
      chatSocketRef.current?.send(JSON.stringify(message));
    }

    form.reset();
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return {
    form,
    onSubmit,
    handleOnKeyDown,
  };
}
