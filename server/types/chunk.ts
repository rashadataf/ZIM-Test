import { Document, ObjectId } from "mongoose";

export default interface Chunk extends Document {
  categories: Array<any>;
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}
