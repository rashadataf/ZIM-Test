import express, { Application } from "express";
require("dotenv").config();
import { homeRoute } from "./routes/public/users";
import { errorRoute } from "./routes/public/error";

const app: Application = express();
const port: string = process.env.PORT || "3500";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", homeRoute);

app.use(errorRoute);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on http://localhost:${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
