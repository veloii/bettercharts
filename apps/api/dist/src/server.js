"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const getActivity_1 = __importDefault(require("./lib/getActivity"));
const getBehaviour_1 = __importDefault(require("./lib/getBehaviour"));
const getHomework_1 = __importDefault(require("./lib/getHomework"));
const getTimetable_1 = __importDefault(require("./lib/getTimetable"));
const getUser_1 = __importDefault(require("./lib/getUser"));
const classcharts_api_1 = require("classcharts-api");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.REDIRECT_HOST,
        credentials: true,
    },
});
io.use(async (socket, next) => {
    const accessCode = socket.handshake.auth.accessCode;
    const dateOfBirth = socket.handshake.auth.dateOfBirth;
    const client = new classcharts_api_1.ClasschartsClient(accessCode, dateOfBirth);
    try {
        await client.login();
        next();
    }
    catch {
        const err = new Error("Not Authorized");
        err.data = { content: "Invalid Access Code or Date of Birth" };
        next(err);
    }
});
io.on("connection", async (socket) => {
    const client = new classcharts_api_1.ClasschartsClient(socket.handshake.auth.accessCode, socket.handshake.auth.dateOfBirth);
    let user = null;
    await client.login().then(() => {
        (0, getUser_1.default)(client).then((_user) => {
            user = _user;
            socket.emit("ready");
        });
    });
    socket.on("getHomework", async (dates) => {
        let homework;
        if (dates) {
            homework = await (0, getHomework_1.default)(client, dates[0], dates[1]);
        }
        else {
            homework = await (0, getHomework_1.default)(client);
        }
        user.homework = homework;
        socket.emit("refreshData", user);
    });
    socket.on("getBehaviour", async (dates) => {
        let behaviour;
        if (dates) {
            behaviour = await (0, getBehaviour_1.default)(client, dates[0], dates[1]);
        }
        else {
            behaviour = await (0, getBehaviour_1.default)(client);
        }
        user.behaviour = behaviour;
        socket.emit("refreshData", user);
    });
    socket.on("getTimetable", async (date) => {
        let timetable;
        if (date) {
            timetable = await (0, getTimetable_1.default)(client, date);
        }
        else {
            timetable = await (0, getTimetable_1.default)(client);
        }
        user.lessons = timetable;
        socket.emit("refreshData", user);
    });
    socket.on("getActivity", async (dates) => {
        let activity;
        if (dates) {
            activity = await (0, getActivity_1.default)(client, dates[0], dates[1]);
        }
        else {
            activity = await (0, getActivity_1.default)(client);
        }
        user.activity = activity;
        socket.emit("refreshData", user);
    });
    socket.on("tickHomework", async (homeworkId) => {
        await client.makeAuthedRequest(`https://www.classcharts.com/apiv2student/homeworkticked/${homeworkId}?pupil_id=${user?.student.id}`, { method: "GET" });
    });
    socket.on("getInfo", async () => {
        socket.emit("refreshData", user);
    });
});
app.get("*", (req, res) => {
    res.status(404).end();
});
server.listen(8080, "127.0.0.1", () => {
    console.log("listening on *:8080");
});
