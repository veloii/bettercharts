"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDBCalendar_1 = __importDefault(require("./getDBCalendar"));
const getDBUser_1 = __importDefault(require("./getDBUser"));
const getCalendar = async (studentId) => {
    // this creates a user if it doesn't exist
    const user = await (0, getDBUser_1.default)(studentId);
    const calendar = await (0, getDBCalendar_1.default)(studentId);
    return calendar;
};
exports.default = getCalendar;
