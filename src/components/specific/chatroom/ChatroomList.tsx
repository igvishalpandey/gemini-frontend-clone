import React from "react";
import ChatroomItem from "./ChatroomItem";
import type { Chatroom } from "../../../types";

interface ChatroomListProps {
  chatrooms: Chatroom[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
}

const ChatroomList: React.FC<ChatroomListProps> = ({
  chatrooms,
  onSelect,
  onDelete,
  selectedId,
}) => {
  if (!chatrooms.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
        No chats yet
      </div>
    );
  }

  const chatroomItems = chatrooms.map((chatroom) => (
    <ChatroomItem
      key={chatroom.id}
      id={chatroom.id}
      name={chatroom.name}
      lastMessage={chatroom.lastMessage}
      onSelect={onSelect}
      onDelete={onDelete}
      selected={chatroom.id === selectedId}
    />
  ));

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto max-h-[70vh]">
      {chatroomItems}
    </ul>
  );
};

export default React.memo(ChatroomList);
