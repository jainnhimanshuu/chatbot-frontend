import React, { useState, useRef } from "react";
import { IoSendSharp } from "react-icons/io5";
import { RiRobot2Line, RiAttachment2 } from "react-icons/ri";
import { BsEmojiLaughing } from "react-icons/bs";
import { cn } from "../../lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const msgInputRef = useRef<HTMLInputElement>(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const msg = e.target.value;
    setMessage(msg);
    setIsBtnDisabled(msg.trim() === "");
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const IconButton: React.FC<{ icon: React.ReactNode; title: string }> = ({
    icon,
    title,
  }) => (
    <div
      className="group text-slate-700 text-lg cursor-pointer relative data-title"
      data-title={title}
    >
      {icon}
    </div>
  );

  return (
    <div className="h-1/4 border-t border-slate-200 mx=r-2 ml-4 pt-1 pb-4">
      <input
        ref={msgInputRef}
        type="text"
        placeholder="Enter your message..."
        className="focus:ring-0 focus-visible:outline-none h-12 w-full  overflow-wrap mb-2"
        value={message}
        onChange={handleOnChange}
      />
      <div className="flex items-center gap-2 divide-x divide-slate-300">
        <IconButton
          icon={
            <RiRobot2Line className="group-hover:animate-bounce transition-all delay-200" />
          }
          title="More Bots"
        />
        <IconButton
          icon={
            <RiAttachment2 className="ml-2 group-hover:animate-bounce transition-all delay-200" />
          }
          title="Attachment"
        />
        <IconButton
          icon={
            <BsEmojiLaughing className="ml-2 group-hover:animate-bounce transition-all delay-200" />
          }
          title="emoji"
        />
      </div>
      <button
        onClick={handleSend}
        disabled={isBtnDisabled}
        className={cn(
          "absolute -right-4 bottom-8 rounded-full h-12 w-12 flex items-center justify-center text-2xl",
          isBtnDisabled
            ? "bg-slate-300 text-slate-700 cursor-default"
            : "bg-gradient-to-br from-[#272ddc] to-[#07aff9] text-white hover:from-white hover:text-blue-600 hover:to-white shadow-xl transition-all"
        )}
      >
        <IoSendSharp />
      </button>
    </div>
  );
};

export default ChatInput;
