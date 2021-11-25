import User from "../types/user";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    chunks: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<User>("UserModel", userSchema);
