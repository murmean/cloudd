import { useState } from "react";
import Chat from "./components/Chat.jsx";
import ChannelList from "./components/ChannelList.jsx";

export default function App() {
  const [currentChannel, setCurrentChannel] = useState("general");

  const channels = ["general", "random", "tech"];

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      <ChannelList channels={channels} onSelect={setCurrentChannel} />
      <div style={{ flex: 1 }}>
        <h2>#{currentChannel}</h2>
        <Chat channelId={currentChannel} />
      </div>
    </div>
  );
}
