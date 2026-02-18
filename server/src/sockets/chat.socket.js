import Message from "../models/Message.js";

export function chatSocket(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    socket.on("joinChannel", async (channelId) => {
      socket.join(channelId);
      console.log(`📥 ${socket.id} joined channel ${channelId}`);

      // OPTIONAL: Send message history when joining
      const messages = await Message.find({ channelId }).sort({ createdAt: 1 });
      socket.emit("channelHistory", messages);
    });

    socket.on("sendMessage", async (data) => {
      const { channelId, authorId, content } = data;
      if (!content) return;

      try {
        const message = await Message.create({
          channelId,
          authorId,
          content,
        });

        // 🔥 Important: emit AFTER saving
        io.to(channelId).emit("newMessage", message);

      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
}
