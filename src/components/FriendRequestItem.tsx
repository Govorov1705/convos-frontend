import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useFriendRequestItem } from "@/hooks/useFriendRequestItem";
import type { FriendRequest } from "@/lib/definitions";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

type Props = {
  friendRequest: FriendRequest;
  variant: "received" | "sent";
};

export default function FriendRequestItem({ friendRequest, variant }: Props) {
  const {
    handleAccept,
    isAcceptLoading,
    handleDecline,
    isDeclineLoading,
    handleCancel,
    isCancelLoading,
  } = useFriendRequestItem(friendRequest.id);

  return (
    <li className="flex items-center space-x-4 p-3 rounded-xl transition-colors border hover:bg-[#f5f6f8] border-muted">
      <Avatar className="w-12 h-12 flex-shrink-0">
        <AvatarFallback className="bg-[#e6edf4]">
          {friendRequest.sender.first_name.slice(0, 1)}
          {friendRequest.sender.last_name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-between w-0 flex-1 gap-1">
        <h4 className="text-sm font-medium break-all truncate">
          {variant === "received"
            ? `${friendRequest.sender.first_name} ${friendRequest.sender.last_name}`
            : `${friendRequest.receiver.first_name} ${friendRequest.receiver.last_name}`}
        </h4>
        <div className="flex items-center flex-shrink-0 gap-1">
          {variant === "received" ? (
            <>
              <Button className="w-full h-6" onClick={() => handleAccept()}>
                {isAcceptLoading ? <Spinner sm /> : "Accept"}
              </Button>
              <Button
                className="w-full h-6"
                variant={"destructive"}
                onClick={() => handleDecline()}
              >
                {isDeclineLoading ? <Spinner sm /> : "Decline"}
              </Button>
            </>
          ) : (
            <Button
              className="w-full h-6"
              variant={"destructive"}
              onClick={() => handleCancel()}
            >
              {isCancelLoading ? <Spinner sm /> : "Cancel"}
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
