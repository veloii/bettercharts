import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import HomeworkItem from "./HomeworkItem";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { HomeworksResponse } from "classcharts-api/dist/types";
import ReactSmoothCollapse from "react-smooth-collapse";

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
          } transition-all duration-75`}
        >
          <h3 className="py-5 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            {props.name}
            <span className="px-2 py-1 ml-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
              {props.homework.length}
            </span>
          </h3>
          <button className="h-full p-2 my-auto transition bg-gray-100 cursor-pointer focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-purple-500 focus:outline-none rounded-xl dark:bg-gray-800">
            <ChevronDownIcon
              className={`text-gray-500 w-6 transition duration-500  ${
                open && "rotate-180"
              }`}
            />
          </button>
        </div>
      )}

      <ReactSmoothCollapse expanded={open}>
        <HomeworkItem
          compact={props.compact}
          type={props.type}
          items={props.homework}
        />
      </ReactSmoothCollapse>
    </div>
  );
};

export default HomeworkCategory;
