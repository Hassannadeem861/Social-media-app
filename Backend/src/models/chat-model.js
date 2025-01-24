import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    to_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    messageText: {
      type: String,
    }
  },
  { timestamps: true }
);


const chat = mongoose.model("Chat", chatSchema);

export default chat;
