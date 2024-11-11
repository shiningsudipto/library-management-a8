import prisma from "../../shared/prisma";

const updateBorrowRecordIntoDB = async (payload: any) => {
  const { borrowId } = payload;
  const isBorrowRecordAvailable = await prisma.borrowRecord.findUnique({
    where: { borrowId },
  });
  if (!isBorrowRecordAvailable) {
    throw new Error("Record not found!");
  }
  await prisma.borrowRecord.update({
    where: { borrowId },
    data: {
      returnDate: new Date(),
    },
  });
  return "Book returned successfully";
};

export const returnService = {
  updateBorrowRecordIntoDB,
};
