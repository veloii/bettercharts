import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { useCookies } from "react-cookie";

const Updates = () => {
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  const [cookies, setCookie, removeCookie] = useCookies([
    "dismiss_update_banner",
  ]);

  useEffect(() => {
    if (open !== undefined)
      setCookie("dismiss_update_banner", !open, {
        secure: true,
      });
  }, [open]);

  useEffect(() => {
    setOpen(cookies.dismiss_update_banner !== "true");
  }, []);

  return (
    <Transition.Root show={open === undefined ? false : open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
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
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-opacity-75 dark:bg-gray-800" />
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
            enterFrom="opacity-0 trangray-y-4 sm:trangray-y-0 sm:scale-95"
            enterTo="opacity-100 trangray-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 trangray-y-0 sm:scale-100"
            leaveTo="opacity-0 trangray-y-4 sm:trangray-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="text-center ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                  >
                    A new version was released
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hey. It's me Zelr! I'm happy to announce some new updates
                      to better charts.
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <ul className="space-y-2 font-semibold list-disc">
                        <li>
                          iOS Bug Fixes
                          <ul className="text-xs font-normal list-decimal">
                            <li>
                              Fixed gray overlay when clicking on homework
                            </li>
                            <li>
                              Fixed icons appearing way above the homework
                            </li>
                          </ul>
                        </li>
                        <li>Fix Infinite Redrecting Bug</li>
                        <li>
                          Dashboard
                          <ul className="text-xs font-normal list-decimal">
                            <li>Fixed homework not appearing</li>
                            <li>Removed unnessarry buttons</li>
                            <li>Made the text at the top more clean</li>
                          </ul>
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  I don't care, please don't show again
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Updates;
