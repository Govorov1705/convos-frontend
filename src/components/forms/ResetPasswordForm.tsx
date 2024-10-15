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
import { useResetPasswordForm } from "@/hooks/useResetPasswordForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

export default function ResetPasswordForm({
  setIsFormFilledOut,
}: {
  setIsFormFilledOut: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { form, onSubmit, isLoading } =
    useResetPasswordForm(setIsFormFilledOut);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="flex flex-row items-center gap-1">
            <Link to={"/"}>
              <ArrowLeft size={20} className="mt-1.5 cursor-pointer" />
            </Link>
            <CardTitle className="text-xl">Account recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.root?.message}
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="mail@example.com"
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
                {isLoading ? <Spinner sm /> : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
