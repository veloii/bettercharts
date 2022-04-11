import { CalendarDay } from "@prisma/client";
import prisma from "./prisma";

export interface createCalendarEventParams {
  name: string;
  date: Date | string;
  notes?: string;
  colors: {
    bg: string;
    text: string;
  };
  homeworkId?: number;
  duration: number;
  completed?: boolean;
}

const createCalendarEvent = async (
  studentId: string,
  event: createCalendarEventParams
) => {
  let { name, date, colors, homeworkId, notes, duration, completed } = event;

  // convert string to js date
  date = new Date(date);

  let dbCreate: CalendarDay;

  try {
    dbCreate = await prisma.calendarDay.create({
      data: {
        studentId,
        bgColor: colors.bg,
        textColor: colors.text,
        notes: notes || "",
        date,
        duration,
        completed: completed || false,
        homeworkId: homeworkId || 0,
        name,
      },
    });
    if (!dbCreate) return false;
  } catch {
    return false;
  }

  return dbCreate;
};

export default createCalendarEvent;
