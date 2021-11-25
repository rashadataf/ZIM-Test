import express, { Application } from "express";
import mongoose from "mongoose";
require("dotenv").config();
import { homeRoute } from "./routes/public/users";
import { errorRoute } from "./routes/public/error";

import ApiRoutes from "./routes/api";

const app: Application = express();
const port: string = process.env.PORT || "3500";
const uri: string = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ApiRoutes);
app.get("/", homeRoute);

app.use(errorRoute);

mongoose
  .connect(uri)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((error) => {
    throw error;
  });
