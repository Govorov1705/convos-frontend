import { useClearChatMutation } from "@/redux/features/chatApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useChatHeader(chatId: number) {
  const [clearChat] = useClearChatMutation();

  const navigate = useNavigate();

  const handleClearChat = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      event.stopPropagation();
      await clearChat(chatId).unwrap();
      navigate("/chats");
    } catch (error) {
      toast.error("An error occured.");
    }
  };

  return {
    navigate,
    handleClearChat,
  };
}
