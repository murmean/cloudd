import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Get last 50 messages
router.get("/:channelId", async (req, res) => {
  const messages = await Message.find({
    channelId: req.params.channelId,
  })
    .sort({ createdAt: 1 })
    .limit(50);

  res.json(messages);
});

export default router;
