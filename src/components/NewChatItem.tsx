import { useNewChatItem } from "@/hooks/useNewChatItem";
import { User } from "@/lib/definitions";
import { MessageCircleMore } from "lucide-react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

export default function NewChatItem({ friend }: { friend: User }) {
  const { handleCreateChat, isCreateChatLoading } = useNewChatItem();

  return (
    <div className="flex items-center justify-between py-2">
      <div className="overflow-hidden">
        <p className="text-sm font-medium">{friend.email}</p>
        <p className="text-sm text-gray-500">
          {friend.first_name} {friend.last_name}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        aria-label={`Create chat with ${friend.first_name} ${friend.last_name}`}
        onClick={() => handleCreateChat(friend.id)}
      >
        {isCreateChatLoading ? <Spinner sm /> : <MessageCircleMore size={20} />}
      </Button>
    </div>
  );
}
