function ChatbotHeader() {
  return (
    <div className="relative bg-gradient-to-br from-[#272ddc] to-[#07aff9] text-white h-1/4 rounded-t-xl flex flex-col pt-4 px-4">
      <div className="flex items-start gap-2 mb-4">
        <img
          src="https://avatar.iran.liara.run/public"
          alt="Avtaar"
          className="object-cover h-8 w-8 rounded-full"
        />
        <div className="flex flex-col items-start gap-1">
          <p className="text-xs text-slate-100 leading-tight">Chat with</p>
          <p className="text-base text-white leading-3">Noobbot</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <span className="w-2 h-2 bg-green-600 animate-pulse rounded-full"></span>
        <p className="text-base text-white">
          We're online and ready to assist you!
        </p>
      </div>

      <div className="absolute bottom-[-6px] left-0 right-0 overflow-hidden leading-[0]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 372 15">
          <path
            d="M349.8 1.4C334.5.4 318.5 0 302 0h-2.5c-9.1 0-18.4.1-27.8.4-34.5 1-68.3 3-102.3 4.7-14 .5-28 1.2-41.5 1.6C84 7.7 41.6 5.3 0 2.2v8.4c41.6 3 84 5.3 128.2 4.1 13.5-.4 27.5-1.1 41.5-1.6 33.9-1.7 67.8-3.6 102.3-4.7 9.4-.3 18.7-.4 27.8-.4h2.5c16.5 0 32.4.4 47.8 1.4 8.4.3 15.6.7 22 1.2V2.2c-6.5-.5-13.8-.5-22.3-.8z"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
  );
}

export default ChatbotHeader;
