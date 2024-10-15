import { useChatForm } from "@/hooks/useChatForm";
import { CornerDownLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";

type Props = {
  chatSocketRef: React.MutableRefObject<WebSocket | undefined>;
};

export default function ChatForm({ chatSocketRef }: Props) {
  const { form, onSubmit, handleOnKeyDown } = useChatForm(chatSocketRef);

  return (
    <Form {...form}>
      <form
        className="overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Message</FormLabel>
              <FormControl>
                <Textarea
                  onKeyDown={handleOnKeyDown}
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
