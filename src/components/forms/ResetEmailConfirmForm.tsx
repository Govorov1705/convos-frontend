import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetEmailConfirmForm } from "@/hooks/useResetEmailConfirmForm";
import Spinner from "../Spinner";

type Props = {
  uid: string | undefined;
  token: string | undefined;
};

export default function ResetEmailConfirmForm({ uid, token }: Props) {
  const { form, onSubmit, isLoading } = useResetEmailConfirmForm({
    uid,
    token,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Email change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.root?.message}
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="new_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="off"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="re_new_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="off"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner sm /> : "Change email"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
