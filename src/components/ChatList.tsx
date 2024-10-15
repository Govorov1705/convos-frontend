import type { ChatWithRecentMessage } from "@/lib/definitions";
import ChatItem from "./ChatItem";
import NewChatModal from "./NewChatModal";

export default function ChatList({
  chats,
}: {
  chats: ChatWithRecentMessage[];
}) {
  return (
    <div className="h-full flex flex-col gap-5 p-3">
      <div className="flex">
        <NewChatModal />
      </div>
      <hr />
      <div className="mb-5 flex-grow overflow-y-auto h-0">
        <ul aria-labelledby="chat-list-title" className="flex flex-col gap-2">
          {chats.map((chat) => (
            <ChatItem chat={chat} key={chat.id} />
          ))}
        </ul>
        {chats.length === 0 && (
          <p className="text-sm font-semibold text-center">
            You don&apos;t have any chats yet
          </p>
        )}
      </div>
    </div>
  );
}
