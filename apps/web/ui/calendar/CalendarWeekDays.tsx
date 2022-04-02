const CalendarWeekDays = (props: {
  children: any;
  name: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
}) => {
  return (
    <div>
      <div className="divide-y-2 dark:divide-gray-700">
        <div className="p-3 md:hidden block">{props.name.substring(1, 0)}</div>
        <div className="p-3 md:block hidden">{props.name}</div>
        {props.children}
      </div>
    </div>
  );
};

export default CalendarWeekDays;
