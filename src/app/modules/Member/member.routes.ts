import express from "express";
import { memberController } from "./member.controller";
import validateRequest from "../../middlewares/validateRequest";
import { memberValidations } from "./member.validations";

const router = express.Router();

router.post(
  "/",
  validateRequest(memberValidations.createMemberValidationSchema),
  memberController.createMember
);
router.post("/many", memberController.createManyMember);
router.get("/", memberController.getAllMembers);
router.get("/:memberId", memberController.getMemberById);
router.put(
  "/:memberId",
  validateRequest(memberValidations.updateMemberValidationSchema),
  memberController.updateMemberById
);
router.delete("/:memberId", memberController.deleteMemberById);

export const MemberRoutes = router;
