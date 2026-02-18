import express from "express";
import cors from "cors";
import messageRoutes from "./routes/message.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});
app.use("/messages", messageRoutes);

export default app;
