import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddFriendSearchForm from "./forms/AddFriendSearchForm";
import { Button } from "./ui/button";

export default function AddFriendModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={20} />
          Add a friend
        </Button>
      </DialogTrigger>
      <DialogContent className="break-all">
        <DialogHeader>
          <DialogTitle>New friend</DialogTitle>
          <DialogDescription>
            Search for the user you want to be friends with. Start typing the
            user&apos;s email.
          </DialogDescription>
        </DialogHeader>
        <AddFriendSearchForm />
      </DialogContent>
    </Dialog>
  );
}
