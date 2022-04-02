"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const createDBEntry = async (studentId) => {
    return await prisma_1.default.student.create({
        data: {
            id: studentId,
        },
    });
};
const getUser = async (studentId) => {
    try {
        const userExists = await prisma_1.default.student.findUnique({
            where: {
                id: studentId,
            },
        });
        if (userExists)
            return userExists;
        else
            return false;
    }
    catch {
        return false;
    }
};
const getDBUser = async (studentId) => {
    const user = await getUser(studentId);
    if (user === false)
        return await createDBEntry(studentId);
    else
        return user;
};
exports.default = getDBUser;
