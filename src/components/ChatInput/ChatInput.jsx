import React from "react";
import { Send } from "lucide-react";
import "./ChatInput.css";

export default function ChatInput({
   input,
   setInput,
   sendMessage,
   isThinking,
}) {
   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
         }}
         className="chat-input-form"
      >
         <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me register, leaderboard, withdraw"
            aria-label="Type your message"
            className="chat-input"
            autoFocus
            disabled={isThinking}
         />
         <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || isThinking}
            className="chat-send-btn"
         >
            <Send size={20} />
         </button>
      </form>
   );
}
