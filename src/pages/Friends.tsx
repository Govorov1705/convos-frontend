import FriendList from "@/components/FriendList";
import { useRetrieveFriendListQuery } from "@/redux/features/friendsApiSlice";
import Spinner from "../components/Spinner";

export default function Friends() {
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
    content = <FriendList friendList={friendList} />;
  } else if (isFriendListError) {
    content = (
      <h3 className="mt-5 font-medium text-destructive text-center">
        Error loading friends...
      </h3>
    );
  }

  return (
    <main className="h-full rounded-xl border shadow lg:w-1/3 mx-auto bg-white">
      {content}
    </main>
  );
}
