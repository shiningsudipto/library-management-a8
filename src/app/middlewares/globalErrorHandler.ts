/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { Prisma } from "@prisma/client";
import { TErrorSources } from "../types/errors";
import { handlePrismaError } from "../errors/HandlePrismaError";
import ApiError from "../errors/ApiError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: any,
  next: NextFunction
) => {
  //  setting default value
  let statusCode: number = 500;
  let message = "Something went wrong!";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const errors = handleZodError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorSources = errors?.errorSources;
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    const errors = handlePrismaError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorSources = errors?.errorSources;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: error?.stack ? error?.stack : null,
  });
};
