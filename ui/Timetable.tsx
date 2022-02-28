import { LessonsResponse } from "classcharts-api/dist/types";
import dayjs from "dayjs";

const Timetable = (props: {
  timetable: LessonsResponse;
  noShadow?: boolean;
  compact?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2">
        <div className={`py-2 align-middle inline-block min-w-full`}>
          <div
            className={`${
              !props.noShadow && "shadow"
            } overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg`}
          >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Teacher
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Room
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.timetable.map((lesson, lessonIdx) => (
                  <tr
                    key={lesson.end_time}
                    className={
                      lessonIdx % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-800"
                    }
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-100">
                      {lesson.subject_name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {lesson.lesson_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {lesson.teacher_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {lesson.room_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {new Date(lesson.start_time)
                        .toLocaleTimeString()
                        .slice(0, 5)}{" "}
                      -{" "}
                      {new Date(lesson.end_time)
                        .toLocaleTimeString()
                        .slice(0, 5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
