import { UserContext } from "context/ClassChartsContext";
import Masonry from "react-masonry-css";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Button from "ui/Button";
import Card from "ui/Card";
import Detention from "ui/Detention";
import HomeworkCategory from "ui/HomeworkCategory";
import Timeline from "ui/Timeline";
import { convertDetentions, detentionType } from "./detentions";
import {
  homeworkCompleted,
  homeworkLate,
  homeworkNotSubmitted,
  homeworkSubmitted,
  homeworkTodo,
} from "./homework";
import "chart.js/auto";
import PieChartBreakdown from "ui/PieChartBreakdown";
import dayjs from "dayjs";
import Head from "next/head";
import Announcement from "ui/Announcement";
import Timetable from "ui/Timetable";

const convertDate = (date: dayjs.Dayjs) =>
  date.year() + "-" + (date.month() + 1) + "-" + date.date();

const Dashboard: NextPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [completedFetch, setCompletedFetch] = useState(false);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    if (!user) return;
    if (completedFetch) return;
    else setCompletedFetch(true);

    fetch(
      `/api/getHBAT?startDate=${convertDate(
        dayjs().subtract(7, "day")
      )}&endDate=${convertDate(dayjs())}`
    )
      .then((res) => res.json())
      .then((res) => {
        const shallowCopy = { ...user };
        shallowCopy!.homework = res.homework;
        shallowCopy!.behaviour = res.behaviour;
        shallowCopy!.activity = res.activity;
        shallowCopy!.lessons = res.lessons;

        setUser(shallowCopy);
        setReady(true);
      });
  });

  return user && ready ? (
    <div className="mx-auto">
      <Head>
        <title>Overview | BetterCharts</title>
      </Head>
      <div className="dark:bg-gray-900 bg-white border-b dark:border-gray-700 py-10 shadow-lg">
        <h1 className="text-4xl font-bold dark:text-gray-50 text-gray-900 text-center">
          Your weekly rundown
        </h1>
        <p className="text-sm dark:text-gray-400 text-gray-700 text-center">
          Updates every day
        </p>
      </div>
      <div>
        <Masonry
          breakpointCols={{ default: 3, 1100: 2, 700: 1, 500: 1 }}
          className="dash-grid sm:px-2 md:px-8 xl:px-32 2xl:px-40"
          columnClassName="dash-grid_column"
        >
          {detentionType(user.detentions, "today").length !== 0 && (
            <Card title="Detentions">
              <Detention
                compact={true}
                detentions={convertDetentions(
                  detentionType(user.detentions, "today")
                )}
              />
              <div className="px-5 pt-5">
                <Button
                  size="3"
                  link="/detentions"
                  text="View All"
                  classes="w-full flex justify-center items-center"
                />
              </div>
            </Card>
          )}
          {user?.homework && (
            <Card title="Homework">
              <HomeworkCategory
                compact={true}
                homework={homeworkTodo(user.homework)}
                type="todo"
              />
              <HomeworkCategory
                compact={true}
                homework={homeworkCompleted(user.homework)}
                type="completed"
              />
              <HomeworkCategory
                compact={true}
                homework={homeworkNotSubmitted(user.homework)}
                type="fail"
              />
              <HomeworkCategory
                compact={true}
                homework={homeworkLate(user.homework)}
                type="late"
              />
              <HomeworkCategory
                compact={true}
                homework={homeworkSubmitted(user.homework)}
                type="submitted"
              />
              <div className="px-5 pt-5">
                <Button
                  size="3"
                  link="/homework"
                  text="View All"
                  classes="w-full flex justify-center items-center"
                />
              </div>
            </Card>
          )}
          <Card classes="px-5 pt-5" title="Recent Activity">
            <div className="overflow-y-scroll h-96">
              <Timeline limit={10} activity={user.activity} />
            </div>
            <div className="fade -mb-24"></div>
            <Button
              size="3"
              link="/behaviour"
              text="View All"
              classes="w-full flex justify-center items-center"
            />
          </Card>
          <Card classes="px-5 pt-5" title="Behaviour Weekly">
            <div className="flex justify-center items-center">
              <PieChartBreakdown behaviour={user.behaviour} />
            </div>
            <Button
              size="3"
              link="/behaviour"
              text="View More Data"
              classes="w-full flex justify-center items-center"
            />
          </Card>
          {user?.announcements?.length > 0 && (
            <Card title="Announcements">
              <Announcement noShadow announcement={user?.announcements[0]} />
              {user?.announcements?.length > 1 && (
                <>
                  <div className="h-16 overflow-hidden z-[-1]">
                    <Announcement
                      noShadow
                      announcement={user?.announcements[1]}
                    />
                  </div>
                  <div className="fade -mb-24 z-10"></div>
                  <div className="px-5 pt-5">
                    <Button
                      size="3"
                      link="/announcements"
                      text={`View ${
                        user?.announcements?.length - 1
                      } more announcements`}
                      classes="w-full flex justify-center items-center"
                    />
                  </div>
                </>
              )}
            </Card>
          )}
          <Card title="Timetable">
            <div className="overflow-x-scroll overflow-y-hidden">
              {user.lessons?.length !== 0 ? (
                <Timetable compact noShadow timetable={user.lessons} />
              ) : (
                <div className="dark:bg-transparent bg-gray-800 m-5 py-5 dark:py-0 dark:mx-0 flex justify-center items-center pt-16 rounded-3xl shadow dark:shadow-none">
                  <div>
                    <img className="w-96" src="/NoHomework.svg" />
                    <h2 className="text-3xl text-center text-gray-200 font-semibold py-2">
                      Data for today is not available
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Masonry>
      </div>
    </div>
  ) : (
    <div
      className={`m-0 p-0 w-screen h-screen gap-4 absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50`}
    >
      <Head>
        <title>Loading | BetterCharts</title>
      </Head>
      <div className="loading"></div>
    </div>
  );
};

export default Dashboard;
