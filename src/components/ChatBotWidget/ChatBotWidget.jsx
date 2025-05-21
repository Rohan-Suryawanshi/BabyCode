import React, { useState, useRef, useEffect } from "react";
import "../ChatBotWidget/ChatBotWidget.css";
import ChatMessages from "../ChatMessages/ChatMessages";
import FloatingButton from "../FloatingButton/FloatingButton";
import ChatInput from "../ChatInput/ChatInput";

export default function ChatBotWidget() {
   const [open, setOpen] = useState(false);
   const [messages, setMessages] = useState([
      { from: "bot", text: "Hi! Ask me anything about EsportX 😊" },
   ]);
   const [input, setInput] = useState("");
   const [isThinking, setIsThinking] = useState(false);
   const chatRef = useRef(null);

   const getBotResponse = (userInput) => {
      const lowerInput = userInput.toLowerCase();

      if (lowerInput.includes("join") && lowerInput.includes("tournament"))
         return "To join a tournament, go to the 'Tournaments' section, select your game, and click 'Join'. Ensure your game ID is updated.";
      if (lowerInput.includes("register") || lowerInput.includes("signup"))
         return "Click on 'Sign Up' at the top right corner to register and start your EsportX journey!";
      if (lowerInput.includes("payment"))
         return "We use Razorpay for secure payments. You can view your transaction history in your Wallet.";
      if (lowerInput.includes("withdraw"))
         return "To withdraw your earnings, go to the Wallet > Withdraw section and enter your UPI or bank details.";
      if (lowerInput.includes("leaderboard"))
         return "You can track your rank on the live leaderboard from the dashboard or tournament details page.";
      if (lowerInput.includes("rules") || lowerInput.includes("guidelines"))
         return "Match-specific rules are visible in each tournament card. Please read them before joining.";
      if (lowerInput.includes("support") || lowerInput.includes("help"))
         return "Need help? Reach our support from the Help section or email us at support@esportx.com.";
      if (
         lowerInput.includes("game id") ||
         lowerInput.includes("pubg id") ||
         lowerInput.includes("free fire id")
      )
         return "Update your Game ID (PUBG/Free Fire) in your Profile. This ensures you’re verified in matches.";

      return "🤖 Sorry, I didn't understand that. Try asking about registration, tournaments, wallet, or leaderboard.";
   };

   const sendMessage = () => {
      if (!input.trim()) return;
      const userMessage = input.trim();

      setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
      setInput("");
      setIsThinking(true);

      setTimeout(() => {
         const botMessage = getBotResponse(userMessage);
         setMessages((prev) => [...prev, { from: "bot", text: botMessage }]);
         setIsThinking(false);
      }, 1800);
   };

   useEffect(() => {
      if (chatRef.current) {
         chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
   }, [messages, isThinking]);

   return (
      <>
         <FloatingButton open={open} setOpen={setOpen} />
         {open && (
            <div
               className="chatbot-widget"
               role="region"
               aria-label="Chatbot widget"
            >
               <header className="chatbot-header">
                  <h2 className="chatbot-title">EsportX Assistant</h2>
                  <button
                     aria-label="Close chatbot"
                     onClick={() => setOpen(false)}
                     className="chatbot-close-btn"
                  >
                     ✕
                  </button>
               </header>
               <ChatMessages
                  messages={messages}
                  isThinking={isThinking}
                  chatRef={chatRef}
               />
               <ChatInput
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  isThinking={isThinking}
               />
            </div>
         )}
      </>
   );
}
