"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const createCalendarEvent = async (studentId, event) => {
    let { name, date, colors, homeworkId, notes, duration, completed } = event;
    // convert string to js date
    date = new Date(date);
    let dbCreate;
    try {
        dbCreate = await prisma_1.default.calendarDay.create({
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
        if (!dbCreate)
            return false;
    }
    catch {
        return false;
    }
    return dbCreate;
};
exports.default = createCalendarEvent;
