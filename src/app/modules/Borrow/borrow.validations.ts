import { z } from "zod";

const createBorrowValidationSchema = z.object({
  body: z.object({
    bookId: z.string({ required_error: "Book id is required." }),
    memberId: z.string({ required_error: "Member id is required." }),
  }),
});

export const borrowValidationSchema = {
  createBorrowValidationSchema,
};
