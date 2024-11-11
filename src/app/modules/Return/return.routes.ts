import express from "express";
import { returnController } from "./return.controller";
import validateRequest from "../../middlewares/validateRequest";
import { returnValidations } from "./return.validations";

const router = express.Router();

router.post(
  "/",
  validateRequest(returnValidations.borrowReturnValidationSchema),
  returnController.updateBorrowRecord
);

export const ReturnRoutes = router;
