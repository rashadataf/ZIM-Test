import { Router } from "express";
import {
  addChunk,
  getChunks,
  removeChunk,
} from "../../controllers/chunkController";

const ApiRouter: Router = Router();

// chunks
ApiRouter.get("/chunks", getChunks);
ApiRouter.post("/chunks", addChunk);
ApiRouter.delete("/chunks", removeChunk);

export default ApiRouter;
