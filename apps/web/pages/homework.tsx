import HomeworkCategory from "../ui/HomeworkCategory";
import { UserContext } from "../context/ClassChartsContext";
import React, { useEffect, useState } from "react";
import { HomeworksResponse } from "classcharts-api/dist/types";
import Container from "ui/Container";
import Head from "next/head";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { SocketContext } from "context/SocketIOContext";

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

const homework = () => {
  const { user } = React.useContext(UserContext);
  const [dates, setDates] = useState<Date[]>();
  const homework = user?.homework;
  const { socket } = React.useContext(SocketContext);

  const handleChangeDate = (dates: Date[]) => {
    if (dates) {
      const startDate = dates[0];
      const endDate = dates[1];

      const startDateFormatted =
        startDate.getFullYear() +
        "-" +
        (startDate.getUTCMonth() + 1) +
        "-" +
        startDate.getUTCDate();
      const endDateFormatted =
        endDate.getFullYear() +
        "-" +
        (endDate.getUTCMonth() + 1) +
        "-" +
        endDate.getUTCDate();

      socket?.emit("getHomework", [startDateFormatted, endDateFormatted]);
    } else {
      socket?.emit("getHomework");
    }
  };

  useEffect(() => {
    socket?.emit("getHomework");
  }, []);

  return (
    <Container>
      <Head>
        <title>Homework | BetterCharts</title>
      </Head>
      <div className="pt-5 space-y-2">
        <div className="flex items-center justify-center p-5 -mb-16 bg-white border dark:bg-gray-900 lg:-mt-24 lg:float-right sm:rounded-3xl lg:bg-transparent lg:p-0 dark:border-gray-700 lg:border-none lg:shadow-none lg:rounded-none lg:-mb-0">
          <DateRangePicker
            value={dates}
            onChange={(value: Date[]) => {
              handleChangeDate(value);
              setDates(value);
            }}
          />
        </div>

        <div className="pt-16 space-y-2 lg:pt-0">
          {homework && homeworkTodo(homework).length !== 0 && (
            <HomeworkCategory
              type="todo"
              name="Todo"
              homework={homeworkTodo(homework)}
            />
          )}
          {homework && homeworkCompleted(homework).length !== 0 && (
            <HomeworkCategory
              type="completed"
              name="Completed"
              homework={homeworkCompleted(homework)}
            />
          )}
          {homework && homeworkLate(homework).length !== 0 && (
            <HomeworkCategory
              type="late"
              name="Late"
              homework={homeworkLate(homework)}
            />
          )}
          {homework && homeworkNotSubmitted(homework).length !== 0 && (
            <HomeworkCategory
              type="fail"
              name="Not Submitted"
              homework={homeworkNotSubmitted(homework)}
            />
          )}
          {homework && homeworkSubmitted(homework).length !== 0 && (
            <HomeworkCategory
              type="submitted"
              name="Submitted"
              homework={homeworkSubmitted(homework)}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default homework;
