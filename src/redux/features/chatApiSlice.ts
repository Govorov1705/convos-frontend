import type {
  Chat,
  ChatWithMessages,
  ChatWithRecentMessage,
} from "@/lib/definitions";
import { apiSlice } from "../services/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listChats: builder.query<Chat[], void>({
      query: () => ({
        url: "chats/",
      }),
      providesTags: (result = [], error, arg) => [
        "Chats",
        ...result.map(({ id }) => ({ type: "Chat", id } as const)),
      ],
    }),
    createChat: builder.mutation<Chat, number>({
      query: (friendId) => ({
        url: "chats/",
        method: "POST",
        body: { user2_id: friendId },
      }),
      invalidatesTags: ["Chats"],
    }),
    retrieveChat: builder.query<Chat, number>({
      query: (id) => ({
        url: `chats/${id}/`,
      }),
      providesTags: (result, error, arg) => [{ type: "Chat", id: arg }],
    }),
    destroyChat: builder.mutation<void, number>({
      query: (id) => ({
        url: `chats/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Chat", id: arg }],
    }),
    listChatsWithRecentMessages: builder.query<ChatWithRecentMessage[], void>({
      query: () => ({
        url: "/chats/with-recent-messages",
      }),
      providesTags: (result = [], error, arg) => [
        "Chats",
        ...result.map(({ id }) => ({ type: "Chat", id } as const)),
      ],
    }),
    retrieveChatWithMessages: builder.query<ChatWithMessages, number>({
      query: (id) => ({
        url: `chats/${id}/with-messages`,
      }),
      providesTags: (result, error, arg) => [{ type: "Chat", id: arg }],
    }),
    clearChat: builder.mutation<void, number>({
      query: (id) => ({
        url: `chats/${id}/clear/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Chat", id: arg }],
    }),
  }),
});

export const {
  useListChatsQuery,
  useCreateChatMutation,
  useRetrieveChatQuery,
  useDestroyChatMutation,
  useListChatsWithRecentMessagesQuery,
  useRetrieveChatWithMessagesQuery,
  useClearChatMutation,
} = chatApiSlice;
