import Chunk from "../types/chunk";
import { model, Schema } from "mongoose";

const chunkSchema: Schema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    icon_url: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "",
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default model<Chunk>("ChunkModel", chunkSchema);
