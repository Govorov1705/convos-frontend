import ResetPasswordConfirmForm from "@/components/forms/ResetPasswordConfirmForm";
import { useParams } from "react-router-dom";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();

  return (
    <div className="h-full flex justify-center items-center">
      <ResetPasswordConfirmForm uid={uid} token={token} />
    </div>
  );
}
