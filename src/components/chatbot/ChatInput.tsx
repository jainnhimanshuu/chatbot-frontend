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

const IconButton: React.FC<{
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}> = React.memo(({ icon, title, onClick }) => (
  <div
    onClick={onClick}
    className="group text-slate-700 text-lg cursor-pointer relative"
    data-title={title}
  >
    {icon}
  </div>
));

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  toggleEmojiPanel,
  message,
  setMessage,
}) => {
  const msgInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const msg = e.target.value;
      setMessage(msg);
    },
    [setMessage]
  );

  const handleSend = useCallback(
    (isEnterPressed?: boolean) => {
      setIsButtonClicked(true);
      setTimeout(() => setIsButtonClicked(false), 300);
      if (message.trim() !== "") {
        onSend(message);
        if (!isEnterPressed) toggleEmojiPanel();
        setMessage("");
      }
    },
    [message, onSend, toggleEmojiPanel, setMessage]
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected file:", file.name);
      }
    },
    []
  );

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend(true);
      }
    },
    [handleSend]
  );

  return (
    <div className="relative h-1/6 lg:h-1/4 border-t border-slate-200 mx=r-2 ml-4 pt-1 pb-4">
      <textarea
        ref={msgInputRef}
        placeholder="Enter your message..."
        className="focus:ring-0 focus-visible:outline-none h-12 w-full overflow-wrap mb-2 resize-none"
        value={message}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleFileSelect}
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
          onClick={() => fileInputRef.current?.click()}
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
        onClick={() => {
          handleSend();
        }}
        aria-label="Send message"
        className={cn(
          "absolute right-0 lg:-right-4 bottom-8 rounded-full h-12 w-12 flex items-center justify-center text-2xl cursor-pointer",
          "bg-gradient-to-br from-[#272ddc] to-[#07aff9] text-white hover:from-white hover:text-blue-600 hover:to-white shadow-xl transition-all"
        )}
      >
        {isButtonClicked && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        )}
        <IoSendSharp />
      </button>
    </div>
  );
};

export default ChatInput;
