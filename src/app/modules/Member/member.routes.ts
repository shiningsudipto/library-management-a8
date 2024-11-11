import express from "express";
import { memberController } from "./member.controller";

const router = express.Router();

router.post("/", memberController.createMember);
router.post("/many", memberController.createManyMember);
router.get("/", memberController.getAllMembers);
router.get("/:memberId", memberController.getMemberById);
router.put("/:memberId", memberController.updateMemberById);
router.delete("/:memberId", memberController.deleteMemberById);

export const MemberRoutes = router;
