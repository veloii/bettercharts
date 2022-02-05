import { CheckIcon, XIcon } from "@heroicons/react/solid";
import classNames from "lib/classNames";
import { Activity_point } from "types/ClassCharts";

function parseTwitterDate(tdate: string) {
  const systemDate = new Date(Date.parse(tdate));
  const userDate = new Date();
  const diff = Math.floor((userDate.getTime() - systemDate.getTime()) / 1000);
  if (diff <= 1) {
    return "just now";
  }
  if (diff < 20) {
    return diff + " seconds ago";
  }
  if (diff < 40) {
    return "half a minute ago";
  }
  if (diff < 60) {
    return "less than a minute ago";
  }
  if (diff <= 90) {
    return "one minute ago";
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + " minutes ago";
  }
  if (diff <= 5400) {
    return "1 hour ago";
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + " hours ago";
  }
  if (diff <= 129600) {
    return "1 day ago";
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + " days ago";
  }
  if (diff <= 777600) {
    return "1 week ago";
  }
  return (
    "on " +
    systemDate.toLocaleDateString() +
    " " +
    systemDate.toLocaleTimeString()
  );
}

const actContent = (item: Activity_point) => {
  let result: string = "awarded";

  if (item.teacher_name) {
    result += " by " + item.teacher_name;
  }
  if (item.lesson_name) {
    result += " in " + item.lesson_name;
  }

  return result;
};

const Timeline = (props: { activity: Activity_point[] }) => {
  const { activity } = props;

  const timeline = activity.map((item) => ({
    id: item.id,
    target: item.reason,
    content: actContent(item),
    datetime: item.timestamp,
    date: parseTwitterDate(item.timestamp.replaceAll(" ", "T") + "Z"),
    icon: item.polarity === "negative" ? XIcon : CheckIcon,
    iconBackground:
      item.polarity === "negative" ? "bg-red-400" : "bg-green-400",
  }));
  return (
    <div>
      <div className="flow-root">
        <ul className="-mb-8">
          {timeline.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        event.iconBackground,
                        "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900"
                      )}
                    >
                      <event.icon
                        className="h-5 w-5 text-white dark:text-black"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {event.target}{" "}
                        <a
                          className="font-medium text-gray-900 dark:text-gray-100"
                        >
                          {event.content}
                        </a>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={event.datetime}>{event.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
