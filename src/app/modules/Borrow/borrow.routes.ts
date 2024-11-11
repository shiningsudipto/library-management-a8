import express from "express";
import { borrowController } from "./borrow.controller";

const router = express.Router();

router.post("/", borrowController.createBorrow);
router.get("/overdue", borrowController.getOverdueBorrow);

export const BorrowRoutes = router;
