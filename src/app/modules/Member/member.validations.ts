import { z } from "zod";

const createMemberValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Member name is required." }),
    email: z.string({ required_error: "Member email is required." }),
    phone: z.string({ required_error: "Member phone is required." }),
    membershipDate: z.string().optional(),
  }),
});

const updateMemberValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    membershipDate: z.string().optional(),
  }),
});

export const memberValidations = {
  createMemberValidationSchema,
  updateMemberValidationSchema,
};
