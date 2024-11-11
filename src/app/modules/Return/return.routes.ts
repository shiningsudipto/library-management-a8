import express from "express";
import { returnController } from "./return.controller";

const router = express.Router();

router.post("/", returnController.updateBorrowRecord);

export const ReturnRoutes = router;
