export const STORAGE_CHATROOMS_KEY = "chatrooms";
export const STORAGE_SELECTED_CHATROOM_KEY = "selectedChatroomId";
export const STORAGE_MESSAGES_PREFIX = "chatroom_messages_";
export const PAGE_SIZE = 20;

export const getMessagesKey = (chatroomId: string) =>
  `${STORAGE_MESSAGES_PREFIX}${chatroomId}`;