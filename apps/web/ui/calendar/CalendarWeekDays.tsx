const CalendarWeekDays = (props: {
  children: any;
  name: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
}) => {
  return (
    <div>
      <div className="divide-y-2">
        <div className="p-3">{props.name}</div>
        {props.children}
      </div>
    </div>
  );
};

export default CalendarWeekDays;
