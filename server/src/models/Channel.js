import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serverId: { type: mongoose.Schema.Types.ObjectId, ref: "Server" },
    type: { type: String, enum: ["text", "voice"], default: "text" },
  },
  { timestamps: true }
);

export default mongoose.model("Channel", channelSchema);
