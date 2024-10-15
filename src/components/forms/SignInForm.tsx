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
import { useSignInForm } from "@/hooks/useSignInForm";
import type { AuthVariant } from "@/lib/definitions";
import { Link } from "react-router-dom";

import Spinner from "../Spinner";

type Props = {
  setAuthVariant: React.Dispatch<React.SetStateAction<AuthVariant>>;
};

export default function SignInForm({ setAuthVariant }: Props) {
  const { form, onSubmit, isLoading } = useSignInForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Authorization</CardTitle>
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
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/auth/reset-password"
                          className="ml-auto inline-block text-sm underline text-primary hover:text-primary/90"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" {...field}></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner sm /> : "Sign in"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account yet?{" "}
              <button
                className="underline text-primary hover:text-primary/90 cursor-pointer"
                onClick={() => setAuthVariant("signUp")}
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
