import React, { useEffect } from "react";
import CalendarWeeklyDays from "../CalendarWeeklyDays";
import Day from "../Day";

function daysInMonthFunction(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

interface Day extends Date {
  active: boolean;
  today?: boolean;
}

const WeekView = (props: {
  yearState: [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>
  ];
  monthState: [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>
  ];
}) => {
  const [days, setDays] = React.useState<Day[]>([]);
  const [month, setMonth] = props.monthState;
  const [year, setYear] = props.yearState;

  const getWeek = () => {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();

    const getMonth = () => {
      if (m === 0) return "January";
      if (m === 1) return "February";
      if (m === 2) return "March";
      if (m === 3) return "April";
      if (m === 4) return "May";
      if (m === 5) return "June";
      if (m === 6) return "July";
      if (m === 7) return "August";
      if (m === 8) return "September";
      if (m === 9) return "October";
      if (m === 10) return "November";
      if (m === 11) return "December";
    };

    setMonth(getMonth());
    setYear(y.toString());
  };

  useEffect(() => {
    getWeek();
  }, []);

  return (
    <div className="bg-white">
      <CalendarWeeklyDays />
    </div>
  );
};

export default WeekView;
