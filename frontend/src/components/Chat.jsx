import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { sendMessageAPI, getMessagesAPI } from "../api.js";

const socket = io("http://10.149.92.144:5000");

export default function Chat({ username, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessagesAPI(token).then((res) => setMessages(res.data));

    const handleReceive = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("receive-message", handleReceive);

    return () => socket.off("receive-message", handleReceive);
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const msg = { sender: username, receiver: "girlfriend", text };
    socket.emit("send-message", msg);
    await sendMessageAPI(msg, token);
    setText("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    if (onLogout) onLogout();
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Chat as {username}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-xs break-words ${m.sender === username
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 self-start"
              }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
