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
import Link from "next/link";
import { SocketContext } from "context/SocketIOContext";

const convertDate = (date: dayjs.Dayjs) =>
  date.year() + "-" + (date.month() + 1) + "-" + date.date();

const Dashboard: NextPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const lateOrFailedHomework = () => {
    if (homeworkLate(user!.homework).length !== 0) return true;
    if (homeworkNotSubmitted(user!.homework).length !== 0) return true;
    return false;
  };

  if (!user) return <div></div>;

  useEffect(() => {
    const fromDate = convertDate(dayjs().subtract(7, "day"));
    const toDate = convertDate(dayjs().add(7, "day"));

    socket?.emit("getBehaviour", [fromDate, toDate]);
    socket?.emit("getActivity", [fromDate, toDate]);
    socket?.emit("getHomework", [fromDate, toDate]);
    socket?.emit("getTimetable");
  }, []);

  return (
    <div className="mx-auto">
      <Head>
        <title>Dashboard | BetterCharts</title>
      </Head>

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
                    <Link href="/announcements">
                      <Button
                        size="3"
                        className="flex items-center justify-center w-full"
                      >
                        View {user?.announcements?.length - 1} more
                        announcements
                      </Button>
                    </Link>
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
  );
};

export default Dashboard;
