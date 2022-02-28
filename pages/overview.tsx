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
import DangerButton from "ui/DangerButton";
import { useRouter } from "next/router";

const convertDate = (date: dayjs.Dayjs) =>
  date.year() + "-" + (date.month() + 1) + "-" + date.date();

const Dashboard: NextPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [completedFetch, setCompletedFetch] = useState(false);
  const [ready, setReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/login");
  }, []);

  const lateOrFailedHomework = () => {
    if (homeworkLate(user!.homework).length !== 0) return true;
    if (homeworkNotSubmitted(user!.homework).length !== 0) return true;
    return false;
  };

  useEffect(() => {
    if (!user) return;
    if (completedFetch) return;
    else setCompletedFetch(true);

    fetch(
      `/api/getHBAT?startDate=${convertDate(
        dayjs().subtract(7, "day")
      )}&endDate=${convertDate(dayjs().add(7, "day"))}`
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
        <title>Dashboard | BetterCharts</title>
      </Head>
      <div className="py-10 bg-white border-b shadow-lg dark:bg-gray-900 dark:border-gray-700">
        <h1 className="text-5xl text-center text-purple-500 font-brand dark:text-purple-300">
          dashboard
        </h1>
        <p className="text-sm text-center text-gray-700 dark:text-gray-400">
          an exclusive bettercharts feature
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
              {lateOrFailedHomework() && (
                <div className="px-5 pt-5">
                  <DangerButton
                    size="3"
                    link="/homework"
                    text="You have failed / late homework, view now"
                    classes="w-full flex justify-center items-center"
                  />
                </div>
              )}
            </Card>
          )}
          <Card classes="px-5 pt-5" title="Recent Activity">
            <div className="overflow-y-scroll h-96">
              <Timeline limit={10} activity={user.activity} />
            </div>
            <div className="-mb-24 fade"></div>
          </Card>
          <Card classes="px-5 pt-5" title="Behaviour Weekly">
            <div className="flex items-center justify-center">
              <PieChartBreakdown behaviour={user.behaviour} />
            </div>
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
                  <div className="z-10 -mb-24 fade"></div>
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
                <div className="flex items-center justify-center py-5 pt-16 m-5 bg-gray-800 shadow dark:bg-transparent dark:py-0 dark:mx-0 rounded-3xl dark:shadow-none">
                  <div>
                    <img className="w-96" src="/NoHomework.svg" />
                    <h2 className="py-2 text-3xl font-semibold text-center text-gray-200">
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
