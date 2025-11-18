import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl w-full text-center space-y-8 fade-in-message">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative bg-primary/10 p-8 rounded-full border border-primary/30">
              <Heart className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Your Emotional Companion
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            A safe, supportive space to share what's on your mind
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
            <MessageCircle className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Always Listening</h3>
            <p className="text-slate-400 text-sm">Share your thoughts anytime, judgment-free</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
            <Heart className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Empathetic Support</h3>
            <p className="text-slate-400 text-sm">Warm, understanding responses</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
            <Sparkles className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Private & Safe</h3>
            <p className="text-slate-400 text-sm">Your conversations, your space</p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <Button
            onClick={() => navigate("/chat")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
          >
            Start Talking
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-slate-500 text-xs pt-8">
          This is a supportive companion, not a licensed therapist.
        </p>

        {/* Credits */}
        <div className="pt-6 border-t border-slate-700/30 mt-6">
          <p className="text-slate-400 text-sm">
            Created by{" "}
            <span className="text-slate-300 font-medium">Lubna Shimreen</span>
            {", "}
            <span className="text-slate-300 font-medium">Rehana Imthiyas</span>
            {" and "}
            <span className="text-slate-300 font-medium">Yash Choudhary</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
