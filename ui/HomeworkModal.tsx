import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BookOpenIcon,
  ExclamationCircleIcon,
  CheckIcon,
  XIcon,
  BadgeCheckIcon,
  AcademicCapIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import SwitchWithRightLabel from "./Switch";
import { UserContextType } from "../context/ClassChartsContext";
import React from "react";
import { Homework } from "classcharts-api/dist/types";
import { DownloadIcon, UploadIcon } from "@heroicons/react/outline";
import Button from "./Button";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("multiple", "multiple");
  return fileSelector;
}

export default function HomeworkModal(props: {
  status: "fail" | "late" | "completed" | "submitted" | "todo";
  homework: Homework;
  open: boolean;
  userContext: UserContextType;
}) {
  const { user, setUser } = props.userContext;
  const [homeworkStatus, setHomeworkStatus] = useState<JSX.Element>();
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  const fail = (
    <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full dark:bg-red-800">
      <XIcon
        className="w-6 h-6 text-red-600 dark:text-red-200"
        aria-hidden="true"
      />
    </div>
  );

  const late = (
    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full dark:bg-yellow-800">
      <ExclamationCircleIcon
        className="w-6 h-6 text-yellow-600 dark:text-yellow-200"
        aria-hidden="true"
      />
    </div>
  );

  const completed = (
    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full dark:bg-green-800">
      <CheckIcon
        className="w-6 h-6 text-green-600 dark:text-green-200"
        aria-hidden="true"
      />
    </div>
  );

  const submitted = (
    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full dark:bg-green-800">
      <BadgeCheckIcon
        className="w-6 h-6 text-green-600 dark:text-green-200"
        aria-hidden="true"
      />
    </div>
  );

  const todo = (
    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-800">
      <BookOpenIcon
        className="w-6 h-6 text-gray-600 dark:text-gray-200"
        aria-hidden="true"
      />
    </div>
  );

  useEffect(() => {
    // allow animation
    sleep(1).then(() => {
      if (open === undefined) {
        setOpen(true);
      }
    });

    if (props.status === "fail") setHomeworkStatus(fail);
    if (props.status === "completed") setHomeworkStatus(completed);
    if (props.status === "submitted") setHomeworkStatus(submitted);
    if (props.status === "late") setHomeworkStatus(late);
    if (props.status === "todo") setHomeworkStatus(todo);
  }, []);

  const markComplete = (value: boolean) => {
    if (user === undefined) {
      throw new Error(
        "React User Context is undefined, either we haven't authenticated or there is a huge bug"
      );
    }
    let shallowCopy = { ...user! };
    let item = {
      ...user!.homework.find((x) => x.id === props.homework.id)!,
    };
    item.status.ticked = value ? "yes" : "no";
    const index = user!.homework.findIndex((x) => x.id === props.homework.id)!;
    shallowCopy.homework[index] = item!;
    setUser(shallowCopy);

    // see what status it is now
    if (item.status.state === null && item.status.ticked === "no")
      setHomeworkStatus(todo);
    if (item.status.state === null && item.status.ticked === "yes")
      setHomeworkStatus(completed);
    if (item.status.state === "completed") setHomeworkStatus(submitted);
  };

  return (
    <Transition.Root show={open === undefined ? false : open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="absolute inset-0 overflow-y-auto"
        open={open === undefined ? false : true}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-middle transition-all transform bg-white border rounded-lg dark:text-white dark:bg-gray-900 dark:border-gray-800 sm:my-8 max-w-7xl sm:p-6">
              <div>
                {homeworkStatus}
                <div className="mt-3 text-left sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {props.homework.title}
                  </Dialog.Title>
                  <div className="flex flex-wrap gap-4 mt-2 mb-4">
                    <div className="flex justify-center">
                      <div className="flex items-center justify-center">
                        <BookOpenIcon className="w-4 flex-shrink-0 mr-1.5 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-400">
                        {props.homework.lesson}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex items-center justify-center">
                        <UsersIcon className="w-4 flex-shrink-0 mr-1.5 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-400">
                        {props.homework.teacher}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex items-center justify-center">
                        <AcademicCapIcon className="w-4 flex-shrink-0 mr-1.5 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-400">
                        {props.homework.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <p className="text-sm font-medium text-gray-400">
                      <span className="font-semibold">Due Date:</span>{" "}
                      {props.homework.due_date}
                    </p>
                  </div>
                  <div className="flex ">
                    <p className="text-sm font-medium text-gray-400">
                      <span className="font-semibold">Issue Date:</span>{" "}
                      {props.homework.issue_date}
                    </p>
                  </div>
                  {props.homework.completion_time_value && (
                    <div className="flex ">
                      <p className="text-sm font-medium text-gray-400">
                        <span className="font-semibold">
                          Estimated completion time:
                        </span>{" "}
                        {props.homework.completion_time_value +
                          " " +
                          props.homework.completion_time_unit}
                      </p>
                    </div>
                  )}
                  <div className="py-5">
                    <SwitchWithRightLabel
                      disabled={props.status === "submitted"}
                      defaultCheck={
                        props.status === "submitted"
                          ? true
                          : props.homework.status.ticked === "yes"
                      }
                      text={
                        props.status === "submitted"
                          ? "Teacher marked as complete"
                          : "Completed Task?"
                      }
                      onChange={(value: boolean) => {
                        fetch(
                          "/api/tickHomework?homeworkId=" +
                            props.homework.status.id,
                          { method: "POST" }
                        );

                        markComplete(value);
                      }}
                    />
                  </div>
                  {props.homework.description.length > 1 && (
                    <div
                      className="max-w-2xl filter dark:invert dark:bg-[#eee7d8] dark:text-black rounded-xl"
                      dangerouslySetInnerHTML={{
                        __html: props.homework.description_raw,
                      }}
                    ></div>
                  )}
                  {/* this doesnt even work as if theres no valid attachments but you are allowed to attach it will not show anything */}{" "}
                  {props.homework.validated_attachments.length != 0 && (
                    <div>
                      <h1 className="pt-5 pb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Attachments
                      </h1>
                      <div className="flex gap-2">
                        {props.homework.validated_attachments.map(
                          (attachment) => (
                            <a
                              key={attachment.id}
                              target="_blank"
                              href={attachment.validated_file}
                            >
                              <button className="flex items-center justify-center gap-2 p-2 px-4 font-medium text-gray-800 transition bg-gray-400 rounded-lg dark:text-gray-100 bg-opacity-30 hover:bg-opacity-60">
                                <DownloadIcon className="w-6" />
                                {attachment.file_name}
                              </button>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  <div className="pt-5">
                    {/* {props.homework.status.allow_attachments && (
                      <Button
                        onClick={() => {
                          const fileSelector = buildFileSelector();
                          fileSelector.click();
                          fileSelector.onchange = (ev: any) => {
                            const file = ev.target.files[0];
                            const formData = new FormData();

                            formData.append("attachment", file);


                            fetch("/api/"+props.homework.status.id+"/uploadHomeworkAttachment", {
                              method: "POST",
                              body: formData,
                            })
                              .then((res) => res.json())
                          };
                        }}
                        size="2"
                      >
                        <UploadIcon className="w-6 mr-2" />
                        Upload Attachments
                      </Button>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white transition bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Back
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
