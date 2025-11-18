import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { chatAPI } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "bot";
  text: string;
  emotion?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello there. I'm here to listen and support you. How are you feeling today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      // Prepare history for API
      const history = messages.map((m) => `${m.role}: ${m.text}`);

      // Call backend API
      const response = await chatAPI.sendMessage(userMessage, history);

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: response.reply || "I'm here for you.",
          emotion: response.emotion,
        },
      ]);
    } catch (error) {
      // Empathetic error handling
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm having trouble connecting right now, but I'm still here with you. Could you try sending again?",
        },
      ]);

      toast({
        variant: "destructive",
        title: "Connection issue",
        description: "Please check your internet connection and try again.",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="text-center mb-6 breathing-animation">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Your Emotional Companion
          </h1>
          <p className="text-sm text-muted-foreground">
            A safe space to share what's on your mind
          </p>
        </header>

        {/* Chat Container */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-border/50">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto px-6 py-6 space-y-2">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 bg-muted/30 p-4">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 rounded-full border-border/50 bg-background/60 focus:ring-2 focus:ring-primary/50 px-5 py-5 text-[15px]"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-md transition-all hover:scale-105"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-4 opacity-70">
          This is a supportive companion, not a licensed therapist.
        </p>
      </div>
    </div>
  );
};

export default Index;
