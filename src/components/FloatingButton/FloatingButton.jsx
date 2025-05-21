import React from "react";
import { Bot } from "lucide-react";
import "./FloatingButton.css";

export default function FloatingButton({ open, setOpen }) {
   if (open) return null;

   return (
      <div className="floating-button-container">
         <button
            onClick={() => setOpen(true)}
            aria-label="Open chatbot"
            className="floating-button"
         >
            <Bot size={28} strokeWidth={2.5} className="floating-button-icon" />
         </button>
      </div>
   );
}
