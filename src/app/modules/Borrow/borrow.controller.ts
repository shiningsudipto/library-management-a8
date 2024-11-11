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

const getOverdueBorrow = catchAsync(async (req: Request, res: Response) => {
  const result = await borrowService.getOverdueBorrowsFromDB();
  const isResultAvailable = result.length === 0;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: isResultAvailable
      ? "No overdue books"
      : "Overdue borrow list fetched",
    data: isResultAvailable ? [] : result,
  });
});

export const borrowController = {
  createBorrow,
  getOverdueBorrow,
};
