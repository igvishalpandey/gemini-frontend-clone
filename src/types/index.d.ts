export interface Country {
  cca2: string;
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string };
}

export interface Chatroom {
  id: string;
  name: string;
  lastMessage: string;
}

export type Sender = "user" | "ai";

export interface Message {
  id: string;
  text?: string;
  image?: string;
  sender: Sender;
  timestamp: string;
}

export interface Chatroom {
  id: string;
  name: string;
  lastMessage?: string;
}
