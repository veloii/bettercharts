import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { CalendarContext } from "context/CalendarContext";
import { useContext, useEffect, useState } from "react";
import { CalendarDay } from "types/Calendar";

interface Event extends CalendarDay {
  top: number;
  height: number;
  jsDate: Date;
}

const WeekDayContent = (props: { events: CalendarDay[] | undefined }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { calendar, setCalendar } = useContext(CalendarContext);

  const addEvent = (event: CalendarDay) => {
    const date = new Date(event.date);
    // hours is in 30 minutes
    let halfHours = date.getHours();
    const rawMinutes = date.getMinutes();

    if (rawMinutes >= 30) halfHours = halfHours * 2 + 1;
    else halfHours = halfHours * 2;

    const shallowEvents = [...events];

    // 35px for top
    const startingPX = 35;

    // difference for top
    const everyHalfHour = 64;

    // every half hour add px on height
    const halfHourDurationPX = 64;

    const top = startingPX + everyHalfHour * halfHours;
    const height = halfHourDurationPX * event.duration - 16;

    shallowEvents.push({
      ...event,
      height,
      top,
      jsDate: date,
    });

    setEvents(shallowEvents);
  };

  useEffect(() => {
    props.events?.forEach((day) => {
      addEvent(day);
    });
  }, []);

  const handleEventClick = (event: CalendarDay) => {
    let shallowCopy = { ...calendar };
    shallowCopy.selectedDay = event;
    setCalendar(shallowCopy);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {events.map((event) => (
          <div key={event.name}>
            <div
              style={{
                top: event.top,
              }}
              className="absolute w-full z-10"
            >
              <div className="px-2">
                <div
                  style={{ height: event.height }}
                  onClick={() => handleEventClick(event)}
                  className={`${event.bgColor}  dark:bg-opacity-70 rounded-lg w-full my-2`}
                >
                  <div className="px-2 pt-0.5 space-y-1">
                    <div className={`${event.textColor} text-sm`}>
                      {event.jsDate.getHours()}:
                      {event.duration & 1 ? "30" : "00"}
                    </div>
                    <div className="flex justify-between">
                      <div
                        className={`${event.textColor} text-sm font-semibold`}
                      >
                        {event.name}
                      </div>
                      <div>
                        {event.completed ? (
                          <CheckIcon className={`w-5 ${event.textColor}`} />
                        ) : (
                          <XIcon className={`w-5 ${event.textColor}`} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="isolate divide-y dark:divide-gray-700 -mt-[30px] z-[-1] pointer-events-none">
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className="h-16"></div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default WeekDayContent;
