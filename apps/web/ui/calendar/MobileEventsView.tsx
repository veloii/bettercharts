import { CalendarContext } from "context/CalendarContext";
import { useContext } from "react";

const MobileEventsView = () => {
  const { calendar } = useContext(CalendarContext);

  const getEventTime = (date: Date) => {
    let halfHours = date.getHours();
    const rawMinutes = date.getMinutes();

    if (rawMinutes >= 30) halfHours = halfHours * 2 + 1;
    else halfHours = halfHours * 2;

    return `${date.getHours()}:${halfHours & 1 ? "30" : "00"}`;
  };

  return (
    <div className="m-5">
      <div className="shadow rounded-lg dark:bg-gray-900 bg-white dark:text-white divide-y dark:divide-gray-800">
        {calendar?.selectedDayMobile?.map((event) => (
          <div key={event.name} className="p-3">
            <div className="font-semibold text-md">
              {event.name}

              <span className="dark:text-gray-300 text-base">
                {" • "}
                {getEventTime(new Date(event.date))}
              </span>
            </div>
            {event.notes}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileEventsView;
