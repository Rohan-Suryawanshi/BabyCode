import React from "react";
import ChatBotWidget from "./components/ChatBotWidget";

function App() {
   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-6 md:px-12 py-8">
         <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
               Welcome to <span className="text-blue-600">EsportX</span> 🕹️
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
               Your all-in-one hub for PUBG and Free Fire tournaments. Compete,
               climb the leaderboard, and win real rewards.
            </p>
            <p className="text-sm sm:text-base text-gray-500">
               Need help? Click the chatbot icon in the bottom-right corner to
               ask about registration, matches, wallet, or support.
            </p>
         </div>

         {/* Chatbot Widget Floating */}
         <ChatBotWidget />
      </div>
   );
}

export default App;
