import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from "@/redux/features/friendsApiSlice";
import { toast } from "react-toastify";

export function useFriendRequestItem(friendRequestId: number) {
  const [acceptFriendRequest, { isLoading: isAcceptLoading }] =
    useAcceptFriendRequestMutation();

  const [declineFriendRequest, { isLoading: isDeclineLoading }] =
    useDeclineFriendRequestMutation();

  const [cancelFriendRequest, { isLoading: isCancelLoading }] =
    useCancelFriendRequestMutation();

  const handleAccept = async () => {
    try {
      await acceptFriendRequest(friendRequestId).unwrap();
      toast.success("Request accepted.");
    } catch (error) {
      toast.error("An error occured.");
    }
  };

  const handleDecline = async () => {
    try {
      await declineFriendRequest(friendRequestId).unwrap();
      toast.info("Request declined.");
    } catch (error) {
      toast.error("An error occured.");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelFriendRequest(friendRequestId).unwrap();
      toast.info("Request canceled.");
    } catch (error) {
      toast.error("An error occured.");
    }
  };

  return {
    handleAccept,
    isAcceptLoading,
    handleDecline,
    isDeclineLoading,
    handleCancel,
    isCancelLoading,
  };
}
