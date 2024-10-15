import type { FriendRequest } from "@/lib/definitions";
import FriendRequestItem from "./FriendRequestItem";

type Props = {
  friendRequests: FriendRequest[];
  variant: "received" | "sent";
};

export default function FriendRequestList({ friendRequests, variant }: Props) {
  return (
    <div className="mb-5 flex-grow overflow-y-auto h-0">
      <ul aria-labelledby="chat-list-title" className="flex flex-col gap-2">
        {friendRequests.map((friendRequest) => (
          <FriendRequestItem
            key={friendRequest.id}
            friendRequest={friendRequest}
            variant={variant}
          />
        ))}
      </ul>
      {friendRequests.length === 0 && (
        <p className="text-sm font-semibold text-center">
          You don&apos;t have any {variant} requests yet
        </p>
      )}
    </div>
  );
}
