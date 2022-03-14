const WeeklyDay = (props: { date: string; day: string }) => {
  return (
    <div className="text-center w-full h-14 flex justify-center items-center font-semibold dark:text-white">
      <div>
        <span className="font-normal text-gray-600 dark:text-gray-300">{props.day}</span>{" "}
        {props.date}
      </div>
    </div>
  );
};

export default WeeklyDay;
