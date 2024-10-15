import type { AuthVariant } from "@/lib/definitions";
import SignInForm from "./forms/SignInForm";

type Props = {
  setAuthVariant: React.Dispatch<React.SetStateAction<AuthVariant>>;
};

export default function SignIn({ setAuthVariant }: Props) {
  return (
    <div className="h-full flex justify-center items-center">
      <SignInForm setAuthVariant={setAuthVariant} />
    </div>
  );
}
