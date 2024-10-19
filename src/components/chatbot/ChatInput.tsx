import React, { useState, useRef, useCallback } from "react";
import { IoSendSharp } from "react-icons/io5";
import { RiRobot2Line, RiAttachment2 } from "react-icons/ri";
import { BsEmojiLaughing } from "react-icons/bs";
import { cn } from "../../lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  toggleEmojiPanel: () => void;
  message: string;
  setMessage: (msg: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  toggleEmojiPanel,
  message,
  setMessage,
}) => {
  const msgInputRef = useRef<HTMLTextAreaElement>(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const msg = e.target.value;
      setMessage(msg);
      setIsBtnDisabled(msg.trim() === "");
    },
    [setMessage]
  );

  const handleSend = useCallback(
    (isEnterPressed?: boolean) => {
      if (message.trim()) {
        onSend(message);
        if (!isEnterPressed) toggleEmojiPanel();
        setMessage("");
      }
    },
    [message, onSend, toggleEmojiPanel, setMessage]
  );

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        handleSend(true);
      } else {
        return;
      }
    },
    [handleSend]
  );

  const IconButton: React.FC<{
    icon: React.ReactNode;
    title: string;
    onClick?: () => void;
  }> = ({ icon, title, onClick }) => (
    <div
      onClick={onClick}
      className="group text-slate-700 text-lg cursor-pointer relative data-title"
      data-title={title}
    >
      {icon}
    </div>
  );

  return (
    <div className="relative h-1/6 lg:h-1/4 border-t border-slate-200 mx=r-2 ml-4 pt-1 pb-4">
      <textarea
        ref={msgInputRef}
        placeholder="Enter your message..."
        className="focus:ring-0 focus-visible:outline-none h-12 w-full  overflow-wrap mb-2 resize-none"
        value={message}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
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
          onClick={toggleEmojiPanel}
          icon={
            <BsEmojiLaughing className="ml-2 group-hover:animate-bounce transition-all delay-200" />
          }
          title="emoji"
        />
      </div>
      <button
        onClick={() => handleSend()}
        disabled={isBtnDisabled}
        aria-label="Send message"
        className={cn(
          "absolute right-0 lg:-right-4 bottom-8 rounded-full h-12 w-12 flex items-center justify-center text-2xl cursor-pointer",
          "bg-gradient-to-br from-[#272ddc] to-[#07aff9] text-white hover:from-white hover:text-blue-600 hover:to-white shadow-xl transition-all"
        )}
      >
        <IoSendSharp />
      </button>
    </div>
  );
};

export default ChatInput;
