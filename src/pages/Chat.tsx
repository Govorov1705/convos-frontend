import { useChat } from "@/hooks/useChat";
import type { User } from "@/lib/definitions";
import { getOtherUser } from "@/lib/utils";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import ChatForm from "../components/forms/ChatForm";
import MessageComponent from "../components/Message";
import Spinner from "../components/Spinner";

export default function Chat() {
  const { id } = useParams();
  const chatId = parseInt(id as string, 10);

  const {
    isLoading,
    isError,
    chat,
    messagesEndRef,
    friendList,
    chatSocketRef,
    user,
  } = useChat(chatId);

  if (isLoading) {
    return <Spinner lg center />;
  } else if (isError) {
    return (
      <h3 className="mt-5 font-medium text-destructive text-center">
        Error loading chat...
      </h3>
    );
  }

  const otherUser = getOtherUser(chat?.members as User[], user as User);

  return (
    <main className="w-full h-full flex flex-col p-3 rounded-xl border shadow lg:w-1/3 mx-auto bg-white">
      <ChatHeader user={otherUser} chatId={chat?.id as number} />

      <div className="flex-grow overflow-y-auto h-0 my-5 px-4 flex flex-col-reverse">
        <div className="flex flex-col gap-5">
          {chat?.messages.map((message) => (
            <MessageComponent message={message} key={message.id} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0">
        {friendList?.friends.find((friend) => friend.id === otherUser.id) ? (
          <ChatForm chatSocketRef={chatSocketRef} />
        ) : (
          <div className="text-sm font-semibold h-24 border rounded-xl flex items-center justify-center">
            <p>You can only chat with friends</p>
          </div>
        )}
      </div>
    </main>
  );
}
