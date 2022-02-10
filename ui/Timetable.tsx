import { LessonsResponse } from "classcharts-api/dist/types";
import dayjs from "dayjs";

const Timetable = (props: { timetable: LessonsResponse, noShadow?: boolean, compact?: boolean }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2">
        <div className={`py-2 align-middle inline-block min-w-full`}>
          <div className={`${!props.noShadow && "shadow"} overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg`}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Teacher
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Room
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
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
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-900 dark:text-gray-100">
                      {lesson.subject_name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lesson.lesson_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lesson.teacher_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lesson.room_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
