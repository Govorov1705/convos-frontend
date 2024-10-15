import type { FriendList } from "@/lib/definitions";

import AddFriendModal from "./AddFriendModal";
import FriendItem from "./FriendItem";

export default function FriendList({ friendList }: { friendList: FriendList }) {
  return (
    <div className="h-full flex flex-col gap-5 p-3">
      <div className="flex">
        <AddFriendModal />
      </div>
      <hr />
      <div className="mb-5 flex-grow overflow-y-auto h-0">
        <ul aria-labelledby="chat-list-title" className="flex flex-col gap-2">
          {friendList.friends.map((friend) => (
            <FriendItem friend={friend} key={friend.id} />
          ))}
        </ul>
        {friendList.friends.length === 0 && (
          <p className="text-sm font-semibold text-center">
            You don&apos;t have any friends yet
          </p>
        )}
      </div>
    </div>
  );
}
