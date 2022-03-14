import React, { useEffect } from "react";
import Button from "./Button";
import Seperator from "./Seperator";
import SimpleSelect from "./SimpleSelect";
import MonthView from "./calendar/views/MonthView";
import WeekView from "./calendar/views/WeekView";

const Calendar = () => {
  const month = React.useState<string>();
  const year = React.useState<string>();
  const [view, setView] = React.useState<string>("month");

  return (
    <div>
      <div className="bg-gray-50 flex items-center justify-between p-5 px-7">
        <h1 className="font-bold text-xl text-center">
          {month} {year}
        </h1>
        <div className="flex gap-4">
          <SimpleSelect
            defaultIndex={0}
            data={[
              { id: "month", name: "Month view" },
              { id: "week", name: "Week view" },
            ]}
            onChange={(value) => setView(value.id)}
          />
          <Seperator className="h-7 mx-2" />
          <Button size="4">Add event</Button>
        </div>
      </div>

      {view === "month" && <MonthView yearState={year} monthState={month} />}
      {view === "week" && <WeekView yearState={year} monthState={month} />}
    </div>
  );
};

export default Calendar;
