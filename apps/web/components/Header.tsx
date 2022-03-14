import classNames from "../lib/classNames";
import { Fragment, useContext } from "react";
import {
  Menu,
  Popover,
  Transition as HeadlessUITransition,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  ExclamationIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../context/ClassChartsContext";
import Transition from "./transition/index";
import TextTransition from "react-text-transition";
import { ThemeContext } from "context/ThemeContext";
import React from "react";

const userNavigation = [{ name: "Sign out", href: "/logout" }];

const navigation = [
  {
    name: "Dashboard",
    href: "/overview",
  },
  {
    name: "csf",
    href: "/csf",
  },
  {
    name: "Behaviour",
    href: "/behaviour",
  },
  {
    name: "Announcements",
    href: "/announcements",
  },
  {
    name: "Timetable",
    href: "/timetable",
  },
  {
    name: "Homework",
    href: "/homework",
  },
  {
    name: "Detentions",
    href: "/detentions",
  },
  {
    name: "Awards",
    href: "/awards",
  },
  {
    name: "report-bug",
    href: "/report-bug",
  },
];

const callsToAction = [
  { name: "Report a bug", href: "#", icon: ExclamationIcon },
  {
    name: "Can't see all features?",
    href: "/csf",
    icon: QuestionMarkCircleIcon,
  },
];

export default function Header(props: { children: any }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return theme ? (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Popover as="nav" className="bg-white shadow dark:bg-gray-900">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex items-center flex-shrink-0">
                    <span className="block text-3xl text-emerald-500 md:mr-10 font-brand dark:text-emerald-400">
                      bc
                    </span>
                  </div>
                  <div className="items-center justify-center hidden md:-my-px md:flex md:space-x-8">
                    <Popover.Group as="nav" className="flex space-x-10">
                      {theme.desktopNavigation.map((category) => (
                        <Popover key={category.name}>
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "text-gray-900 dark:text-gray-100"
                                    : "text-gray-700 dark:text-gray-300",
                                  "group bg-white dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 hover:dark:text-gray-100 focus:outline-none "
                                )}
                              >
                                <span className="text-sm">{category.name}</span>
                                <ChevronDownIcon
                                  className={classNames(
                                    open
                                      ? "text-gray-600 dark:text-gray-400"
                                      : "text-gray-400 dark:text-gray-500",
                                    "ml-2 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                                  )}
                                  aria-hidden="true"
                                />
                              </Popover.Button>

                              <HeadlessUITransition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 -translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-1"
                              >
                                <Popover.Panel
                                  static
                                  className="absolute inset-x-0 z-50 hidden transform bg-white dark:bg-gray-900 shadow-lg top-[4.1rem] md:block"
                                >
                                  <div className="grid px-4 py-6 mx-auto max-w-7xl gap-y-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                                    {category.items.map((item) => (
                                      <Link key={item.href} href={item.href}>
                                        <a
                                          key={item.name}
                                          className="flex flex-col justify-between p-3 -m-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                          <div className="flex md:h-full lg:flex-col">
                                            <div className="flex-shrink-0">
                                              <span className="inline-flex items-center justify-center w-10 h-10 text-white rounded-md dark:text-black bg-emerald-500 sm:h-12 sm:w-12">
                                                <item.icon
                                                  className="w-6 h-6"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            </div>
                                            <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                              <div>
                                                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                                                  {item.name}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                  {item.description}
                                                </p>
                                              </div>
                                              <p className="mt-2 text-sm font-medium text-emerald-600 lg:mt-4">
                                                {item.info}{" "}
                                                <span aria-hidden="true">
                                                  &rarr;
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </a>
                                      </Link>
                                    ))}
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-800">
                                    <div className="px-4 py-5 mx-auto space-y-6 max-w-7xl sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                                      {callsToAction.map((item) => (
                                        <div
                                          key={item.name}
                                          className="flow-root"
                                        >
                                          <Link href={item.href}>
                                            <a className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 rounded-md dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                                              <item.icon
                                                className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500"
                                                aria-hidden="true"
                                              />
                                              <span className="ml-3">
                                                {item.name}
                                              </span>
                                            </a>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </HeadlessUITransition>
                            </>
                          )}
                        </Popover>
                      ))}
                    </Popover.Group>
                  </div>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {({ open }) => (
                      <>
                        <Menu.Button className="flex text-sm bg-white rounded-full dark:bg-gray-900 ">
                          <div className="flex items-center justify-center gap-4 px-3 py-2 transition duration-100 border rounded-md dark:border-gray-800 dark:hover:bg-gray-800 hover:bg-gray-50">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="border dark:border-gray-800 rounded-xl w-9 h-9"
                              src={user?.student?.avatar_url}
                              alt=""
                            />
                            <div>
                              <div className="text-sm font-semibold text-left dark:text-gray-50">
                                {user?.student?.first_name}
                              </div>
                              <div className="text-xs font-light text-left dark:text-gray-50">
                                {user?.student?.last_name}
                              </div>
                            </div>
                          </div>
                        </Menu.Button>

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
                            className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                                        "block px-4 py-2 text-sm hover:bg-gray-100 hover:dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
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
                <div className="flex items-center -mr-2 md:hidden">
                  {/* Mobile menu button */}
                  <div className="-my-2 -mr-2 md:hidden">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:text-gray-600 dark:bg-gray-900 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
            </div>

            <HeadlessUITransition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform md:hidden"
              >
                <div className="bg-white divide-y-2 rounded-lg shadow-lg dark:bg-gray-900 ring-1 ring-black dark:ring-offset-gray-900 ring-opacity-5 divide-gray-50 dark:divide-gray-800">
                  <div className="px-5 pt-5 pb-6 sm:pb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-3xl text-emerald-500 md:mr-10 font-brand dark:text-emerald-400">
                          bcx
                        </span>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:text-gray-600 dark:bg-gray-900 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="w-6 h-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-8">
                      <nav>
                        <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                          {theme.desktopNavigation.map((item) =>
                            item.items.map((item) => (
                              <Link key={item.href} href={item.href}>
                                <a
                                  key={item.name}
                                  className="flex items-center p-3 -m-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-md dark:text-black bg-emerald-500 sm:h-12 sm:w-12">
                                    <item.icon
                                      className="w-6 h-6"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="ml-4 text-base font-medium text-gray-900 dark:text-gray-100">
                                    {item.name}
                                  </div>
                                </a>
                              </Link>
                            ))
                          )}
                        </div>
                        <div className="mt-8 text-base">
                          <Link href="/logout">
                            <a className="font-medium text-emerald-600 hover:text-emerald-500">
                              {" "}
                              Logout <span aria-hidden="true">&rarr;</span>
                            </a>
                          </Link>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </HeadlessUITransition>
          </>
        )}
      </Popover>

      <div>
        <header
          className={`bg-white dark:bg-gray-900 ${
            router.asPath.includes("overview") ||
            router.asPath.includes("csf") ||
            router.asPath.includes("calendar") ||
            router.asPath.includes("report-bug")
              ? "py-0 h-0"
              : "py-10 border-b"
          } filter drop-shadow dark:border-b-gray-700 mt-0.5 transition-all ease-in-out duration-500`}
        >
          <div className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
            <h1
              className={`text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 ease-in-out duration-500`}
            >
              <TextTransition
                text={
                  (
                    navigation.find((nav) => {
                      if (nav.name === "Dashboard") return "";
                      if (nav.name === "csf") return "";
                      if (nav.name === "calendar") return "";
                      if (nav.name === "report-bug") return "";
                      else return router.asPath.includes(nav.href);
                    }) || { name: "" }
                  ).name
                }
              />
            </h1>
          </div>
        </header>
        <main className="pb-5 bg-gray-100 dark:bg-gray-800">
          <div>
            <Transition user={user?.homework} location={router.pathname}>
              {props.children}
            </Transition>
          </div>
        </main>
      </div>
    </div>
  ) : null;
}
