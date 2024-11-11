import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";
import httpStatus from "http-status";

const createMemberIntoDB = async (payload: any) => {
  const result = await prisma.member.create({
    data: payload,
  });
  return result;
};
const createManyMemberIntoDB = async (payload: any) => {
  const result = await prisma.member.createManyAndReturn({
    data: payload,
  });
  return result;
};
const getAllMembersFromDB = async () => {
  const result = await prisma.member.findMany();
  return result;
};
const getMemberByIdFromDB = async (memberId: string) => {
  const result = await prisma.member.findUnique({
    where: { memberId },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not available.");
  }
  return result;
};
const updateMemberIntoDB = async (memberId: string, payload: any) => {
  const isMemberAvailable = await prisma.member.findUnique({
    where: { memberId },
  });
  if (!isMemberAvailable) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not available.");
  }
  const result = await prisma.member.update({
    where: {
      memberId,
    },
    data: payload,
  });
  return result;
};
const deleteMemberFromDB = async (memberId: string) => {
  const isMemberAvailable = await prisma.member.findUnique({
    where: { memberId },
  });
  if (!isMemberAvailable) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not available.");
  }
  const result = await prisma.member.delete({
    where: {
      memberId,
    },
  });
  return result;
};
export const memberService = {
  createMemberIntoDB,
  createManyMemberIntoDB,
  getAllMembersFromDB,
  getMemberByIdFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
};
