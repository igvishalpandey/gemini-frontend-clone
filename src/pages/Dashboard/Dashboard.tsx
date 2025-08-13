import { useCallback, useEffect, useState } from "react";
import type { Chatroom } from "../../types";
import { ChatroomComp, ConfirmationModal, Sidebar } from "../../components";
import { Menu, Close } from "@mui/icons-material";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constant";
import { generateId } from "../../hooks";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [selectedChatroomId, setSelectedChatroomId] = useState<string | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chatroomPendingDelete, setChatroomPendingDelete] =
    useState<Chatroom | null>(null);

  useEffect(() => {
    const chatRooms: Chatroom[] = [];

    let index = 1;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("chatroom_messages_")) {
        const chatroomId = key.replace("chatroom_messages_", "");
        const messages = JSON.parse(localStorage.getItem(key) || "[]");
        const lastMessage = messages.length
          ? messages[messages.length - 1]?.text || ""
          : "";
        chatRooms.push({
          id: chatroomId,
          name: `Chat ${chatroomId}`,
          lastMessage,
        });
        index++;
      }
    }

    setChatrooms(chatRooms);
  }, []);

  useEffect(() => {
    if (!selectedChatroomId && chatrooms.length > 0) {
      setSelectedChatroomId(chatrooms[0].id);
    }
  }, [selectedChatroomId, chatrooms]);

  const onSelectChatroom = useCallback((id: string) => {
    setSelectedChatroomId(id);
  }, []);

  const onCreateChatroom = useCallback(() => {
    const newId = generateId();
    const newChatroom: Chatroom = {
      id: newId,
      name: `Chat ${newId}`,
      lastMessage: "",
    };

    setChatrooms((prev) => [newChatroom, ...prev]);
    setSelectedChatroomId(newId);
    setSidebarOpen(false);

    localStorage.setItem(`chatroom_messages_${newId}`, JSON.stringify([]));
  }, [chatrooms.length]);

  const handleDeleteClick = useCallback(
    (chatroomId: string) => {
      const room = chatrooms.find((item) => item.id === chatroomId);
      if (!room) {
        toast.error(TOAST_MESSAGES.FAILED_TO_DELETE_CHATROOM);
        return;
      }
      setChatroomPendingDelete(room);
      setModalOpen(true);
    },
    [chatrooms]
  );

  const confirmDeleteChatroom = useCallback(() => {
    if (!chatroomPendingDelete) return;

    const updatedChatrooms = chatrooms.filter(
      (item) => item.id !== chatroomPendingDelete.id
    );

    localStorage.removeItem(`chatroom_messages_${chatroomPendingDelete.id}`);

    if (selectedChatroomId === chatroomPendingDelete.id) {
      setSelectedChatroomId(
        updatedChatrooms.length ? updatedChatrooms[0].id : null
      );
    }

    toast.success(TOAST_MESSAGES.CHATROOM_DELETE_SUCCESS);
    setChatrooms(updatedChatrooms);
    setChatroomPendingDelete(null);
    setModalOpen(false);
  }, [chatrooms, chatroomPendingDelete, selectedChatroomId]);

  const handleCloseConfirmationModal = useCallback(() => {
    setModalOpen(false);
    setChatroomPendingDelete(null);
  }, []);

  const selectedChatroom = chatrooms.find(
    (chat) => chat.id === selectedChatroomId
  );

  return (
    <>
      <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="hidden md:flex">
          <Sidebar
            chatrooms={chatrooms}
            onSelectChatroom={onSelectChatroom}
            selectedChatroomId={selectedChatroomId}
            onCreateChatroom={onCreateChatroom}
            onDeleteChatroom={handleDeleteClick}
          />
        </div>

        <div className="md:hidden fixed left-0 right-0 z-40">
          <div className="flex items-center p-3">
            <button
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="mr-3 rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {sidebarOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`md:hidden fixed top-0 left-0 bottom-0 z-50 transform transition-transform duration-300 w-72 bg-white dark:bg-zinc-950 shadow-lg ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            chatrooms={chatrooms}
            onSelectChatroom={(id) => {
              onSelectChatroom(id);
              setSidebarOpen(false);
            }}
            selectedChatroomId={selectedChatroomId}
            onCreateChatroom={() => {
              onCreateChatroom();
              setSidebarOpen(false);
            }}
            onDeleteChatroom={handleDeleteClick}
          />
        </div>

        <div className="flex-1 bg-white dark:bg-zinc-950 p-6 overflow-auto">
          {selectedChatroom ? (
            <ChatroomComp key={selectedChatroom.id} id={selectedChatroom.id} />
          ) : (
            <p className="text-zinc-600 dark:text-zinc-300">
              Select a chatroom to start chatting.
            </p>
          )}
        </div>
      </div>

      {modalOpen && chatroomPendingDelete && (
        <ConfirmationModal
          title="Delete Chatroom"
          message={`Are you sure you want to delete "${chatroomPendingDelete.name}"? This action cannot be undone.`}
          onClose={handleCloseConfirmationModal}
          onConfirm={confirmDeleteChatroom}
          closeBtnText="Cancel"
          confirmBtnText="Delete"
          confirmBtnColor="bg-red-600 hover:bg-red-700"
        />
      )}
    </>
  );
};

export default Dashboard;
