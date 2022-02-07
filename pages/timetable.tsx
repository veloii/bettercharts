import { UserContext } from "context/ClassChartsContext";
import Head from "next/head";
import { useContext, useState } from "react";
import Container from "ui/Container";
import Timetable from "ui/Timetable";
import { SingleDatePicker } from "react-dates";

const TimeTable = () => {
  const { user, setUser } = useContext(UserContext);
  const [date, setDate] = useState<any>(null);
  const [focused, setFocused] = useState<any>(false);

  return user ? (
    <Container>
      <Head>
        <title>Timetable | BetterCharts</title>
      </Head>
      <div className="pt-5">
        <div className="dark:bg-gray-900 lg:-mt-24 lg:float-right sm:rounded-3xl flex justify-center items-center lg:bg-transparent bg-white lg:p-0 border dark:border-gray-700 lg:border-none lg:shadow-none lg:rounded-none lg:-mb-0 -mb-16 p-5">
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
          <div className="flex justify-center items-center mt-16 bg-gray-800 p-10 rounded-3xl shadow dark:shadow-none">
            <div>
              <img className="w-96" src="/NoHomework.svg" />
              <h2 className="text-3xl text-center text-gray-200 font-semibold py-2">
                Data for that day not available
              </h2>
            </div>
          </div>
        )}
      </div>
    </Container>
  ) : (
    <div className="m-0 p-0 w-screen h-screen absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50">
      <Head>
        <title>Loading | BetterCharts</title>
      </Head>
      <div className="loading"></div>
    </div>
  );
};

export default TimeTable;
