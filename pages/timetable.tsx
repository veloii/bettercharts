import { UserContext } from "context/ClassChartsContext";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Container from "ui/Container";
import Timetable from "ui/Timetable";
import { SingleDatePicker } from "react-dates";
import { useRouter } from "next/router";

const TimeTable = () => {
  const { user, setUser } = useContext(UserContext);
  const [date, setDate] = useState<any>(null);
  const [focused, setFocused] = useState<any>(false);

  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/login");
  }, []);

  return user ? (
    <Container>
      <Head>
        <title>Timetable | BetterCharts</title>
      </Head>
      <div className="pt-5">
        <div className="flex items-center justify-center p-5 -mb-16 bg-white border dark:bg-gray-900 lg:-mt-24 lg:float-right sm:rounded-3xl lg:bg-transparent lg:p-0 dark:border-gray-700 lg:border-none lg:shadow-none lg:rounded-none lg:-mb-0">
          <SingleDatePicker
            date={date}
            onDateChange={(date) => {
              const dateFormat = date?.format("YYYY-MM-DD");
              fetch("/api/getTimetable?date=" + dateFormat)
                .then((res) => res.json())
                .then((res) => {
                  const shallowCopy = { ...user };
                  shallowCopy.lessons = res;
                  setUser(shallowCopy);
                });
              setDate(date);
            }}
            focused={focused}
            onFocusChange={({ focused }) => setFocused(focused)}
            id="timetable"
            noBorder
            isOutsideRange={() => false}
          />
        </div>

        {user.lessons.length !== 0 ? (
          <Timetable timetable={user.lessons} />
        ) : (
          <div className="flex items-center justify-center p-10 mt-16 bg-gray-800 shadow rounded-3xl dark:shadow-none">
            <div>
              <img className="w-96" src="/NoHomework.svg" />
              <h2 className="py-2 text-3xl font-semibold text-center text-gray-200">
                Data for that day not available
              </h2>
            </div>
          </div>
        )}
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

export default TimeTable;
