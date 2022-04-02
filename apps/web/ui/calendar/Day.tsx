import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { CalendarContext } from "context/CalendarContext";
import { useContext } from "react";
import { CalendarDay } from "types/Calendar";
import { Day as DayType } from "./views/MonthView";

const Day = (props: { day: DayType }) => {
  const { calendar, setCalendar } = useContext(CalendarContext);

  const handleEventClick = (event: CalendarDay) => {
    let shallowCopy = { ...calendar };
    shallowCopy.selectedDay = event;
    setCalendar(shallowCopy);
  };

  const handleMobileEventClick = () => {
    let shallowCopy = { ...calendar };
    shallowCopy.selectedDayMobile = props.day.events;
    setCalendar(shallowCopy);
  };

  return (
    <div
      className={`p-3 text-right md:text-left md:h-36 ${
        props.day.active
          ? "bg-white dark:bg-gray-900"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      <div className="flex justify-end md:block">
        <div
          onClick={handleMobileEventClick}
          className={`hover:bg-gray-800 dark:hover:bg-gray-100 hover:text-white dark:hover:text-black  md:hover:bg-inherit md:hover:text-current md:pointer-events-none p-2 rounded-full w-8 h-8 flex justify-center items-center ${
            props.day.today
              ? "md:text-white md:dark:text-black md:bg-emerald-500 text-emerald-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {props.day.getDate()}
        </div>
      </div>
      <div className="md:hidden relative flex justify-end">
        <div className="absolute flex gap-2">
          {props.day.events?.map((event) => (
            <div
              key={event.name}
              className={`w-2 h-2 rounded-full ${event.bgColor} border border-gray-400 dark:border-none`}
            ></div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-4 no-cursor">
        {props.day.events?.map((event) => (
          <div
            onClick={() => {
              handleEventClick(event);
            }}
            key={event.name}
            className={`md:flex  hidden dark:bg-opacity-40 justify-between items-center ${event.bgColor} px-2 py-1 rounded no-cursor`}
          >
            <div className={event.textColor + " no-cursor"}>{event.name}</div>
            <div>
              {event.completed ? (
                <CheckIcon className={`w-5 ${event.textColor}`} />
              ) : (
                <XIcon className={`w-5 ${event.textColor}`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
