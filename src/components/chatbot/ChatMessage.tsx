import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

import { MdOutlineThumbUpOffAlt, MdThumbDownOffAlt } from "react-icons/md";

interface ChatMessageProps {
  message: string;
  sender: "user" | "bot";
  showRating?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  showRating,
}) => {
  const [audio] = useState(new Audio("/noti.mp3"));

  useEffect(() => {
    if (message && sender === "bot") {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [sender, audio, message]);

  return (
    <div
      className={cn(
        "flex ",
        sender === "user"
          ? "justify-end mb-8"
          : `justify-start ${showRating ? "mb-10" : "mb-2"} `
      )}
    >
      <div
        className={cn(
          "relative rounded-[20px] max-w-[85%] w-fit py-2 px-4 leading-5 text-base overflow-wrap",
          sender === "user"
            ? "bg-gradient-to-br from-[#272ddc] to-[#07aff9] text-white"
            : "bg-gray-200 text-gray-950"
        )}
      >
        {message}
        {showRating && (
          <div className="absolute -bottom-6 right-0 flex items-center gap-2">
            <p className="text-[10px] italic">Was this helpful?</p>
            <div className="flex items-center bg-white rounded-full p-0.5 divide-x divide-slate-700 w-16 h-8 shadow-xl">
              <div className="hover:bg-slate-300 bg-slate-200 rounded-l-full flex items-center justify-center w-8 h-full cursor-pointer text-blue-600">
                <MdOutlineThumbUpOffAlt />
              </div>
              <div className="hover:bg-slate-300 bg-slate-200 rounded-r-full flex items-center justify-center w-8 h-full cursor-pointer text-blue-600">
                <MdThumbDownOffAlt />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
