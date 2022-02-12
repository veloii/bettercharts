import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import HomeworkItem from "./HomeworkItem";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { HomeworksResponse } from "classcharts-api/dist/types";

const HomeworkCategory = (props: {
  name?: string;
  compact?: boolean;
  type: "late" | "submitted" | "fail" | "completed" | "todo";
  homework: HomeworksResponse;
}) => {
  const isOpenByDefault = () => {
    if (props.type === "todo") return true;
    else if (props.compact) return true;
    else return false;
  };

  const [open, setOpen] = useState(isOpenByDefault());

  return (
    <div>
      {!props.compact && (
        <div
          onClick={() => setOpen(!open)}
          className={`flex justify-between bg-white dark:bg-gray-900 px-4 shadow border-gray-200 sm:px-6 ${
            open ? "sm:rounded-t-3xl" : "sm:rounded-3xl"
          } transition-all`}
        >
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 py-5">
            {props.name}
            <span className="ml-2 bg-gray-100 dark:bg-gray-800 text-sm px-2 py-1 rounded-lg font-semibold text-gray-600 dark:text-gray-400">
              {props.homework.length}
            </span>
          </h3>
          <button className="transition focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-purple-500 focus:outline-none rounded-xl cursor-pointer h-full my-auto bg-gray-100 dark:bg-gray-800 p-2">
            <ChevronDownIcon
              className={`text-gray-500 w-6 transition duration-500  ${
                open && "rotate-180"
              }`}
            />
          </button>
        </div>
      )}

      <Transition
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={open}
      >
        <HomeworkItem
          compact={props.compact}
          type={props.type}
          items={props.homework}
        />
      </Transition>
    </div>
  );
};

export default HomeworkCategory;
