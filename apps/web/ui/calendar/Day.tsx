import { CheckIcon, XIcon } from "@heroicons/react/solid";

const Day = (props: {
  date: string;
  events?: {
    name: string;
    completed: boolean;
  }[];
  active: boolean;
  today?: boolean;
}) => {
  return (
    <div
      className={`p-3 text-right md:text-left md:h-36 space-y-4 ${
        props.active ? "bg-white dark:bg-gray-900" : "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      <div className="flex justify-end md:block">
        <div
          className={`hover:bg-gray-800 dark:hover:bg-gray-100 hover:text-white dark:hover:text-black cursor-pointer md:cursor-auto md:hover:bg-inherit md:hover:text-current md:pointer-events-none p-2 rounded-full w-8 h-8 flex justify-center items-center ${
            props.today
              ? "md:text-white md:dark:text-black md:bg-emerald-500 text-emerald-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {props.date}
        </div>
      </div>

      <div className="space-y-2">
        {props.events?.map((event) => (
          <div key={event.name} className="flex justify-between items-center">
            <div>{event.name}</div>
            <div>
              {event.completed ? (
                <CheckIcon className="w-5 text-green-600" />
              ) : (
                <XIcon className="w-5 text-red-600" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
