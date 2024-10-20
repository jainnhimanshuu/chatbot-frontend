export type TChatMessage = {
    message: string;
    sender: "user" | "bot";
    showRating?: boolean;
  };

export type TChatStepKey = 'start' | 'workingHours' | 'passwordReset' | 'services' | 'moreDetails' | 'end';
