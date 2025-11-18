import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Home, Sparkles, Plus } from "lucide-react";
import { chatAPI } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "bot";
  text: string;
  emotion?: string;
}

const Chat = () => {
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
  const navigate = useNavigate();

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

  const handleNewChat = () => {
    setMessages([
      {
        role: "bot",
        text: "Hello there. I'm here to listen and support you. How are you feeling today?",
      },
    ]);
    toast({
      title: "New conversation started",
      description: "Ready to listen whenever you are.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <header className="text-center mb-6 breathing-animation flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full hover:bg-accent/50"
          >
            <Home className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <h1 className="text-3xl font-semibold text-foreground">
                Your Emotional Companion
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              A safe space to share what's on your mind
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNewChat}
              className="rounded-full hover:bg-accent/50"
              title="Start new chat"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Chat Container */}
        <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-border/50 relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto px-6 py-6 space-y-2 relative">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 p-4 relative backdrop-blur-sm">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 rounded-full border-border/50 bg-background/80 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 px-5 py-5 text-[15px] shadow-inner"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
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

export default Chat;
