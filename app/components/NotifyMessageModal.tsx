import React from "react";
import clsx from "clsx";

interface NotifyMessageModalProps {
  notifiableMessageSuccess: boolean;
  message: string;
  handleMessageModal: () => void;
}
const NotifyMessageModal: React.FC<NotifyMessageModalProps> = ({
  notifiableMessageSuccess,
  message,
  handleMessageModal
}) => {
  return (
    <div
      className={`fixed left-0 right-0 w-full top-[90px] z-[102] flex items-center justify-center`}
    >
      <div className="w-[160px] sm:w-[350px]">
        <div className={clsx(
          "px-4 py-2 rounded mb-4 flex justify-between items-center",
          { "bg-green-100 border border-green-400 text-green-700" : notifiableMessageSuccess },
          { "bg-red-100 border border-red-400 text-red-700" : !notifiableMessageSuccess }
        )}>
          <p>{message}</p>
          <div
            onClick={() => handleMessageModal()}
            className="hover:text-white hover:bg-green-400 rounded-full cursor-pointer transition-colors"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyMessageModal;
