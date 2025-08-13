import React, { useState, useEffect, useRef } from "react";
import { Add } from "@mui/icons-material";
import type { Chatroom } from "../../../types";
import { ChatroomList } from "../../";

interface SidebarProps {
  chatrooms: Chatroom[];
  onSelectChatroom: (id: string) => void;
  selectedChatroomId: string | null;
  onCreateChatroom: () => void;
  onDeleteChatroom: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chatrooms,
  onSelectChatroom,
  selectedChatroomId,
  onCreateChatroom,
  onDeleteChatroom,
}) => {
  const [searchVal, setSearchVal] = useState("");
  const debounceRef = useRef<number | null>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchVal(val), 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const filteredChatrooms = searchVal
    ? chatrooms.filter((c) =>
        c.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    : chatrooms;

  return (
    <aside
      className="
        w-72 flex flex-col border-r
        bg-white text-zinc-900
        dark:bg-zinc-900 dark:text-zinc-100
        border-zinc-200 dark:border-zinc-800
      "
    >
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">Chatrooms</h2>
        <button
          aria-label="Create new chatroom"
          onClick={onCreateChatroom}
          className="rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Create chat"
        >
          <Add />
        </button>
      </div>

      <div className="px-4 pt-3">
        <input
          type="text"
          placeholder="Search chatrooms…"
          onChange={onSearchChange}
          className="
            w-full rounded-lg border px-3 py-2 text-sm
            bg-white dark:bg-zinc-800
            border-zinc-300 dark:border-zinc-700
            placeholder-zinc-400 focus:outline-none
            focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      <div className="px-2 py-3 overflow-y-auto">
        <ChatroomList
          chatrooms={filteredChatrooms}
          onSelect={onSelectChatroom}
          onDelete={onDeleteChatroom}
          selectedId={selectedChatroomId}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
