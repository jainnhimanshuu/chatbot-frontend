import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import EmojiPicker from "emoji-picker-react";
import ChatbotHeader from "./chatbotHeader";
import { chatFlow } from "./chatFlow";
import { cn } from "../../lib/utils";
import { RiPencilFill } from "react-icons/ri";

const ChatBox: React.FC = () => {
  const [currentStep, setCurrentStep] = useState("start");
  const [isEmojiPanelOpen, setIsEmojiPanelOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [messages, setMessages] = useState<
    { message: string; sender: "user" | "bot"; showRating?: boolean }[]
  >([{ message: chatFlow.start.botMessage, sender: "bot" }]);

  const sendBotMessage = useCallback(() => {
    // Get the next step in the chat flow based on the current step
    const { botMessage, quickActions, showRating } = chatFlow[currentStep];
    // Simulate a delay before the bot responds
    setTimeout(() => {
      // Add the bot's message to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: botMessage, sender: "bot", showRating },
      ]);

      // Check if there are no more quick actions for this step
      if (quickActions.length === 0) {
        // If no quick actions, set the current step to "end"
        setCurrentStep("end");
      }
    }, 1000); // 1 second delay
  }, [currentStep]);

  const handleSendMessage = useCallback(
    (userMessage: string, nextStepKey?: string) => {
      // Add the user's message to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: userMessage, sender: "user" },
      ]);

      if (nextStepKey) {
        const { botMessage, showRating } = chatFlow[nextStepKey];

        setMessages((prevMessages) => [
          ...prevMessages,
          { message: botMessage, sender: "bot", showRating },
        ]);
      }
      sendBotMessage();
    },
    [sendBotMessage]
  );

  const handleEmojiClick = useCallback((emoji: { emoji: string }) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleEmojiPanel = (isOpen: boolean) => {
    setIsEmojiPanelOpen(isOpen);
  };

  const handleQuickActionClick = (
    userResponse: string,
    nextStepKey: string
  ) => {
    setCurrentStep(nextStepKey);
    handleSendMessage(userResponse, nextStepKey);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {!isChatOpen ? (
        <div
          onClick={() => setIsChatOpen(true)}
          aria-label="Send message"
          className={cn(
            "fixed  right-[32px] bottom-[72px] rounded-full h-12 w-12 flex items-center justify-center text-2xl cursor-pointer",
            "bg-gradient-to-br from-[#272ddc] to-[#07aff9] text-white hover:from-white hover:text-blue-600 hover:to-white shadow-xl"
          )}
        >
          <RiPencilFill />
        </div>
      ) : (
        <div className="fixed  bg-white lg:bottom-10 lg:right-12 z-50 lg:h-4/5 h-full  rounded-2xl lg:max-w-xs w-full bottom-0 right-2 shadow-lg">
          <ChatbotHeader toggleChat={setIsChatOpen} />
          <div className="p-4 h-4/6 lg:h-2/4 overflow-y-auto bg-white">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.message}
                sender={msg.sender}
                showRating={msg.showRating}
              />
            ))}
            <div ref={messagesEndRef} />
            {isEmojiPanelOpen && (
              <div className="absolute bottom-28 left-0 z-50">
                <EmojiPicker
                  width="20rem"
                  height="24rem"
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}

            {chatFlow[currentStep].quickActions.length > 0 && (
              <div className="flex flex-col mt-2 space-y-2 items-end">
                {chatFlow[currentStep].quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#272ddc] to-[#07aff9] rounded-[20px] max-w-[85%] w-fit p-0.5"
                  >
                    <button
                      key={index}
                      className="rounded-[20px] px-2 py-1 font-semibold text-sm leading-5 overflow-wrap bg-white hover:bg-transparent group"
                      onClick={() =>
                        handleQuickActionClick(action.label, action.next)
                      }
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#272ddc] to-[#07aff9] group-hover:text-white">
                        {action.label}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ChatInput
            onSend={handleSendMessage}
            toggleEmojiPanel={toggleEmojiPanel}
            message={message}
            setMessage={setMessage}
            isEmojiPanelOpen={isEmojiPanelOpen}
          />
        </div>
      )}
    </>
  );
};

export default ChatBox;
