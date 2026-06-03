"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function AITutor({ contextTopic = "Data Structures" }: { contextTopic?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: `Hi! I'm your AI Tutor. I see you're learning about ${contextTopic}. How can I help you?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Add empty AI message to be streamed into
    setMessages(prev => [...prev, { role: "ai", content: "" }]);

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, context: contextTopic })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          lastMsg.content += chunkValue;
          return newMessages;
        });
      }
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "Oops, I encountered an error. Please try again later.";
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg-obsidian)] border border-gray-800 rounded-xl overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-[#121214]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent-indigo)]/20 flex items-center justify-center border border-[var(--color-accent-indigo)]/30">
            <Bot size={18} className="text-[var(--color-accent-indigo)]" />
          </div>
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              AI Tutor <Sparkles size={14} className="text-yellow-400" />
            </h3>
            <p className="text-xs text-gray-400">Powered by Gemini</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-gray-800' : 'bg-[var(--color-accent-indigo)]/20 border border-[var(--color-accent-indigo)]/30'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-gray-400" /> : <Bot size={16} className="text-[var(--color-accent-indigo)]" />}
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gray-800 text-gray-200 rounded-tr-sm' 
                  : 'bg-[var(--color-accent-indigo)]/10 text-gray-300 border border-[var(--color-accent-indigo)]/20 rounded-tl-sm'
              }`}>
                {msg.content || (isTyping && i === messages.length - 1 ? <span className="animate-pulse">Thinking...</span> : '')}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-[#121214] z-10 relative">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to explain a concept..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-accent-indigo)] transition-colors"
            disabled={isTyping}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-full bg-[var(--color-accent-indigo)] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-accent-indigo)]/80 transition-colors"
          >
            <Send size={18} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
