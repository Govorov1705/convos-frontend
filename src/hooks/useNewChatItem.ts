import { useCreateChatMutation } from "@/redux/features/chatApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useNewChatItem() {
  const [createChat, { isLoading: isCreateChatLoading }] =
    useCreateChatMutation();

  const navigate = useNavigate();

  const handleCreateChat = async (friendId: number) => {
    try {
      const response = await createChat(friendId).unwrap();
      navigate(`/chats/${response.id}`);
    } catch (error) {
      toast.error("An error occured.");
    }
  };

  return {
    handleCreateChat,
    isCreateChatLoading,
  };
}
