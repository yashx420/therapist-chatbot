export const TypingIndicator = () => {
  return (
    <div className="flex w-full mb-4 justify-start fade-in-message">
      <div className="max-w-[75%] rounded-3xl px-5 py-4 bg-therapy-bot-bubble shadow-md">
        <div className="flex items-center gap-2">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="text-sm text-muted-foreground ml-1">
            Your companion is thinking...
          </span>
        </div>
      </div>
    </div>
  );
};
