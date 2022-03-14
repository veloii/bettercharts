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
      className={`p-3 text-left h-36 space-y-4 ${
        props.active ? "bg-white" : "bg-gray-100"
      }`}
    >
      <span
        className={`font-regular w-4 h-4 absolute flex justify-center items-center rounded-full p-4 text-center ${
          props.today ? "text-white bg-emerald-500" : "text-gray-600"
        }`}
      >
        {props.date}
      </span>

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
