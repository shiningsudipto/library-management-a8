import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { memberService } from "./member.service";
import httpStatus from "http-status";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await memberService.createMemberIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Member created successfully",
    data: result,
  });
});
const createManyMember = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await memberService.createManyMemberIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Members created successfully",
    data: result,
  });
});
const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await memberService.getAllMembersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Members retrieved successfully",
    data: result,
  });
});
const getMemberById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.memberId;
  const result = await memberService.getMemberByIdFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Member retrieved successfully",
    data: result,
  });
});
const updateMemberById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.memberId;
  const payload = req.body;
  const result = await memberService.updateMemberIntoDB(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Member updated successfully",
    data: result,
  });
});
const deleteMemberById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.memberId;
  const result = await memberService.deleteMemberFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Member successfully deleted",
    data: result,
  });
});

export const memberController = {
  createMember,
  createManyMember,
  getAllMembers,
  getMemberById,
  updateMemberById,
  deleteMemberById,
};
