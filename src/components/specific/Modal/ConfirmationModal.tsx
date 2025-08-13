import React from "react";

interface ConfirmationModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  closeBtnText?: string;
  confirmBtnText?: string;
  confirmBtnColor?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onClose,
  onConfirm,
  closeBtnText = "Cancel",
  confirmBtnText = "Confirm",
  confirmBtnColor = "bg-red-600 hover:bg-red-700",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
        role="presentation"
      ></div>

      <div
        className="relative bg-white dark:bg-zinc-900 p-6 rounded-2xl max-w-sm w-full shadow-lg transform transition-all scale-95 animate-fadeIn"
        style={{ animation: "fadeInScale 0.2s ease-out" }}
      >
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {closeBtnText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${confirmBtnColor}`}
          >
            {confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
