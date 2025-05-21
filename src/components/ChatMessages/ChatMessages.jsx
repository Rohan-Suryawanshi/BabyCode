import React from "react";
import TypingIndicator from "../TypingIndicator/TypingIndicator.jsx";
import "./ChatMessages.css";

export default function ChatMessages({ messages, isThinking, chatRef }) {
   return (
      <div
         ref={chatRef}
         className="chat-messages"
         aria-live="polite"
         aria-relevant="additions"
      >
         {messages.map((msg, i) => (
            <div
               key={i}
               className={`chat-message-wrapper ${
                  msg.from === "user" ? "user-message" : "bot-message"
               }`}
            >
               <div
                  className={`chat-message ${
                     msg.from === "user"
                        ? "user-message-box"
                        : "bot-message-box"
                  }`}
               >
                  {msg.text}
               </div>
            </div>
         ))}

         {isThinking && (
            <div className="chat-message-wrapper bot-message">
               <div className="chat-message bot-message-box typing-indicator-container">
                  <TypingIndicator />
                  <span className="typing-text">EsportX is typing...</span>
               </div>
            </div>
         )}
      </div>
   );
}
