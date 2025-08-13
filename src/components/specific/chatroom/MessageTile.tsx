import React from "react";
import type { Message } from "../../../types";

interface MessageTileProps {
  message: Message;
}

const MessageTile: React.FC<MessageTileProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={[
          "relative group rounded-2xl px-3 py-2 shadow-sm max-w-[80%] md:max-w-[65%]",
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm",
        ].join(" ")}
      >
        {message.image && (
          <img
            src={message.image}
            alt="uploaded"
            className="rounded-xl mb-2 max-w-full"
          />
        )}

        {message.text && (
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        )}

        <div className="mt-1 text-[10px] opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageTile);
