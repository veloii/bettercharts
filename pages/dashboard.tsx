import { UserContext } from "context/ClassChartsContext";
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
      `/api/getHomework?startDate=${convertDate(
        dayjs().subtract(7, "day")
      )}&endDate=${convertDate(dayjs())}`
    )
      .then((res) => res.json())
      .then((homeworkRes) => {
        fetch(
          `/api/getBehaviourActivity?startDate=${convertDate(
            dayjs().subtract(7, "day")
          )}&endDate=${convertDate(dayjs())}`
        )
          .then((res) => res.json())
          .then((activityRes) => {
            const shallowCopy = { ...user };
            shallowCopy!.behaviour = activityRes.behaviour;
            shallowCopy!.activity = activityRes.activity;
            shallowCopy!.homework = homeworkRes;

            setUser(shallowCopy);
            setReady(true);
          });
      });
  });

  return user && ready ? (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:p-6 lg:p-8 items-start justify-center">
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
        <Timeline activity={user.activity} limit={6} />
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
    </div>
  ) : (
    <div
      className={`m-0 p-0 w-screen h-screen gap-4 absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50`}
    >
      <div className="loading"></div>
    </div>
  );
};

export default Dashboard;
