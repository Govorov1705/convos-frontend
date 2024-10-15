import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { finishInitialLoading, signIn } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { apiSlice } from "@/redux/services/apiSlice";
import { useEffect, useRef } from "react";

export function useSetup() {
  const dispatch = useAppDispatch();

  const [verify] = useVerifyMutation();

  useEffect(() => {
    verify()
      .unwrap()
      .then(() => {
        dispatch(signIn());
      })
      .catch(() => {})
      .finally(() => {
        dispatch(finishInitialLoading());
      });
  }, [dispatch, verify]);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const notificationsSocketRef = useRef<WebSocket>();
  // const [notificationsConnected, setNotificationsConnected] = useState(false);
  // const [notificationsConnectionError, setNotificationsConnectionError] =
  //   useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const url = `ws://localhost:8000/ws/notifications/`;
      notificationsSocketRef.current = new WebSocket(url);

      // notificationsSocketRef.current.onopen = () => {
      //   setNotificationsConnected(true);
      //   setNotificationsConnectionError(false);
      //   console.log("Notifications WS connection established");
      // };

      // notificationsSocketRef.current.onclose = () => {
      //   console.log("Notifications WS connection closed");
      // };

      // notificationsSocketRef.current.onerror = () => {
      //   setNotificationsConnected(false);
      //   setNotificationsConnectionError(true);
      //   console.error("Notifications WS connection: error");
      // };

      notificationsSocketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const eventType = data.event.split(".").pop();
        if (eventType === "message") {
          const chatId = data.chatId;
          dispatch(
            apiSlice.util.invalidateTags([
              "Chats",
              { type: "Chat", id: chatId },
            ])
          );
        } else if (eventType === "receivedFriendRequest") {
          dispatch(apiSlice.util.invalidateTags(["ReceivedFriendRequests"]));
        } else if (eventType === "acceptedFriendRequest") {
          dispatch(
            apiSlice.util.invalidateTags(["FriendList", "SentFriendRequests"])
          );
        } else if (eventType === "declinedFriendRequest") {
          dispatch(apiSlice.util.invalidateTags(["SentFriendRequests"]));
        } else if (eventType === "removedFriend") {
          dispatch(
            apiSlice.util.invalidateTags([
              "FriendList",
              "Chat",
              "AddFriendSearch",
            ])
          );
        } else if (eventType === "clearedChat") {
          const chatId = data.chatId;
          dispatch(
            apiSlice.util.invalidateTags([{ type: "Chat", id: chatId }])
          );
        }
      };

      return () => {
        notificationsSocketRef.current?.close();
      };
    }
  }, [isAuthenticated]);
}
