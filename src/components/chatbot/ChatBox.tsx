import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatbotHeader from "./chatbotHeader";
import EmojiPicker from "emoji-picker-react";

const ChatBox: React.FC = () => {
  const [isEmojiPanelOpen, setIsEmojiPanelOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { message: string; sender: "user" | "bot" }[]
  >([{ message: "Hello! How can I help you today?", sender: "bot" }]);

  const handleSendMessage = useCallback((message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { message, sender: "user" },
    ]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, sender: "user" },
        { message: "Let me assist you with that.", sender: "bot" },
      ]);
    }, 1000);
  }, []);

  const handleEmojiClick = useCallback((emoji: { emoji: string }) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleEmojiPanel = () => {
    setIsEmojiPanelOpen((prev) => !prev);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed lg:bottom-10 lg:right-12 z-50 lg:h-4/5 h-full  bg-white rounded-2xl lg:max-w-xs w-full bottom-0 right-2 ">
      <ChatbotHeader />
      <div className="p-4 h-4/6 lg:h-2/4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />
        {isEmojiPanelOpen && (
          <div className="absolute bottom-24 left-0">
            <EmojiPicker
              width="20rem"
              height="24rem"
              onEmojiClick={handleEmojiClick}
            />
          </div>
        )}
      </div>
      <ChatInput
        onSend={handleSendMessage}
        toggleEmojiPanel={toggleEmojiPanel}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default ChatBox;
