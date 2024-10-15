import type { Message } from "@/lib/definitions";
import { getTimeFromString } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Message({ message }: { message: Message }) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-10 h-10 flex-shrink-0 self-start">
        <AvatarFallback className="bg-[#e6edf4]">
          {message.sender.first_name.slice(0, 1)}
          {message.sender.last_name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex gap-1 items-center text-muted-foreground">
          <p className="text-sm font-medium text-foreground break-all line-clamp-1">
            {message.sender.first_name} {message.sender.last_name}
          </p>
          <p className="text-sm">{getTimeFromString(message.sent_at)}</p>
        </div>
        <p className="text-sm break-all">{message.text}</p>
      </div>
    </div>
  );
}
