import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRetrieveFriendListQuery } from "@/redux/features/friendsApiSlice";
import { Plus } from "lucide-react";
import NewChatItem from "./NewChatItem";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export default function NewChatModal() {
  const {
    data: friendList,
    isFetching: isFriendListFetching,
    isSuccess: isFriendListSuccess,
    isError: isFriendListError,
  } = useRetrieveFriendListQuery();

  let content;
  if (isFriendListFetching) {
    content = <Spinner lg center />;
  } else if (isFriendListSuccess) {
    content = (
      <ScrollArea className="h-[250px] w-full rounded-md border p-3">
        {friendList.friends.map((friend) => (
          <NewChatItem friend={friend} key={friend.id} />
        ))}
      </ScrollArea>
    );
  } else if (isFriendListError) {
    content = (
      <h3 className="mt-5 font-medium text-destructive mx-auto">
        Error loading friends...
      </h3>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={20} />
          New chat
        </Button>
      </DialogTrigger>
      <DialogContent className="break-all">
        <DialogHeader>
          <DialogTitle>New chat</DialogTitle>
          <DialogDescription>
            Choose a friend you want to start a chat with.
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
