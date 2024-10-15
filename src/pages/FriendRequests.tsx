import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useListReceivedFriendRequestsQuery,
  useListSentFriendRequestsQuery,
} from "@/redux/features/friendsApiSlice";
import { useState } from "react";
import FriendRequestList from "../components/FriendRequestList";

type RequestVariant = "received" | "sent";

export default function FriendRequests() {
  const {
    data: receivedFriendRequests,
    isFetching: isReceivedFriendRequestsFetching,
    isSuccess: isReceivedFriendRequestsSuccess,
    isError: isReceivedFriendRequestsError,
  } = useListReceivedFriendRequestsQuery();

  const {
    data: sentFriendRequests,
    isFetching: isSentFriendRequestsFetching,
    isSuccess: isSentFriendRequestsSuccess,
    isError: isSentFriendRequestsError,
  } = useListSentFriendRequestsQuery();

  const [requestVariant, setRequestVariant] =
    useState<RequestVariant>("received");

  let content;

  if (isReceivedFriendRequestsFetching || isSentFriendRequestsFetching) {
    content = <Spinner lg center />;
  } else if (isReceivedFriendRequestsSuccess && isSentFriendRequestsSuccess) {
    content = (
      <>
        <div className="flex gap-2">
          <Button
            className={cn("w-20", {
              "bg-[#f4f4f5] cursor-default": requestVariant === "received",
            })}
            variant="outline"
            onClick={() => setRequestVariant("received")}
          >
            Received
          </Button>
          <Button
            className={cn("w-20", {
              "bg-[#f4f4f5] cursor-default": requestVariant === "sent",
            })}
            variant="outline"
            onClick={() => setRequestVariant("sent")}
          >
            Sent
          </Button>
        </div>
        <hr />
        {requestVariant === "received" ? (
          <FriendRequestList
            friendRequests={receivedFriendRequests}
            variant="received"
          />
        ) : (
          <FriendRequestList
            friendRequests={sentFriendRequests}
            variant="sent"
          />
        )}
      </>
    );
  } else if (isReceivedFriendRequestsError || isSentFriendRequestsError) {
    content = (
      <h3 className="mt-5 font-medium text-destructive mx-auto">
        Error loading friend requests...
      </h3>
    );
  }

  return (
    <main className="h-full flex flex-col gap-5 p-3 rounded-xl border shadow lg:w-1/3 mx-auto bg-white">
      {content}
    </main>
  );
}
