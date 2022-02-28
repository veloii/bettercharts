import { Announcement } from "classcharts-api/dist/types";
import { DownloadIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";

const Announcement = (props: {
  announcement: Announcement;
  noShadow?: boolean;
}) => {
  return (
    <div>
      <div
        className={`bg-white dark:bg-gray-900 px-4 py-5 sm:px-6 rounded-2xl ${
          !props.noShadow && "shadow"
        }`}
      >
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-xl"
              src={props.announcement.school_logo!}
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              <a href="#" className="hover:underline">
                {props.announcement.teacher_name}
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              <a href="#" className="hover:underline">
                {dayjs(props.announcement.timestamp).toString()}
              </a>
            </p>
          </div>
        </div>
        <div className="dark:text-gray-50 filter dark:invert">
          <div className="pt-5">
            {props?.announcement.description!.length > 1 && (
              <div
                className="dark:bg-[#eee7d8] dark:text-black"
                dangerouslySetInnerHTML={{
                  __html: props.announcement.description!,
                }}
              ></div>
            )}
          </div>
        </div>
        {/* this doesnt even work as if theres no valid attachments but you are allowed to attach it will not show anything */}
        {props.announcement.attachments.length != 0 && (
          <div>
            <h1 className="pt-5 pb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Attachments
            </h1>
            <div className="flex gap-2">
              {props.announcement.attachments.map((attachment) => (
                <a
                  key={attachment.url}
                  target="_blank"
                  className="z-20"
                  href={attachment.url}
                >
                  <button className="flex items-center justify-center gap-2 p-2 px-4 font-medium text-gray-800 transition bg-gray-400 rounded-lg dark:text-gray-100 bg-opacity-30 hover:bg-opacity-60">
                    <DownloadIcon className="w-6" />
                    {attachment.filename}
                  </button>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
