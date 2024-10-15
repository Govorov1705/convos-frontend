import type { FriendList, FriendRequest, User } from "@/lib/definitions";
import { apiSlice } from "../services/apiSlice";

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveFriendList: builder.query<FriendList, void>({
      query: () => ({
        url: "/friends/friend_lists/my/",
      }),
      providesTags: ["FriendList"],
    }),
    createFriendRequest: builder.mutation<FriendRequest, number>({
      query: (receiver) => ({
        url: "/friends/friend_requests/",
        method: "POST",
        body: { receiver },
      }),
      invalidatesTags: ["SentFriendRequests"],
    }),
    listSentFriendRequests: builder.query<FriendRequest[], void>({
      query: () => ({
        url: "/friends/friend_requests/sent/",
      }),
      providesTags: ["SentFriendRequests"],
    }),
    listReceivedFriendRequests: builder.query<FriendRequest[], void>({
      query: () => ({
        url: "/friends/friend_requests/received/",
      }),
      providesTags: ["ReceivedFriendRequests"],
    }),
    acceptFriendRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: `/friends/friend_requests/${id}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["ReceivedFriendRequests", "FriendList"],
    }),
    declineFriendRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: `/friends/friend_requests/${id}/decline/`,
        method: "POST",
      }),
      invalidatesTags: ["ReceivedFriendRequests"],
    }),
    cancelFriendRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: `/friends/friend_requests/${id}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: ["SentFriendRequests"],
    }),
    removeFriend: builder.mutation<void, number>({
      query: (id) => ({
        url: `/friends/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FriendList"],
    }),
    addFriendSearch: builder.query<User[], string>({
      query: (email) => ({
        url: `/friends/add-friend-search/?email=${email}`,
      }),
      providesTags: ["AddFriendSearch"],
    }),
  }),
});

export const {
  useCreateFriendRequestMutation,
  useRetrieveFriendListQuery,
  useListSentFriendRequestsQuery,
  useListReceivedFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useCancelFriendRequestMutation,
  useRemoveFriendMutation,
  useAddFriendSearchQuery,
} = friendsApiSlice;
