import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "bot";
  text: string;
  emotion?: string;
}

export const ChatMessage = ({ role, text, emotion }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4 fade-in-message",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-3xl px-5 py-3 shadow-sm",
          isUser
            ? "bg-therapy-user-bubble text-therapy-user-text"
            : "bg-therapy-bot-bubble text-therapy-bot-text shadow-md"
        )}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>
        {emotion && !isUser && (
          <p className="text-xs text-muted-foreground mt-2 italic opacity-60">
            {emotion}
          </p>
        )}
      </div>
    </div>
  );
};
