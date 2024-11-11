import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";
import httpStatus from "http-status";

const getAllBooksFromDB = async () => {
  const result = await prisma.book.findMany();
  return result;
};

const createBookIntoDB = async (payload: any) => {
  const result = await prisma.book.create({
    data: payload,
  });
  return result;
};

const getBookByIdFromDB = async (bookId: string) => {
  const result = await prisma.book.findUniqueOrThrow({
    where: { bookId },
  });
  return result;
};
const updateBookIntoDB = async (bookId: string, payload: any) => {
  const isBookAvailable = await prisma.book.findUnique({
    where: { bookId },
  });
  if (!isBookAvailable) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not available.");
  }
  const result = await prisma.book.update({
    where: {
      bookId,
    },
    data: payload,
  });
  return result;
};
const deleteBookFromDB = async (bookId: string) => {
  const isBookAvailable = await prisma.book.findUnique({
    where: { bookId },
  });
  if (!isBookAvailable) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not available.");
  }
  const result = await prisma.book.delete({
    where: {
      bookId,
    },
  });
  return result;
};

const createManyBooksIntoDB = async (payload: any) => {
  return await prisma.book.createMany({
    data: payload,
  });
};

export const bookService = {
  getAllBooksFromDB,
  createBookIntoDB,
  createManyBooksIntoDB,
  getBookByIdFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
