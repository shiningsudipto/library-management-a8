import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { returnService } from "./return.service";

const updateBorrowRecord = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await returnService.updateBorrowRecordIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: result,
  });
});

export const returnController = {
  updateBorrowRecord,
};
