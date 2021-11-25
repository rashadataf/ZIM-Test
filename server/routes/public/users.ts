import { Request, Response } from "express";

export const homeRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {

  return res.status(200).send("hello to zim-test!");
};
