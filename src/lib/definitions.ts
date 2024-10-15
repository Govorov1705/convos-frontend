export type Auth = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type AuthVariant = "signIn" | "signUp";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export type SignUpFormStatus = {
  isFilledOut: boolean;
  email: null | string;
};

export type SignUpAPIError = {
  data: {
    email?: string[];
    first_name?: string[];
    last_name?: string[];
    password?: string[];
    re_password?: string[];
  };
  status: number;
};

export type SignInAPIError = {
  data: {
    detail?: string;
  };
  status: number;
};

export type ResetPasswordConfirmAPIError = {
  data: {
    new_password?: string[];
    re_new_password?: string[];
    token?: string[];
    uid?: string[];
  };
  status: number;
};

export type ResetEmailConfirmAPIError = {
  data: {
    new_email?: string[];
    re_new_email?: string[];
    token?: string[];
    uid?: string[];
  };
  status: number;
};

export type Chat = {
  id: number;
  members: User[];
  created_at: string;
};

export type Message = {
  id: number;
  sender: User;
  chat: Chat;
  text: string;
  sent_at: string;
};

export type ChatWithRecentMessage = {
  id: number;
  members: User[];
  created_at: string;
  recent_message: Message;
};

export type ChatWithMessages = {
  id: number;
  members: User[];
  created_at: string;
  messages: Message[];
};

export type FriendList = {
  id: number;
  user: User;
  friends: User[];
};

export type FriendRequest = {
  id: number;
  sender: User;
  receiver: User;
  is_pending: boolean;
  sent_at: string;
};
