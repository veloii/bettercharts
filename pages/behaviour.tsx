import { UserContext } from "../context/ClassChartsContext";
import React, { useEffect, useState } from "react";
import { Activity_point, Behaviour } from "../types/ClassCharts";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import BehaviourBreakdown from "ui/BehaviourBreakdown";
import "chart.js/auto";
import Timeline from "ui/Timeline";
import Container from "ui/Container";

const behaviour = () => {
  const { user, setUser } = React.useContext(UserContext);

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [prevQuery, setPrevQuery] = useState<any>(undefined);
  const [currentQuery, setCurrentQuery] = useState<any>(undefined);
  const [activity, setActivity] = useState<Activity_point[] | undefined>(
    user?.activity
  );
  const [behaviour, setBehaviour] = useState<Behaviour | undefined>(
    user?.behaviour
  );
  const [hasReset, setHasReset] = useState(false);
  const [ready, setReady] = useState(false)

  // Reset data from overview
  useEffect(() => {
    if (hasReset) return;
    setHasReset(true)
    fetch(`/api/getBehaviourActivity`)
      .then((res) => res.json())
      .then((res) => {
        setBehaviour(res?.behaviour);
        setActivity(res?.activity);
        setReady(true);
      });
  });

  useEffect(() => {
    setBehaviour(user?.behaviour);
    setActivity(user?.activity);
  }, [user]);

  useEffect(() => {
    if (
      prevQuery?.startDate + prevQuery?.endDate !=
      currentQuery?.startDate + currentQuery?.endDate
    ) {
      if (currentQuery?.startDate === undefined) {
        setBehaviour(user?.behaviour);
        setActivity(user?.activity);
      } else {
        fetch(
          `/api/getBehaviourActivity?startDate=${currentQuery.startDate}&endDate=${currentQuery.endDate}`
        )
          .then((res) => res.json())
          .then((res) => {
            setBehaviour(res?.behaviour);
            setActivity(res?.activity);
          });
      }

      setPrevQuery(currentQuery);
    }
  }, [currentQuery]);

  return user && ready ? (
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

        {behaviour && (
          <div className="pb-16">
            <BehaviourBreakdown behaviour={behaviour!} />
          </div>
        )}
        {activity && (
          <div className="bg-white dark:bg-gray-900 sm:rounded-3xl shadow p-5">
            <Timeline activity={activity} />
          </div>
        )}
      </div>
    </Container>
  ) : (
    <div className={`m-0 p-0 w-screen h-screen gap-4 absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center`}>
      <div className="loading"></div>
    </div>
  );
};

export default behaviour;
