import { UserContext } from "../context/ClassChartsContext";
import React, { useEffect } from "react";
import BehaviourBreakdown from "ui/BehaviourBreakdown";
import "chart.js/auto";
import Timeline from "ui/Timeline";
import Container from "ui/Container";
import Head from "next/head";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { SocketContext } from "context/SocketIOContext";

const behaviour = () => {
  const { user } = React.useContext(UserContext);
  const { socket } = React.useContext(SocketContext);
  const [dates, setDates] = React.useState<Date[]>();
  const behaviour = user?.behaviour,
    activity = user?.activity;

  useEffect(() => {
    socket?.emit("getBehaviour");
    socket?.emit("getActivity");
  }, []);

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

      socket?.emit("getBehaviour", [startDateFormatted, endDateFormatted]);
      socket?.emit("getActivity", [startDateFormatted, endDateFormatted]);
    } else {
      socket?.emit("getBehaviour");
      socket?.emit("getActivity");
    }
  };

  return (
    <Container>
      <Head>
        <title>Behaviour | BetterCharts</title>
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

        {behaviour && (
          <div className="pb-16">
            <BehaviourBreakdown behaviour={behaviour!} />
          </div>
        )}
        {activity && (
          <div className="p-5 bg-white shadow dark:bg-gray-900 sm:rounded-3xl">
            <Timeline activity={activity} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default behaviour;
