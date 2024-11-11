import express from "express";
import { memberController } from "./member.controller";

const router = express.Router();

router.get("/");
// router.get("/:bookId", memberController.);
// router.put("/:bookId", memberController.);
// router.delete("/:bookId", memberController.);
// router.post("/", memberController.);
// router.post("/many", memberController.);

export const MemberRoutes = router;
