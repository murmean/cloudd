import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { chatSocket } from "./sockets/chat.socket.js";

dotenv.config();

// connect to MongoDB
await connectDB();

// create HTTP server
const server = http.createServer(app);

// create socket.io server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// register chat socket handlers
chatSocket(io);

// ✅ DEFINE PORT
const PORT = process.env.PORT || 3000;

// start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
