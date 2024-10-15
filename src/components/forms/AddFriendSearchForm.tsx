import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddFriendSearchForm } from "@/hooks/useAddFriendSearchForm";
import { ScrollArea } from "../ui/scroll-area";
import UserSearchItem from "../UserSearchItem";

export default function AddFriendSearchForm() {
  const { form, debouncedEmail, users, refetch } = useAddFriendSearchForm();

  return (
    <div className="flex flex-col gap-5">
      <Form {...form}>
        <form>
          <div className="mb-2 text-[0.8rem] font-medium text-destructive">
            {form.formState.errors.root?.message}
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search..."
                    autoComplete="off"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <ScrollArea className="h-[250px] w-full rounded-md border p-3">
        {debouncedEmail &&
          users?.map((user) => (
            <UserSearchItem user={user} refetch={refetch} key={user.id} />
          ))}
      </ScrollArea>
    </div>
  );
}
