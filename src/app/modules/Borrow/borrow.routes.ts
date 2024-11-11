import express from "express";
import { borrowController } from "./borrow.controller";

const router = express.Router();

router.post("/", borrowController.createBorrow);

export const BorrowRoutes = router;
