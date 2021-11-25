import { Router } from "express";
import {
  addChunk,
  getChunks,
  removeChunk,
  checkIfFavourite,
} from "../../controllers/chunkController";

const ApiRouter: Router = Router();

// chunks
ApiRouter.get("/chunks", getChunks);
ApiRouter.post("/chunks", addChunk);
ApiRouter.delete("/chunks", removeChunk);
ApiRouter.post("/chunks/isFavourite", checkIfFavourite);

export default ApiRouter;
