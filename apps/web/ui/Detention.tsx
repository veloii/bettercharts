import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import {
  ArrowCircleUpIcon,
  CheckCircleIcon,
  ClockIcon as ClockSolidIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/solid";

const convertStageToIcon: (stage: string) => JSX.Element = (stage: string) => {
  if (stage === "Yes")
    return (
      <CheckCircleIcon
        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
        aria-hidden="true"
      />
    );
  else if (stage === "Pending")
    return (
      <ClockSolidIcon
        className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400"
        aria-hidden="true"
      />
    );
  else if (stage === "No")
    return (
      <XIcon
        className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
        aria-hidden="true"
      />
    );
  else if (stage === "Upscaled")
    return (
      <ArrowCircleUpIcon
        className="flex-shrink-0 mr-1.5 h-5 w-5 text-black dark:text-white"
        aria-hidden="true"
      />
    );
  else
    return (
      <QuestionMarkCircleIcon
        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    );
};

export default function Detention(props: {
  title?: string;
  compact?: boolean;
  detentions: {
    id: number;
    date: string;
    dateFull: string;
    stage: string;
    title: string;
    location: string;
    duration: string;
    lesson: string;
    subject: string;
    teacher: string;
  }[];
}) {
  return (
    <>
      {props.detentions.length !== 0 && props.title && (
        <h2 className="py-2 text-2xl font-bold text-gray-900 dark:text-white">
          {props.title}
        </h2>
      )}
      <div
        className={`bg-white dark:bg-gray-900 ${
          !props.compact && "shadow"
        } overflow-hidden sm:rounded-md`}
      >
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {props.detentions.map((detention) => (
            <li key={detention.id}>
              <a className="block hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="px-4 py-4 sm:px-6">
                  <div>
                    <div
                      className={`${
                        !props.compact && "lg:flex"
                      } justify-between`}
                    >
                      <div>
                        <p className="text-sm font-medium text-emerald-600 truncate">
                          {detention.title}
                        </p>
                        <p className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
                          {detention.lesson && (
                            <div className="flex gap-0.5">
                              <BookOpenIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="mr-5 truncate">
                                {detention.lesson}
                              </span>
                            </div>
                          )}

                          {detention.subject && (
                            <div className="flex gap-0.5">
                              <AcademicCapIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="mr-5 truncate">
                                {detention.subject}
                              </span>
                            </div>
                          )}

                          {detention.teacher && (
                            <div className="flex gap-0.5">
                              <UsersIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="mr-5 truncate">
                                {detention.teacher}
                              </span>
                            </div>
                          )}

                          {detention.duration && (
                            <div className="flex gap-0.5">
                              <ClockIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="mr-5 truncate">
                                {detention.duration}
                              </span>
                            </div>
                          )}

                          {detention.location && (
                            <div className="flex gap-0.5">
                              <LocationMarkerIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="mr-5 truncate">
                                {detention.location}
                              </span>
                            </div>
                          )}
                        </p>
                      </div>
                      <div>
                        <div
                          className={`${
                            !props.compact && "lg:mt-0 lg:block"
                          } flex gap-2 mt-2 items-center`}
                        >
                          <p className="text-sm text-gray-900 dark:text-gray-400">
                            Detention for{" "}
                            <span className="font-semibold">
                              <time dateTime={detention.date}>
                                {detention.dateFull}
                              </time>
                            </span>
                          </p>
                          <p
                            className={`${
                              !props.compact && "lg:mt-2 lg:justify-end"
                            } flex items-center text-sm text-gray-500`}
                          >
                            {convertStageToIcon(detention.stage)}
                            {detention.stage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}