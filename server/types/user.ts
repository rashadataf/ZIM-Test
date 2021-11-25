import { Document, ObjectId } from "mongoose";

export default interface User extends Document {
  email: string;
  chunks: Array<ObjectId>;
}
