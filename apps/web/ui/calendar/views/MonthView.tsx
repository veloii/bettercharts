import React, { useEffect } from "react";
import CalendarWeekDays from "../CalendarWeekDays";
import Day from "../Day";

function daysInMonthFunction(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

interface Day extends Date {
  active: boolean;
  today?: boolean;
}

const MonthView = (props: {
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

  const getMonth = () => {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();

    const daysInMonth = daysInMonthFunction(y, m);

    // Check for if jan then go to december
    const daysInLastMonth = daysInMonthFunction(y, m - 1);

    // Check for if december then go to jan
    const daysInNextMonth = daysInMonthFunction(y, m + 1);

    let localDays: Day[] = [];

    for (let i = 1; i < daysInMonth + 1; i++) {
      const jsDay = new Date(y, m, i);
      const day: Day = jsDay as any;

      if (day.getDate() === date.getDate()) {
        day.today = true;
      }

      day.active = true;

      localDays.push(day);
    }

    const firstDay = localDays[0].getDay(),
      lastDay = localDays[localDays.length - 1].getDay();

    if (firstDay !== 1) {
      for (let i = daysInLastMonth; i !== 0; i--) {
        // add check for dec / jan
        let jsDay = new Date(y, m - 1, i);
        const day: Day = jsDay as any;

        day.active = false;

        localDays.unshift(day);

        if (day.getDay() === 1) break;
      }
    }

    if (lastDay !== 0) {
      for (let i = 1; i !== daysInNextMonth; i++) {
        // add check for dec / jan
        let jsDay = new Date(y, m + 1, i);
        const day: Day = jsDay as any;

        day.active = false;

        localDays.push(day);

        if (day.getDay() === 0) break;
      }
    }

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
    setDays(localDays);
  };

  useEffect(() => {
    getMonth();
  }, []);

  return (
    <div className="flex">
      <div className="grid grid-cols-7 w-full bg-white divide-x-2 text-center font-semibold text-sm border-y-2">
        <CalendarWeekDays name="Mon">
          {days
            .filter((day) => day.getDay() === 1)
            .map((day) => (
              <Day
                today={day.today}
                active={day.active}
                date={day.getDate().toString()}
              />
            ))}
        </CalendarWeekDays>
        <CalendarWeekDays name="Tue">
          {days
            .filter((day) => day.getDay() === 2)
            .map((day) => (
              <Day
                today={day.today}
                active={day.active}
                date={day.getDate().toString()}
              />
            ))}
        </CalendarWeekDays>
        <CalendarWeekDays name="Wed">
          {days
            .filter((day) => day.getDay() === 3)
            .map((day) => (
              <Day
                today={day.today}
                active={day.active}
                date={day.getDate().toString()}
              />
            ))}
        </CalendarWeekDays>
        <CalendarWeekDays name="Thu">
          {days
            .filter((day) => day.getDay() === 4)
            .map((day) => (
              <Day
                today={day.today}
                active={day.active}
                date={day.getDate().toString()}
              />
            ))}
        </CalendarWeekDays>
        <CalendarWeekDays name="Fri">
          {days
            .filter((day) => day.getDay() === 5)
            .map((day) => (
              <Day
                today={day.today}
                active={day.active}
                date={day.getDate().toString()}
              />
            ))}
        </CalendarWeekDays>
        <CalendarWeekDays name="Sat">
          {days
            .filter((day) => day.getDay() === 6)
            .map((day) => (
              <Day
                today={day.today}
                active={day.active}
                date={day.getDate().toString()}
              />
            ))}
        </CalendarWeekDays>
        <CalendarWeekDays name="Sun">
          {days
            .filter((day) => day.getDay() === 0)
            .map((day) => (
              <Day
                today={day.today}
                active={day.active}
                date={day.getDate().toString()}
              />
            ))}
        </CalendarWeekDays>
      </div>
    </div>
  );
};

export default MonthView;
