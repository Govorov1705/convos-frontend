import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChatWithRecentMessage, User } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOtherUser = (members: User[], user: User) => {
  return members.filter((member) => member.id !== user?.id)[0];
};

export const getTimeFromString = (string: string) => {
  const date = new Date(string);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const sortChatsByRecentMessage = (chats: ChatWithRecentMessage[]) => {
  const chatsCopy = [...chats];

  return chatsCopy.sort((a, b) => {
    const dateA = new Date(a.recent_message.sent_at);
    const dateB = new Date(b.recent_message.sent_at);
    return dateB.getTime() - dateA.getTime();
  });
};
