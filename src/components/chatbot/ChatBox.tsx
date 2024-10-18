import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatbotHeader from "./chatbotHeader";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<
    { message: string; sender: "user" | "bot" }[]
  >([{ message: "Hello! How can I help you today?", sender: "bot" }]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { message, sender: "user" }]);
    setTimeout(() => {
      setMessages([
        ...messages,
        { message, sender: "user" },
        { message: "Let me assist you with that.", sender: "bot" },
      ]);
    }, 1000);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-10 right-12 z-50 h-4/5 bg-white rounded-2xl max-w-xs">
      <ChatbotHeader />
      <div className="p-4 h-2/4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatBox;
