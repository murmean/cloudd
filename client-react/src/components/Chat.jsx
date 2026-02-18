import { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "./Message.jsx";
import { fetchMessages } from "../api/messages.js";

const socket = io("http://localhost:3000");

export default function Chat({ channelId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!channelId) return;

    fetchMessages(channelId).then(setMessages);

    socket.emit("joinChannel", channelId);

    socket.on("newMessage", (msg) => {
      if (msg.channelId === channelId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("newMessage");
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input) return;

    socket.emit("sendMessage", {
      channelId,
      authorId: "guest", // replace with user login later
      content: input,
    });

    setInput("");
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          height: "400px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "5px" }}
          placeholder="Type a message..."
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
