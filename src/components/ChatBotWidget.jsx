import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send } from "lucide-react";

export default function ChatBotWidget() {
   const [open, setOpen] = useState(false);
   const [messages, setMessages] = useState([
      { from: "bot", text: "Hi! Ask me anything about EsportX 😊" },
   ]);
   const [input, setInput] = useState("");
   const [isThinking, setIsThinking] = useState(false);
   const chatRef = useRef(null);

   // Bot response logic based on keywords
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

   // Send message handler with thinking animation
   const sendMessage = () => {
      if (!input.trim()) return;
      const userMessage = input.trim();

      // Add user's message immediately
      setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
      setInput("");
      setIsThinking(true);

      // Simulate bot "thinking" delay
      setTimeout(() => {
         const botMessage = getBotResponse(userMessage);
         setMessages((prev) => [...prev, { from: "bot", text: botMessage }]);
         setIsThinking(false);
      }, 1800); // 1.8 seconds delay
   };

   // Auto-scroll chat container to bottom when new message is added or thinking state changes
   useEffect(() => {
      if (chatRef.current) {
         chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
   }, [messages, isThinking]);

   return (
      <>
         {/* Floating Chat Button */}
         <div className="fixed bottom-6 right-6 z-50">
            {!open && (
               <button
                  onClick={() => setOpen(true)}
                  aria-label="Open chatbot"
                  className="bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 
            p-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
               >
                  <Bot size={28} strokeWidth={2.5} className="text-white" />
               </button>
            )}
         </div>

         {/* Chat Widget */}
         {open && (
            <div
               className="fixed bottom-6 right-6 w-full max-w-sm h-[600px] bg-white rounded-3xl shadow-2xl
          flex flex-col overflow-hidden z-50 animate-fadeIn"
               style={{
                  boxShadow: "0 20px 50px rgb(99 102 241 / 0.3)",
                  border: "1px solid #cbd5e1",
               }}
            >
               {/* Header */}
               <div
                  className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-700
            p-5 rounded-t-3xl text-white select-none"
               >
                  <div className="flex items-center gap-3 font-semibold text-lg">
                     <Bot size={24} />
                     <span>EsportX Assistant</span>
                  </div>
                  <button
                     aria-label="Close chatbot"
                     onClick={() => setOpen(false)}
                     className="hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  >
                     <X size={24} strokeWidth={2.5} />
                  </button>
               </div>

               {/* Chat Messages */}
               <div
                  ref={chatRef}
                  className="flex-1 p-5 overflow-y-auto bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-indigo-400"
                  aria-live="polite"
                  aria-relevant="additions"
               >
                  {messages.map((msg, i) => (
                     <div
                        key={i}
                        className={`flex ${
                           msg.from === "user" ? "justify-end" : "justify-start"
                        }`}
                     >
                        <div
                           className={`px-5 py-3 rounded-2xl max-w-[80%] whitespace-pre-line
                shadow-md
                ${
                   msg.from === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none border border-gray-300"
                }
                transition-all duration-300`}
                        >
                           {msg.text}
                        </div>
                     </div>
                  ))}

                  {/* Bot Thinking Animation */}
                  {isThinking && (
                     <div className="flex justify-start">
                        <div
                           className="bg-white border border-gray-300 rounded-bl-none rounded-2xl px-5 py-3 max-w-[80%]
                    shadow-md flex items-center gap-2"
                        >
                           <TypingIndicator />
                           <span className="text-gray-500 italic select-none">
                              EsportX is typing...
                           </span>
                        </div>
                     </div>
                  )}
               </div>

               {/* Input Area */}
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     sendMessage();
                  }}
                  className="p-4 bg-white border-t border-gray-200 flex items-center gap-3"
               >
                  <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Ask me register,leaderboard,withdraw"
                     aria-label="Type your message"
                     className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none
                focus:ring-2 focus:ring-indigo-500 transition text-gray-900"
                     autoFocus
                     disabled={isThinking}
                  />
                  <button
                     type="submit"
                     aria-label="Send message"
                     className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full
                transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                     disabled={!input.trim() || isThinking}
                  >
                     <Send size={20} />
                  </button>
               </form>
            </div>
         )}

         {/* Animations & Responsive Styles */}
         <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        /* Scrollbar styles */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        /* Responsive styles */
        @media (max-width: 640px) {
          .fixed.bottom-6.right-6 {
            bottom: 1rem !important;
            right: 1rem !important;
          }
          div.w-full.max-w-sm.h-[600px] {
            width: 90vw !important;
            height: 70vh !important;
            bottom: 1rem !important;
            right: 1rem !important;
            border-radius: 1.25rem !important;
          }
          input {
            padding: 0.75rem 1rem !important;
            font-size: 1rem !important;
          }
        }

        /* Typing dots animation */
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #6366f1;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-6px);
          }
        }
      `}</style>
      </>
   );
}

// Typing dots animation component
function TypingIndicator() {
   return (
      <div className="flex items-center gap-1">
         <span className="typing-dot"></span>
         <span className="typing-dot"></span>
         <span className="typing-dot"></span>
      </div>
   );
}
