import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import getActivity from "./lib/getActivity";
import getBehaviour from "./lib/getBehaviour";
import getHomework from "./lib/getHomework";
import getTimetable from "./lib/getTimetable";
import getUser from "./lib/getUser";
import ClassCharts from "./types/ClassCharts";
import { ClasschartsClient } from "classcharts-api";
import getCalendar from "./lib/getCalendar";
import createCalendarEvent, {
  createCalendarEventParams,
} from "./lib/createCalendarEvent";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.REDIRECT_HOST || process.env.REDIRECT_HOST_2,
    credentials: true,
  },
});

io.use(async (socket, next) => {
  const accessCode = socket.handshake.auth.accessCode;
  const dateOfBirth = socket.handshake.auth.dateOfBirth;

  const client = new ClasschartsClient(accessCode, dateOfBirth);

  try {
    await client.login();
    next();
  } catch {
    const err: any = new Error("Not Authorized");
    err.data = { content: "Invalid Access Code or Date of Birth" };
    next(err);
  }
});

io.on("connection", async (socket) => {
  const client = new ClasschartsClient(
    socket.handshake.auth.accessCode,
    socket.handshake.auth.dateOfBirth
  );

  let user: ClassCharts | null = null;

  await client.login().then(() => {
    getUser(client).then((_user) => {
      user = _user;
      socket.emit("ready");
    });
  });

  socket.on("getHomework", async (dates: string[]) => {
    let homework;
    if (dates) {
      homework = await getHomework(client, dates[0], dates[1]);
    } else {
      homework = await getHomework(client);
    }

    user!.homework = homework!;
    socket.emit("refreshData", user);
  });

  socket.on("getBehaviour", async (dates: string[]) => {
    let behaviour;
    if (dates) {
      behaviour = await getBehaviour(client, dates[0], dates[1]);
    } else {
      behaviour = await getBehaviour(client);
    }

    user!.behaviour = behaviour!;
    socket.emit("refreshData", user);
  });

  socket.on("getTimetable", async (date: string) => {
    let timetable;
    if (date) {
      timetable = await getTimetable(client, date);
    } else {
      timetable = await getTimetable(client);
    }

    user!.lessons = timetable!;
    socket.emit("refreshData", user);
  });

  socket.on("getActivity", async (dates: string[]) => {
    let activity;
    if (dates) {
      activity = await getActivity(client, dates[0], dates[1]);
    } else {
      activity = await getActivity(client);
    }

    user!.activity = activity!;
    socket.emit("refreshData", user);
  });

  // socket.on("createCalendarEvent", async (event: createCalendarEventParams) => {
  //   const create = await createCalendarEvent(
  //     user!.student!.id!.toString(),
  //     event
  //   );
  //   if (create) {
  //     const calendar = await getCalendar(user!.student!.id!.toString());
  //     socket.emit("refreshCalendar", calendar);
  //   }
  // });

  // socket.on("getCalendar", async () => {
  //   const calendar = await getCalendar(user!.student!.id!.toString());
  //   socket.emit("refreshCalendar", calendar);
  // });

  socket.on("tickHomework", async (homeworkId: string | number) => {
    await client.makeAuthedRequest(
      `https://www.classcharts.com/apiv2student/homeworkticked/${homeworkId}?pupil_id=${user?.student.id}`,
      { method: "GET" }
    );
  });

  socket.on("getInfo", async () => socket.emit("refreshData", user));
});

app.get("*", (req, res) => {
  res.status(404).end();
});

server.listen(8080, "127.0.0.1", () => {
  console.log("listening on *:8080");
});
