import ResetEmailConfirmForm from "@/components/forms/ResetEmailConfirmForm";
import { useParams } from "react-router-dom";

export default function ResetEmailConfirm() {
  const { uid, token } = useParams();

  return (
    <div className="h-full flex justify-center items-center">
      <ResetEmailConfirmForm uid={uid} token={token} />
    </div>
  );
}
