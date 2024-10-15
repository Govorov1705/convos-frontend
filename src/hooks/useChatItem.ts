import type { ChatWithRecentMessage, User } from "@/lib/definitions";
import { getOtherUser } from "@/lib/utils";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useClearChatMutation } from "@/redux/features/chatApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useChatItem(chat: ChatWithRecentMessage) {
  const {
    data: user,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useRetrieveUserQuery();

  const [clearChat] = useClearChatMutation();

  const handleClearChat = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      event.stopPropagation();
      await clearChat(chat.id).unwrap();
    } catch (error) {
      toast.error("An error occured.");
    }
  };

  const navigate = useNavigate();

  const otherUser = getOtherUser(chat.members, user as User);

  return {
    isUserFetching,
    isUserError,
    navigate,
    otherUser,
    handleClearChat,
  };
}
