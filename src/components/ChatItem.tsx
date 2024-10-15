import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useChatItem } from "@/hooks/useChatItem";
import type { ChatWithRecentMessage } from "@/lib/definitions";
import { getTimeFromString } from "@/lib/utils";
import { EllipsisVertical, Trash2 } from "lucide-react";
import Spinner from "./Spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ChatItem({ chat }: { chat: ChatWithRecentMessage }) {
  const { isUserFetching, isUserError, navigate, otherUser, handleClearChat } =
    useChatItem(chat);

  if (isUserFetching) {
    return <Spinner lg center />;
  } else if (isUserError) {
    return (
      <h3 className="font-medium text-destructive">Error loading user...</h3>
    );
  }

  return (
    <li
      onClick={() => navigate(`/chats/${chat.id}`)}
      className="flex items-start space-x-4 p-3 rounded-xl transition-colors border cursor-pointer hover:bg-[#f5f6f8] border-muted"
    >
      <Avatar className="w-12 h-12 flex-shrink-0">
        <AvatarFallback className="bg-[#e6edf4]">
          {otherUser.first_name.slice(0, 1)}
          {otherUser.last_name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <p className="text-sm font-medium text-foreground truncate break-all mr-2">
            {otherUser.first_name} {otherUser.last_name}
          </p>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {getTimeFromString(chat.recent_message.sent_at)}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex items-center gap-1"
                    onClick={(event) => handleClearChat(event)}
                  >
                    <Trash2 size={20} />
                    <span className="text-sm">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <h4 className="text-sm break-all line-clamp-1 text-muted-foreground">
          {chat.recent_message.text}
        </h4>
      </div>
    </li>
  );
}
