import { Request, Response } from "express";

export const errorRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(404).send("Page Not Found!");
};
