import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send } from "lucide-react";

export default function ChatBotWidget() {
   const [open, setOpen] = useState(false);
   const [messages, setMessages] = useState([
      { from: "bot", text: "Hi! Ask me anything about EsportX 😊" },
   ]);
   const [input, setInput] = useState("");
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

      return "🤖 Sorry, I didn't understand that. Try asking about register, payment, wallet, or withdraw.";
   };

   const sendMessage = () => {
      if (!input.trim()) return;
      const userMessage = input.trim();
      const botMessage = getBotResponse(userMessage);

      setMessages((prev) => [
         ...prev,
         { from: "user", text: userMessage },
         { from: "bot", text: botMessage },
      ]);
      setInput("");
   };

   useEffect(() => {
      chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
   }, [messages]);

   return (
      <>
         {/* Bot Button */}
         <div className="fixed bottom-4 right-4 z-50">
            {!open && (
               <button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all"
                  aria-label="Open chatbot"
               >
                  <Bot size={28} strokeWidth={2.5} />
               </button>
            )}
         </div>

         {/* Chat Widget */}
         {open && (
            <div className="fixed bottom-4 right-4 w-[90vw] max-w-sm sm:max-w-md h-[75vh] sm:h-[36rem] bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 animate-fade-in">
               {/* Header */}
               <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-5 flex items-center justify-between rounded-t-2xl">
                  <div className="flex items-center gap-2 font-semibold">
                     <Bot size={22} />
                     EsportX Assistant
                  </div>
                  <button
                     className="hover:text-red-300 transition-colors"
                     onClick={() => setOpen(false)}
                     aria-label="Close chatbot"
                  >
                     <X size={22} strokeWidth={2.5} />
                  </button>
               </div>

               {/* Chat Area */}
               <div
                  ref={chatRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gray-50 space-y-4 text-sm scrollbar-thin scrollbar-thumb-gray-300"
               >
                  {messages.map((msg, idx) => (
                     <div
                        key={idx}
                        className={`flex ${
                           msg.from === "user" ? "justify-end" : "justify-start"
                        }`}
                     >
                        <div
                           className={`px-4 py-2 rounded-xl shadow-md max-w-[85%] whitespace-pre-line ${
                              msg.from === "user"
                                 ? "bg-blue-500 text-white rounded-br-none"
                                 : "bg-gray-200 text-gray-800 rounded-bl-none"
                           }`}
                        >
                           {msg.text}
                        </div>
                     </div>
                  ))}
               </div>

               {/* Input Area */}
               <div className="p-3 sm:p-4 border-t border-gray-200 bg-white flex items-center gap-2">
                  <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                     placeholder="Ask about registration, leaderboard, etc."
                     className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                     aria-label="Type your message"
                  />
                  <button
                     onClick={sendMessage}
                     className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                     aria-label="Send message"
                  >
                     <Send size={18} />
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
