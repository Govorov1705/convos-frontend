import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useRetrieveChatWithMessagesQuery } from "@/redux/features/chatApiSlice";
import { useRetrieveFriendListQuery } from "@/redux/features/friendsApiSlice";
import { useEffect, useRef, useState } from "react";

export function useChat(chatId: number) {
  const {
    data: friendList,
    isFetching: isFriendListFetching,
    isError: isFriendListError,
  } = useRetrieveFriendListQuery();

  const chatSocketRef = useRef<WebSocket>();
  const [chatConnected, setChatConnected] = useState(false);
  const [chatConnectionError, setChatConnectionError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data: chat,
    isLoading: isChatLoading,
    isError: isChatError,
  } = useRetrieveChatWithMessagesQuery(chatId);

  const {
    data: user,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useRetrieveUserQuery();

  useEffect(() => {
    const chatURL = `ws://localhost:8000/ws/chat/${chatId}/`;
    chatSocketRef.current = new WebSocket(chatURL);

    chatSocketRef.current.onopen = () => {
      setChatConnected(true);
      setChatConnectionError(false);
      // console.log("Chat WS connection established");
    };

    chatSocketRef.current.onclose = () => {
      // console.log("Chat WS connection closed");
    };

    chatSocketRef.current.onerror = () => {
      setChatConnected(false);
      setChatConnectionError(true);
      // console.error("Chat WS connection: error");
    };

    return () => {
      chatSocketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const isLoading =
    isChatLoading || isUserFetching || !chatConnected || isFriendListFetching;
  const isError =
    isChatError || isUserError || chatConnectionError || isFriendListError;

  return {
    isLoading,
    isError,
    chat,
    messagesEndRef,
    friendList,
    chatSocketRef,
    user
  };
}
