import { User } from "@/lib/definitions";
import { useCreateFriendRequestMutation } from "@/redux/features/friendsApiSlice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryActionCreatorResult,
  QueryDefinition,
} from "@reduxjs/toolkit/query/react";
import { UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

type Props = {
  user: User;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      string,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      | "User"
      | "Chats"
      | "Chat"
      | "FriendList"
      | "SentFriendRequests"
      | "ReceivedFriendRequests",
      User[],
      "api"
    >
  >;
};

export default function UserSearchItem({ user, refetch }: Props) {
  const [createFriendRequest, { isLoading }] = useCreateFriendRequestMutation();

  const handleAddFriend = async () => {
    try {
      await createFriendRequest(user.id).unwrap();
      refetch();
      toast.info("Friend request sent.");
    } catch (error) {
      console.log(error);
      toast.error("An error occured.");
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="overflow-hidden">
        <p className="text-sm font-medium">{user.email}</p>
        <p className="text-sm text-gray-500">
          {user.first_name} {user.last_name}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        aria-label={`Add ${user.first_name} ${user.last_name} to friends`}
        onClick={() => handleAddFriend()}
      >
        {isLoading ? <Spinner sm /> : <UserPlus size={20} />}
      </Button>
    </div>
  );
}
