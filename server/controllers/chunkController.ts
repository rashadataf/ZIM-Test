import { Response, Request } from "express";
import Chunk from "../types/chunk";
import ChunkModel from "../models/chunk";
import UserModel from "../models/user";
import User from "../types/user";

export const getChunks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let email: string = req.query.email as string;
    if (email && email !== "") {
      const user: User = await UserModel.findOne({ email: email }).populate(
        "chunks",
        null,
        "ChunkModel"
      );

      if (user && user !== null)
        return res.status(200).json({ chunks: user.chunks });
      else return res.status(200).json({ chunks: [] });
    }
    return res.status(200).json({ chunks: [] });
  } catch (error) {
    throw error;
  }
};

export const addChunk = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const body = req.body as Pick<Chunk, "icon_url" | "id" | "url" | "value">;
    const email: string = req.body.email;
    let user: User = await UserModel.findOne({ email: email });
    if (!user || user == null) {
      const newUser = new UserModel({
        email: email,
      });
      user = await newUser.save();
    }
    const chunk: Chunk = new ChunkModel({
      icon_url: body.icon_url,
      id: body.id,
      url: body.url,
      value: body.value,
      user: user._id,
    });

    user.chunks.push(chunk._id);
    await user.save();
    const newChunk: Chunk = await chunk.save();
    return res.status(201).json({
      message: "Chunk was added to your favourite list",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const removeChunk = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const email: string = req.query.email as string;
    const id: string = req.query.id as string;
    const user: User = await UserModel.findOne({ email: email });
    const chunk: Chunk = await ChunkModel.findOne({ id: id });
    if (!user || user == null || !chunk || chunk == null) {
      return res.status(404).json({
        message: "email or chunk wer not found in the database!",
      });
    }

    if (user.chunks.includes(chunk._id)) {
      const indexOfChunk = user.chunks.indexOf(chunk._id);
      user.chunks.splice(indexOfChunk, 1);
      await user.save();
      await chunk.delete();
      return res.status(200).json({
        message: "Chunk was removed from your favourite list",
      });
    }
    return res.status(404).json({
      message: "email or chunk wer not found in the database!",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
