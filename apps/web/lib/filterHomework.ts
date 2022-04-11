import { HomeworksResponse } from "classcharts-api/dist/types";

export const homeworkTodo = (homework: HomeworksResponse) =>
  homework.filter(
    (item) => item.status.state === null && item.status.ticked === "no"
  );

export const homeworkCompleted = (homework: HomeworksResponse) =>
  homework.filter(
    (item) => item.status.state === null && item.status.ticked === "yes"
  );

export const homeworkNotSubmitted = (homework: HomeworksResponse) =>
  homework.filter((item) => item.status.state === "not_completed");

export const homeworkLate = (homework: HomeworksResponse) =>
  homework.filter((item) => item.status.state === "late");

export const homeworkSubmitted = (homework: HomeworksResponse) =>
  homework.filter((item) => item.status.state === "completed");
