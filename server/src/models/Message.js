import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    channelId: { type: String, required: true },
    authorId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
