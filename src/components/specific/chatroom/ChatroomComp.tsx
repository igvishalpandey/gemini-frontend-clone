import React, { useEffect, useRef, useState, useCallback } from "react";
import { useChat } from "../../../hooks/useChat";
import { MessageTile } from "../../";
import { ImageOutlined, SendRounded } from "@mui/icons-material";

interface ChatroomCompProps {
  id: string;
}

const ChatroomComp: React.FC<ChatroomCompProps> = ({ id }) => {
  const {
    messages,
    isTyping,
    sendText,
    sendImage,
    simulateAIReply,
    loadOlder,
  } = useChat(id);

  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleSendMessage = useCallback(() => {
    const message = input.trim();
    if (!message) return;
    sendText(message);
    setInput("");
    simulateAIReply();
  }, [input, sendText, simulateAIReply]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        sendImage(reader.result as string);
        simulateAIReply();
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [sendImage, simulateAIReply]
  );

  const handleAttachClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (e.currentTarget.scrollTop === 0) loadOlder();
    },
    [loadOlder]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSendMessage();
    },
    [handleSendMessage]
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
      >
        {messages.map((msg) => (
          <MessageTile key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="text-xs italic text-zinc-500 dark:text-zinc-400">
            typing...
          </div>
        )}

        <div ref={endRef} />
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto p-3 flex items-center gap-2">
          <button
            onClick={handleAttachClick}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            title="Attach image"
          >
            <ImageOutlined />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />

          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            onClick={handleSendMessage}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
            title="Send"
          >
            <SendRounded />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatroomComp;
