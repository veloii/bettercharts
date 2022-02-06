import HomeworkCategory from "../ui/HomeworkCategory";
import { UserContext } from "../context/ClassChartsContext";
import React, { useEffect, useState } from "react";
import { HomeworksResponse } from "classcharts-api/dist/types";
import { DateRangePicker } from "react-dates";
import Container from "ui/Container";

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
  const { user, setUser } = React.useContext(UserContext);

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [prevQuery, setPrevQuery] = useState<any>(undefined);
  const [currentQuery, setCurrentQuery] = useState<any>(undefined);
  const [homework, setHomework] = useState<HomeworksResponse | undefined>(
    user?.homework
  );
  const [originalHomework, setOriginalHomework] = useState<
    HomeworksResponse | undefined
  >();

  useEffect(() => {
    if (!homework && user?.student) setHomework(user?.homework);
  }, [user]);

  //! Everytime homework is updated we update the user and keep a seperate copy of the using
  //! This might seem unnessarry but this is the easiest way to fix the bug of another component
  //! trying to mark homework that is not in the user.homework timeframe as complete and failing
  useEffect(() => {
    if (user?.homework && homework) {
      const shallowCopy = { ...user };
      shallowCopy.homework = homework;
      setUser(shallowCopy);
    }
  }, [homework]);

  //! This lets it still keep the functionalty of not fetching for the original timeframe
  useEffect(() => {
    if (user?.student && user?.homework) {
      if (originalHomework === undefined) {
        setOriginalHomework([...user?.homework!]);
      }
    }
  });

  useEffect(() => {
    if (
      prevQuery?.startDate + prevQuery?.endDate !=
      currentQuery?.startDate + currentQuery?.endDate
    ) {
      if (currentQuery?.startDate === undefined) {
        setHomework(originalHomework);
      } else {
        fetch(
          `/api/getHomework?startDate=${currentQuery.startDate}&endDate=${currentQuery.endDate}`
        )
          .then((res) => res.json())
          .then((res) => setHomework(res));
      }

      setPrevQuery(currentQuery);
    }
  }, [currentQuery]);

  return user?.homework ? (
    <Container>
      <div className="pt-5 space-y-2">
        <div className="dark:bg-gray-900 lg:-mt-24 lg:float-right sm:rounded-3xl flex justify-center items-center lg:bg-transparent bg-white lg:p-0 border dark:border-gray-700 lg:border-none lg:shadow-none lg:rounded-none lg:-mb-0 -mb-16 p-5">
          <DateRangePicker
            startDate={startDate}
            startDateId="s_id"
            endDate={endDate}
            endDateId="e_id"
            onDatesChange={({ startDate, endDate }: any) => {
              let startDateFormat = startDate;
              let endDateFormat = endDate;

              if (startDateFormat)
                startDateFormat = startDate?.format("YYYY-MM-DD");
              if (endDateFormat) endDateFormat = endDate?.format("YYYY-MM-DD");

              if (startDateFormat && endDateFormat) {
                setCurrentQuery({
                  startDate: startDateFormat,
                  endDate: endDateFormat,
                });
              }
              if (!startDateFormat && !endDateFormat) {
                setCurrentQuery(null);
              }

              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(e: any) => setFocusedInput(e)}
            displayFormat="DD/MM/YYYY"
            isOutsideRange={() => false}
            noBorder={true}
          />
        </div>

        <div className="pt-16 lg:pt-0 space-y-2">
          {homework && (
            <HomeworkCategory
              type="todo"
              name="Todo"
              homework={homeworkTodo(homework)}
            />
          )}
          {homework && (
            <HomeworkCategory
              type="completed"
              name="Completed"
              homework={homeworkCompleted(homework)}
            />
          )}
          {homework && (
            <HomeworkCategory
              type="late"
              name="Late"
              homework={homeworkLate(homework)}
            />
          )}
          {homework && (
            <HomeworkCategory
              type="fail"
              name="Not Submitted"
              homework={homeworkNotSubmitted(homework)}
            />
          )}
          {homework && (
            <HomeworkCategory
              type="submitted"
              name="Submitted"
              homework={homeworkSubmitted(homework)}
            />
          )}
        </div>
      </div>
    </Container>
  ) : (
    <div className="m-0 p-0 w-screen h-screen absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50">
      <div className="loading"></div>
    </div>
  );
};

export default homework;
