import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface ChatMessageProps {
  message: string;
  sender: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
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
        "flex mb-2",
        sender === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "rounded-[20px] max-w-[85%] w-fit py-2 px-4 leading-5 text-base overflow-wrap",
          sender === "user"
            ? "bg-gradient-to-br from-[#272ddc] to-[#07aff9] text-white"
            : "bg-gray-200 text-gray-950"
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
