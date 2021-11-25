import { Request, Response, NextFunction } from "express";

const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

export default cors;
