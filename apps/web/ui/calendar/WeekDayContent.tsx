import { useEffect, useState } from "react";

const WeekDayContent = () => {
  const [events, setEvents] = useState<
    {
      textColor: string;
      bgColor: string;
      name: string;
      date: Date;
      halfHours: number;
      top: number;
      height: number;
    }[]
  >([]);

  const addEvent = (event: {
    textColor: string;
    bgColor: string;
    name: string;
    date: Date;
    halfHoursDuration: number;
  }) => {
    // hours is in 30 minutes
    let halfHours = event.date.getHours();
    const rawMinutes = event.date.getMinutes();

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
    const height = halfHourDurationPX * event.halfHoursDuration - 16;

    shallowEvents.push({
      ...event,
      halfHours,
      height,
      top,
    });

    setEvents(shallowEvents);
  };

  useEffect(() => {
    addEvent({
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      name: "Spanish",
      date: new Date(
        "Sat Mar 12 2022 17:10:37 GMT+0000 (Coordinated Universal Time)"
      ),
      halfHoursDuration: 4,
    });
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        {events.map((event) => (
          <div key={event.name}>
            <div
              style={{
                top: event.top,
              }}
              className="absolute z-50 w-full"
            >
              <div className="px-2">
                <div
                  style={{ height: event.height }}
                  className={`${event.bgColor} rounded-lg w-full my-2`}
                >
                  <div className="px-2 pt-0.5 space-y-1">
                    <div className={`${event.textColor} text-sm`}>
                      {event.date.getHours()}:
                      {event.halfHours & 1 ? "30" : "00"}
                    </div>
                    <div className={`${event.textColor} text-sm font-semibold`}>
                      {event.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="isolate divide-y -mt-[30px]">
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
