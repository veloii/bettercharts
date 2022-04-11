import { CalendarContext } from "context/CalendarContext";
import { useContext, useEffect, useRef } from "react";
import { CalendarDay } from "types/Calendar";
import WeekDayContent from "./WeekDayContent";
import WeeklyDay from "./WeeklyDay";

const getDaysArray = function (s: Date, e: Date) {
  for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

export interface Day extends Date {
  events?: CalendarDay[] | undefined;
}

const CalendarWeeklyDays = () => {
  const curr = new Date();
  const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
  let days: Day[] = getDaysArray(firstDay, lastDay);
  const { calendar } = useContext(CalendarContext);

  calendar?.days.forEach((day) => {
    const dayDate = new Date(day.date);
    const dateString =
      dayDate.getDate() +
      "-" +
      dayDate.getMonth() +
      "-" +
      dayDate.getFullYear();
    const dayIndex = days.findIndex(
      (day) =>
        day.getDate() + "-" + day.getMonth() + "-" + day.getFullYear() ===
        dateString
    );

    if (dayIndex > 0) {
      if (!days[dayIndex].events) days[dayIndex].events = [];
      days[dayIndex].events!.push(day);
    }
  });

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const executeScroll = (index: number) =>
    (refs[index] as any).current.scrollIntoView();

  useEffect(() => {
    const date = new Date();

    executeScroll(date.getHours());
  }, []);

  const convertDateToDay = (day: Date) => {
    if (day.getDay() === 0) return "Sun";
    if (day.getDay() === 1) return "Mon";
    if (day.getDay() === 2) return "Tue";
    if (day.getDay() === 3) return "Wed";
    if (day.getDay() === 4) return "Thu";
    if (day.getDay() === 5) return "Fri";
    if (day.getDay() === 6) return "Sat";
    return "Unknown";
  };

  return (
    <div>
      <div className="shadow hide-scrollbar">
        <div className="flex divide-x dark:divide-gray-700">
          <div className="w-[450px]"></div>
          <WeeklyDay day={convertDateToDay(days[0])} date={days[0].getDate()} />
          <WeeklyDay day={convertDateToDay(days[1])} date={days[1].getDate()} />
          <WeeklyDay day={convertDateToDay(days[2])} date={days[2].getDate()} />
          <WeeklyDay day={convertDateToDay(days[3])} date={days[3].getDate()} />
          <WeeklyDay day={convertDateToDay(days[4])} date={days[4].getDate()} />
          <WeeklyDay day={convertDateToDay(days[5])} date={days[5].getDate()} />
          <WeeklyDay day={convertDateToDay(days[6])} date={days[6].getDate()} />
          <div className="w-64"></div>
        </div>
      </div>
      <div className="calendar-height">
        <div className="flex divide-x dark:divide-gray-700">
          <div className="w-[450px] dark:text-white text-right mt-[25px] text-sm">
            <div className="pr-2">
              <div ref={refs[0]} className="h-32">
                00:00
              </div>
              <div ref={refs[1]} className="h-32">
                01:00
              </div>
              <div ref={refs[2]} className="h-32">
                02:00
              </div>
              <div ref={refs[3]} className="h-32">
                03:00
              </div>
              <div ref={refs[4]} className="h-32">
                04:00
              </div>
              <div ref={refs[5]} className="h-32">
                05:00
              </div>
              <div ref={refs[6]} className="h-32">
                06:00
              </div>
              <div ref={refs[7]} className="h-32">
                07:00
              </div>
              <div ref={refs[8]} className="h-32">
                08:00
              </div>
              <div ref={refs[9]} className="h-32">
                09:00
              </div>
              <div ref={refs[10]} className="h-32">
                10:00
              </div>
              <div ref={refs[11]} className="h-32">
                11:00
              </div>
              <div ref={refs[12]} className="h-32">
                12:00
              </div>
              <div ref={refs[13]} className="h-32">
                13:00
              </div>
              <div ref={refs[14]} className="h-32">
                14:00
              </div>
              <div ref={refs[15]} className="h-32">
                15:00
              </div>
              <div ref={refs[16]} className="h-32">
                16:00
              </div>
              <div ref={refs[17]} className="h-32">
                17:00
              </div>
              <div ref={refs[18]} className="h-32">
                18:00
              </div>
              <div ref={refs[19]} className="h-32">
                19:00
              </div>
              <div ref={refs[20]} className="h-32">
                20:00
              </div>
              <div ref={refs[21]} className="h-32">
                21:00
              </div>
              <div ref={refs[22]} className="h-32">
                22:00
              </div>
              <div ref={refs[23]} className="">
                23:00
              </div>
            </div>
          </div>
          <WeekDayContent events={days[0].events} />
          <WeekDayContent events={days[1].events} />
          <WeekDayContent events={days[2].events} />
          <WeekDayContent events={days[3].events} />
          <WeekDayContent events={days[4].events} />
          <WeekDayContent events={days[5].events} />
          <WeekDayContent events={days[6].events} />
          <div className="w-64"></div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWeeklyDays;
