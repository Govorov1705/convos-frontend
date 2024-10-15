import { useSetup } from "@/hooks/useSetup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Setup() {
  useSetup();

  return <ToastContainer />;
}
