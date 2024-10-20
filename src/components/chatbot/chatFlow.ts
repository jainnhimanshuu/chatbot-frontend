import { TChatStepKey } from "../../types/chatBotTypes";

type ChatStep = {
    botMessage: string;
    quickActions: { label: string; next: keyof typeof chatFlow }[]; 
    showRating?: boolean;
  };


export const chatFlow:Record<TChatStepKey, ChatStep>  = {
    start: {
      botMessage: "Hello! How can I help you today?",
      quickActions: [
        { label: "What are your working hours?", next: "workingHours" },
        { label: "How can I reset my password?", next: "passwordReset" },
      ],
    },
    workingHours: {
      botMessage: "Our working hours are from 9 AM to 6 PM, Monday to Friday. Can I help with anything else?",
      quickActions: [
        { label: "Tell me about your services", next: "services" },
        { label: "No, thank you", next: "end" },
      ],
      showRating: true,
    },
    passwordReset: {
      botMessage:
        "You can reset your password by clicking on 'Forgot Password' on the login page. Anything else you'd like to ask?",
      quickActions: [
        { label: "Tell me about your services", next: "services" },
        { label: "No, thank you", next: "end" },
      ],
      showRating: true,
    },
    services: {
      botMessage: "We offer web development, app development, and consulting services.",
      quickActions: [
        { label: "Can you explain more?", next: "moreDetails" },
        { label: "No, thank you", next: "end" },
      ],
    },
    moreDetails: {
      botMessage: "We specialize in providing full-stack web and app solutions, tailored to your needs.",
      quickActions: [
        { label: "Thank you", next: "end" },
      ],
      showRating: true,
    },
    end: {
      botMessage: "You're welcome! Feel free to reach out if you need any further assistance.",
      quickActions: [],
    },
  } as const;