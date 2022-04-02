import { Homework } from "classcharts-api/dist/types";
import * as filter from "./filterHomework";
import { Clock, Check, Checks, X, Pencil } from "tabler-icons-react";

export const determineIcon = (homework: Homework) => {
  const todo = filter.homeworkTodo([{ ...homework }]);
  const completed = filter.homeworkCompleted([{ ...homework }]);
  const notSubmitted = filter.homeworkNotSubmitted([{ ...homework }]);
  const late = filter.homeworkLate([{ ...homework }]);
  const submitted = filter.homeworkSubmitted([{ ...homework }]);

  if (todo.length === 1) return { element: Pencil, color: "gray" };
  else if (completed.length === 1) return { element: Check, color: "green" };
  else if (notSubmitted.length === 1) return { element: X, color: "red" };
  else if (late.length === 1) return { element: Clock, color: "yellow" };
  else if (submitted.length === 1) return { element: Checks, color: "green" };
  else return { element: Checks, color: "green" };
};

export default (homework: Homework) => ({
  icon: determineIcon(homework),
  name: homework.title,
  teacher: homework.teacher,
  class: homework.lesson,
  subject: homework.subject,
  type: homework.homework_type,
  dueIn: homework.due_date,
});
