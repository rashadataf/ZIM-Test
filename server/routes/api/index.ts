import { Router } from "express";
import { addChunk, getChunks } from "../../controllers/chunkController";

const ApiRouter: Router = Router();

// chunks
ApiRouter.get("/chunks", getChunks);
ApiRouter.post("/chunks", addChunk);

export default ApiRouter;
