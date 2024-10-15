import { useRemoveFriendMutation } from "@/redux/features/friendsApiSlice";
import { toast } from "react-toastify";

export function useFriendItem(friendId: number) {
  const [removeFriend, { isLoading }] = useRemoveFriendMutation();

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(friendId).unwrap();
    } catch (error) {
      toast.error("An error occured.");
    }
  };

  return {
    isLoading,
    handleRemoveFriend,
  };
}
