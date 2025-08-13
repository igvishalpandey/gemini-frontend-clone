import React, { useCallback } from "react";
import { DeleteOutline } from "@mui/icons-material";

interface ChatroomItemProps {
  id: string;
  name: string;
  lastMessage: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selected: boolean;
}

const ChatroomItem: React.FC<ChatroomItemProps> = ({
  id,
  name,
  lastMessage,
  onSelect,
  onDelete,
  selected,
}) => {
  const handleSelect = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(id);
    },
    [id, onDelete]
  );

  return (
    <li
      className={`flex justify-between items-center py-3 px-4 rounded cursor-pointer ${
        selected
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-100 dark:hover:bg-zinc-800"
      }`}
      onClick={handleSelect}
    >
      <div className="flex flex-col overflow-hidden max-w-[70%]">
        <p className="font-semibold truncate text-base">{name}</p>
        <p className="text-sm opacity-80 truncate">
          {lastMessage || "No messages yet"}
        </p>
      </div>

      <div className="flex flex-col items-end space-y-1 max-w-[25%] overflow-hidden">
        <button
          onClick={handleDelete}
          aria-label={`Delete ${name}`}
          className={`p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200 ${
            selected ? "text-white" : "text-red-600 hover:text-red-700"
          }`}
        >
          <DeleteOutline fontSize="small" />
        </button>
      </div>
    </li>
  );
};

export default ChatroomItem;
