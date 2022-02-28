import HomeworkCategory from "../ui/HomeworkCategory";
import { UserContext } from "../context/ClassChartsContext";
import React, { useEffect, useState } from "react";
import { HomeworksResponse } from "classcharts-api/dist/types";
import { DateRangePicker } from "react-dates";
import Container from "ui/Container";
import Head from "next/head";
import { useRouter } from "next/router";

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
  const [ready, setReady] = useState<boolean>(false);
  const [completedFetch, setCompletedFetch] = useState<boolean>(false);

  useEffect(() => {
    if (!homework && user?.student) setHomework(user?.homework);
  }, [user]);

  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/login");
  }, []);

  // Update to recent homework cus of dashboard might be changing it
  useEffect(() => {
    if (!user) return;
    if (completedFetch) return;
    setCompletedFetch(true);

    fetch(`/api/getHomework`)
      .then((res) => res.json())
      .then((res) => {
        setHomework(res);
        setReady(true);
      });
  });

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

  return user?.homework && ready ? (
    <Container>
      <Head>
        <title>Homework | BetterCharts</title>
      </Head>
      <div className="pt-5 space-y-2">
        <div className="flex items-center justify-center p-5 -mb-16 bg-white border dark:bg-gray-900 lg:-mt-24 lg:float-right sm:rounded-3xl lg:bg-transparent lg:p-0 dark:border-gray-700 lg:border-none lg:shadow-none lg:rounded-none lg:-mb-0">
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
  ) : (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-0 m-0 bg-white dark:bg-gray-900">
      <Head>
        <title>Loading | BetterCharts</title>
      </Head>
      <div className="loading"></div>
    </div>
  );
};

export default homework;
