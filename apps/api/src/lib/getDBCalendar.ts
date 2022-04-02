import prisma from "./prisma";

const getDBCalendar = async (studentId: string) => {
  return prisma.calendarDay.findMany({
    where: {
      studentId,
    },
  });
};

export default getDBCalendar;
