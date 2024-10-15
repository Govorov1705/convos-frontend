import Spinner from "@/components/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettingsSecurity } from "@/hooks/useSettingsSecurity";
import { User } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { KeyRound, Mail } from "lucide-react";

export default function SettingsSecurity({ user }: { user: User }) {
  const {
    isEmailResetRequested,
    handleEmailReset,
    isEmailResetLoading,
    isPasswordResetRequested,
    handlePasswordReset,
    isPasswordResetLoading,
  } = useSettingsSecurity(user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <Mail className="self-center" />
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">Email</span>
              <span className="text-sm">{user.email}</span>
            </div>
          </div>
          {!isEmailResetRequested && (
            <button
              onClick={handleEmailReset}
              className={cn("text-sm self-center", {
                "text-primary": !isEmailResetLoading,
              })}
            >
              {isEmailResetLoading ? <Spinner sm /> : "Change"}
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <KeyRound />
            <span className="text-sm font-medium leading-none">Password</span>
          </div>
          {!isPasswordResetRequested && (
            <button
              onClick={handlePasswordReset}
              className={cn("text-sm", {
                "text-primary": !isPasswordResetLoading,
              })}
            >
              {isPasswordResetLoading ? <Spinner sm /> : "Change"}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
