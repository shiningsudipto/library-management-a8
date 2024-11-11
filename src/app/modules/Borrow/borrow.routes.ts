import express from "express";
import { borrowController } from "./borrow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { borrowValidationSchema } from "./borrow.validations";

const router = express.Router();

router.post(
  "/",
  validateRequest(borrowValidationSchema.createBorrowValidationSchema),
  borrowController.createBorrow
);
router.get("/overdue", borrowController.getOverdueBorrow);

export const BorrowRoutes = router;
