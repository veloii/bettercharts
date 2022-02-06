import { ClockIcon } from "@heroicons/react/outline";
import {
  CalendarIcon,
  AcademicCapIcon,
  UsersIcon,
  BookOpenIcon,
} from "@heroicons/react/solid";
import React from "react";
import openHomeworkModal from "../hooks/openHomeworkModal";
import { UserContext } from "../context/ClassChartsContext";
import { HomeworksResponse } from "classcharts-api/dist/types";

const HomeworkItem = (props: {
  type: "late" | "submitted" | "fail" | "completed" | "todo";
  compact?: boolean;
  items: HomeworksResponse;
}) => {
  const context = React.useContext(UserContext);

  return (
    <div
      className={`bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden ${
        props.compact ? "" : "sm:rounded-b-3xl border shadow"
      }`}
    >
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {props.items?.map((position) => (
          <li key={position.id}>
            <a
              href="#"
              onClick={() => openHomeworkModal(context, position, props.type)}
              className={`${props.compact && "px-2"} block hover:bg-gray-50 dark:hover:bg-gray-800 transition`}
            >
              <div className={`${!props.compact && "sm:px-6"} px-4 py-4`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-orange-600 truncate">
                    {position.title}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100">
                      {position.homework_type}
                    </p>
                  </div>
                </div>
                <div
                  className={`${
                    !props.compact && "sm:flex sm:justify-between"
                  } mt-2`}
                >
                  <div className={`${!props.compact && "sm:flex"}`}>
                    <p className="flex items-center text-sm text-gray-500">
                      <UsersIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {position.teacher}
                    </p>
                    <p
                      className={`mt-2 flex items-center text-sm text-gray-500 ${
                        !props.compact && "sm:mt-0 sm:ml-6"
                      }`}
                    >
                      <AcademicCapIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {position.subject}
                    </p>
                    <p
                      className={`mt-2 flex items-center text-sm text-gray-500 ${
                        !props.compact && "sm:mt-0 sm:ml-6"
                      }`}
                    >
                      <BookOpenIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {position.lesson}
                    </p>
                  </div>
                  <div className={`mt-2 flex items-center text-sm text-gray-500 ${!props.compact && "sm:mt-0"} gap-4`}>
                    {position.completion_time_value && (
                      <div className="flex">
                        <ClockIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          {position.completion_time_value +
                            " " +
                            position.completion_time_unit}
                        </p>
                      </div>
                    )}

                    <div className="flex">
                      <CalendarIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        Due on{" "}
                        <time dateTime={position.due_date}>
                          {position.due_date}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeworkItem;
