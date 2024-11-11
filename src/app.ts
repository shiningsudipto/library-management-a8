import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import httpStatus from "http-status";

const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Library management server...",
  });
});

app.use("/api", router);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
