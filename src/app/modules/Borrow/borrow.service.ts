import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";

const createBorrowIntoDB = async (payload: any) => {
  const { bookId, memberId } = payload;
  const isBookAvailable = await prisma.book.findUnique({
    where: { bookId },
  });
  const isMemberAvailable = await prisma.member.findUnique({
    where: { memberId },
  });
  if (!isBookAvailable && !isMemberAvailable) {
    throw new ApiError(404, "Book or Member not found");
  }
  const result = await prisma.borrowRecord.create({
    data: payload,
    select: {
      borrowId: true,
      bookId: true,
      memberId: true,
      borrowDate: true,
    },
  });
  return result;
};

export const borrowService = {
  createBorrowIntoDB,
};
