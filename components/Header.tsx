import classNames from "../lib/classNames";
import { Fragment, useContext, useEffect, useState } from "react";
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
import allowClassChartsFeature from "../hooks/allowClassChartsFeature";

const userNavigation = [
  { name: "Awards", href: "/awards" },
  { name: "Sign out", href: "/logout" },
];

export default function Header(props: { children: any }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [navigation, setNavigation] = useState<
    undefined | Array<{ name: string; href: string; logo?: boolean }>
  >(undefined);

  useEffect(() => {
    if (user && navigation === undefined) {
      const classChartsFeatures: string[] = allowClassChartsFeature(
        user
      ) as any;

      setNavigation([
        { name: "bettercharts", href: "/overview", logo: true },

        ...classChartsFeatures!.map((feature) => ({
          name: feature,
          href: "/" + feature.toLowerCase(),
        })),
      ]);
    }
  }, [user]);

  return navigation ? (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Disclosure as="nav" className="bg-white dark:bg-gray-900 shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="block md:hidden font-brand dark:text-purple-400 text-purple-500 text-3xl">
                      bettercharts
                    </span>
                  </div>
                  <div className="hidden md:-my-px md:flex md:space-x-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            router.asPath
                              .toLowerCase()
                              .includes(item.href.toLowerCase())
                              ? "border-purple-400 text-gray-900 dark:text-gray-200 font-semibold "
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
                          {item.logo ? (
                            <span className="dark:text-purple-300 text-purple-500 font-brand text-3xl">
                              {item.name}
                            </span>
                          ) : (
                            item.name
                          )}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-white dark:bg-gray-900 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-purple-500">
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
                <div className="-mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-purple-500">
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

            <Disclosure.Panel className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        router.asPath
                          .toLowerCase()
                          .includes(item.href.toLowerCase())
                          ? "bg-purple-50 dark:bg-purple-900 border-purple-500 dark:border-purple-700 text-purple-600 dark:text-purple-200 font-semibold "
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
                      {item.logo ? (
                        <span className="dark:text-purple-300 font-brand text-3xl">
                          {item.name}
                        </span>
                      ) : (
                        item.name
                      )}
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
                  <button className="ml-auto bg-white dark:bg-gray-900 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-purple-500">
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
            router.asPath.includes("overview") ? "py-0 h-0" : "py-10 border-b"
          } filter drop-shadow dark:border-b-gray-700 mt-0.5 transition-all ease-in-out duration-500`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h1
              className={`text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 ease-in-out duration-500`}
            >
              <TextTransition
                text={
                  (
                    navigation.find((nav) => {
                      if (nav.name === "bettercharts") return "";
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
  ) : (
    props.children
  );
}
