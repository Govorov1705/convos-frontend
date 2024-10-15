import Spinner from "@/components/Spinner";
import { useActivateMutation } from "@/redux/features/authApiSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Activation() {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const [activate] = useActivateMutation();
  useEffect(() => {
    activate({ uid, token })
      .unwrap()
      .then(() => {
        toast.success("Account created.");
      })
      .catch((error) => {
        toast.error("Invalid token");
      })
      .finally(() => {
        navigate("/", { replace: true });
      });
  }, [uid, token]);
  return <Spinner lg center />;
}
