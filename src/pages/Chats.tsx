import Spinner from "@/components/Spinner";
import { sortChatsByRecentMessage } from "@/lib/utils";
import { useListChatsWithRecentMessagesQuery } from "@/redux/features/chatApiSlice";
import ChatList from "../components/ChatList";

export default function Chats() {
  const {
    data: chats = [],
    isFetching,
    isSuccess,
    isError,
  } = useListChatsWithRecentMessagesQuery();

  const sortedChats = sortChatsByRecentMessage(chats);

  let content;
  if (isFetching) {
    content = <Spinner lg center />;
  } else if (isSuccess) {
    content = <ChatList chats={sortedChats} />;
  } else if (isError) {
    content = (
      <h3 className="mt-5 font-medium text-destructive mx-auto">
        Error loading chats...
      </h3>
    );
  }

  return (
    <main className="h-full rounded-xl border shadow lg:w-1/3 mx-auto bg-white">
      {content}
    </main>
  );
}
