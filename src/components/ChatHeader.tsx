import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatHeader } from "@/hooks/useChatHeader";
import type { User } from "@/lib/definitions";
import { ArrowLeft, EllipsisVertical, Trash2 } from "lucide-react";

type Props = { user: User; chatId: number };

export default function ChatHeader({ user, chatId }: Props) {
  const { navigate, handleClearChat } = useChatHeader(chatId);

  return (
    <div className="w-full flex justify-between items-center gap-5">
      <ArrowLeft
        size={20}
        onClick={() => navigate("/chats")}
        className="cursor-pointer"
      />
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground break-all line-clamp-1">
          {user.first_name} {user.last_name}
        </p>
      </div>
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
  );
}
