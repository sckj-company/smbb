export const MESSAGE_FILTERS = ["all", "unread", "archived"] as const;

export type MessageFilter = (typeof MESSAGE_FILTERS)[number];

export type Message = {
  id: string;
  name: string;
  phone: string;
  subject: string;
  body: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
};

export type MessagePatch = Partial<Pick<Message, "read" | "archived">>;
