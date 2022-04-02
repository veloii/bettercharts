"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimetable = async (client, date) => {
    try {
        if (date) {
            return await client.getLessons({
                date,
            });
        }
        else {
            const today = new Date();
            const date = today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            return await client.getLessons({ date });
        }
    }
    catch {
        return null;
    }
};
exports.default = getTimetable;
