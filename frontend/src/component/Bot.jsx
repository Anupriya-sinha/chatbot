import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4002/bot/v1/message", {
        text: input,
      });

      if (res.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: res.data.userMessage, sender: "user" },
          { text: res.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
    setLoading(false);
  };

  // scroll always to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md h-[80vh] bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden">
      
      {/* Header */}
      <div className="bg-gray-700 px-4 py-3 flex items-center gap-2">
        <FaUserCircle className="text-2xl" />
        <h1 className="text-lg font-semibold">ChatBot</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-600 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-3 bg-gray-700">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full bg-gray-600 text-white focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Bot;




