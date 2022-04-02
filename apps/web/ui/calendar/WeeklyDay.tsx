const WeeklyDay = (props: { date: string | number; day: string }) => {
  return (
    <div className="text-center w-full h-14 flex justify-center items-center font-semibold dark:text-white">
      <div className="flex justify-center items-center gap-2">
        <span className={`font-normal text-gray-600 dark:text-gray-300`}>
          {props.day}
        </span>
        <div
          className={`${
            props.date === new Date().getDate() && "bg-emerald-600"
          } p-1 rounded-full w-8`}
        >
          {props.date}
        </div>
      </div>
    </div>
  );
};

export default WeeklyDay;
