import type { AuthVariant } from "@/lib/definitions";
import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function Auth() {
  const [authVariant, setAuthVariant] = useState<AuthVariant>("signIn");

  if (authVariant === "signIn") {
    return <SignIn setAuthVariant={setAuthVariant} />;
  }

  if (authVariant === "signUp") {
    return <SignUp setAuthVariant={setAuthVariant} />;
  }
}
