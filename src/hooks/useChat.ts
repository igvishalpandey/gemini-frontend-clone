import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../types";
import { getMessagesKey, PAGE_SIZE, TOAST_MESSAGES } from "../constant";
import { generateId } from "./generateID";
import toast from "react-hot-toast";

export const useChat = (
  chatroomId: string | null,
  onNewMessage?: (text: string) => void
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const isReplyingRef = useRef(false);

  const loadMessages = useCallback(() => {
    if (!chatroomId) return [];
    try {
      const stored = localStorage.getItem(getMessagesKey(chatroomId));
      setMessages(stored ? JSON.parse(stored) : []);
    } catch {
      setMessages([]);
      toast.error(TOAST_MESSAGES.FAILED_TO_LOAD_MESSAGES);
    }
  }, [chatroomId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const addMessage = useCallback(
    (msg: Omit<Message, "id" | "timestamp">) => {
      if (!chatroomId) return;
      const newMsg: Message = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        ...msg,
      };

      setMessages((prev) => {
        const updatedMsg = [...prev, newMsg];
        localStorage.setItem(
          `chatroom_messages_${chatroomId}`,
          JSON.stringify(updatedMsg)
        );
        return updatedMsg;
      });

      if (msg.sender === "user" && onNewMessage) {
        onNewMessage(msg.text || "");
      }
    },
    [chatroomId, onNewMessage]
  );

  const sendText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      addMessage({ sender: "user", text: text.trim() });
    },
    [addMessage]
  );

  const sendImage = useCallback(
    (base64: string) => {
      addMessage({ sender: "user", image: base64 });
    },
    [addMessage]
  );

  const simulateAIReply = useCallback(() => {
    if (isReplyingRef.current) return;
    isReplyingRef.current = true;
    setIsTyping(true);

    setTimeout(() => {
      addMessage({ sender: "ai", text: "vishal has responded to your message!!" });
      setIsTyping(false);
      isReplyingRef.current = false;
    }, 2000);
  }, [addMessage]);

  const loadOlder = useCallback(() => {
    if (!chatroomId) return;
    const older: Message[] = Array.from({ length: PAGE_SIZE }).map((_, i) => ({
      id: generateId(),
      sender: Math.random() > 0.5 ? "user" : "ai",
      text: `Older message ${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 1e8).toISOString(),
    }));
    setMessages((prev) => {
      const updated = [...older, ...prev];
      localStorage.setItem(
        `chatroom_messages_${chatroomId}`,
        JSON.stringify(updated)
      );
      return updated;
    });
  }, [chatroomId]);

  return {
    messages,
    isTyping,
    sendText,
    sendImage,
    simulateAIReply,
    loadOlder,
  };
};
