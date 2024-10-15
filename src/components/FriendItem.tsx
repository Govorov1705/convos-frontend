import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useFriendItem } from "@/hooks/useFriendItem";
import type { User } from "@/lib/definitions";
import { EllipsisVertical, UserX } from "lucide-react";
import Spinner from "./Spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function FriendItem({ friend }: { friend: User }) {
  const { isLoading, handleRemoveFriend } = useFriendItem(friend.id);

  return (
    <li className="flex items-center space-x-4 p-3 rounded-xl transition-colors border hover:bg-[#f5f6f8] border-muted">
      <Avatar className="w-12 h-12 flex-shrink-0">
        <AvatarFallback className="bg-[#e6edf4]">
          {friend.first_name.slice(0, 1)}
          {friend.last_name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-0 flex-1">
        <h4 className="text-sm font-medium break-all truncate">
          {friend.first_name} {friend.last_name}
        </h4>
        <div className="flex items-center flex-shrink-0 ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRemoveFriend()}>
                {isLoading ? (
                  <Spinner sm />
                ) : (
                  <div className="flex items-center gap-1">
                    <UserX size={20} />
                    <span className="text-sm">Remove</span>
                  </div>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </li>
  );
}
