import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

interface ChatbotHeaderProps {
  toggleChat: (isOpen: boolean) => void;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ toggleChat }) => {
  return (
    <div className="relative bg-gradient-to-br from-[#272ddc] to-[#07aff9] chat-header-bg text-white h-1/6 lg:h-1/4 rounded-t-xl flex flex-col pt-4 px-4">
      <div className="flex items-center justify-between mb-4 z-10">
        <div className="flex items-start gap-2">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="Avatar"
            className="object-cover h-8 w-8 rounded-full"
          />
          <div className="flex flex-col items-start gap-1">
            <p className="text-xs text-slate-100 leading-tight">Chat with</p>
            <p className="text-base text-white leading-3">Noobbot</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-white text-lg">
            <HiDotsVertical />
          </button>
          <button
            onClick={() => toggleChat(false)}
            className="text-white text-lg flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-200/15"
          >
            <IoIosArrowDown />
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center z-10">
        <span className="w-2 h-2 bg-green-600 animate-pulse rounded-full"></span>
        <p className="text-base text-white">
          We're online and ready to assist you!
        </p>
      </div>
    </div>
  );
};

export default ChatbotHeader;
