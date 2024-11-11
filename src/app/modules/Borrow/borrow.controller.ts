import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { borrowService } from "./borrow.service";

const createBorrow = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await borrowService.createBorrowIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Book borrowed successfully",
    data: result,
  });
});

export const borrowController = {
  createBorrow,
};
