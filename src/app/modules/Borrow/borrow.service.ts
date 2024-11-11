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

const getOverdueBorrowsFromDB = async () => {
  const overdueLimit = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

  // Find overdue borrow records where returnDate is null and borrowDate is older than 14 days from now
  const overdueBorrows = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lte: new Date(Date.now() - overdueLimit),
      },
    },
    include: {
      book: {
        select: {
          title: true,
        },
      },
      member: {
        select: {
          name: true,
        },
      },
    },
  });

  if (overdueBorrows.length === 0) {
    return [];
  }

  // Calculate overdue days based on borrowDate
  const overdueData = overdueBorrows.map((borrow) => {
    const overdueDays = Math.ceil(
      (Date.now() - new Date(borrow.borrowDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return {
      borrowId: borrow.borrowId,
      bookTitle: borrow.book.title,
      borrowerName: borrow.member.name,
      overdueDays,
    };
  });

  return overdueData;
};

export const borrowService = {
  createBorrowIntoDB,
  getOverdueBorrowsFromDB,
};
