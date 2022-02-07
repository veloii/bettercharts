import classNames from "../lib/classNames";
import { Fragment, useContext } from "react";
import {
  Disclosure,
  Menu,
  Transition as HeadlessUITransition,
} from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../context/ClassChartsContext";
import Transition from "./transition/index";
import TextTransition from "react-text-transition";

const userNavigation = [{ name: "Sign out", href: "#" }];

export default function Header(props: { children: any }) {
  const navigation = [
    { name: "Overview", href: "/dashboard" },
    { name: "Behaviour", href: "/behaviour" },
    { name: "Homework", href: "/homework" },
    { name: "Detentions", href: "/detentions" },
    { name: "Announcements", href: "/announcements" },
    { name: "Timetable", href: "/timetable" },
  ];

  const router = useRouter();
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Disclosure as="nav" className="bg-white dark:bg-gray-900 shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/CC_icon.png"
                      alt="Class Charts"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/CC_logo_no_tes.png"
                      alt="Class Charts"
                    />
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            router.asPath
                              .toLowerCase()
                              .includes(item.href.toLowerCase())
                              ? "border-orange-500 text-gray-900 dark:text-gray-200 font-semibold "
                              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-250"
                          )}
                          aria-current={
                            router.asPath
                              .toLowerCase()
                              .includes(item.href.toLowerCase())
                              ? "page"
                              : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button className="bg-white dark:bg-gray-900 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-orange-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-white dark:bg-gray-900 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-orange-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user?.student?.avatar_url}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <HeadlessUITransition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link href={item.href}>
                                    <a
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 dark:bg-gray-800"
                                          : "",
                                        "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </HeadlessUITransition>
                      </>
                    )}
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-orange-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        router.asPath
                          .toLowerCase()
                          .includes(item.href.toLowerCase())
                          ? "bg-orange-50 dark:bg-orange-900 border-orange-500 dark:border-orange-700 text-orange-700 dark:text-orange-200 font-semibold "
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-800 dark:hover:text-gray-300",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-250"
                      )}
                      aria-current={
                        router.asPath
                          .toLowerCase()
                          .includes(item.href.toLowerCase())
                          ? "page"
                          : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.student?.avatar_url}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-100">
                      {user?.student?.first_name}
                    </div>
                  </div>
                  <button className="ml-auto bg-white dark:bg-gray-900 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-orange-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div>
        <header
          className={`bg-white dark:bg-gray-900 ${
            router.asPath.includes("dashboard") ? "py-0 h-0" : "py-10 border-b"
          } filter drop-shadow dark:border-b-gray-700 mt-0.5 transition-all ease-in-out duration-500`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className={`text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 ease-in-out duration-500`}
            >
              <TextTransition
                text={
                  (
                    navigation.find((nav) => {
                      if (nav.name === "Overview") return "";
                      else return router.asPath.includes(nav.href);
                    }) || { name: "" }
                  ).name
                }
              />
            </h1>
          </div>
        </header>
        <main className="bg-gray-100 dark:bg-gray-800 pb-5">
          <div>
            <Transition user={user?.homework} location={router.pathname}>
              {props.children}
            </Transition>
          </div>
        </main>
      </div>
    </div>
  );
}
