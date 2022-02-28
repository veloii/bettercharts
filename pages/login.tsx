import { useContext, useEffect, useState } from "react";
import { SingleDatePicker } from "react-dates";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { UserContext } from "context/ClassChartsContext";
import Head from "next/head";

const Login = () => {
  const { user } = useContext(UserContext);
  const [date, setDate] = useState<any>(null);
  const [focused, setFocused] = useState<any>(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      return () => {
        router.push("/overview");
      };
    }
    if (
      router.query?.password &&
      router.query?.day &&
      router.query?.month &&
      router.query?.year
    ) {
      const options =
        router.query?.remember_me === "on" ? { maxAge: 31536000 } : {};

      const date =
        router.query?.day +
        "/" +
        router.query?.month +
        "/" +
        router.query?.year;

      setCookie(
        "cc_access_code",
        router.query?.password.toString().toUpperCase(),
        options
      );
      setCookie("cc_date_of_birth", date, options);

      window.location.pathname = "/overview";

      return;
    }
  });

  if (user === null)
    return (
      <div>
        <Head>
          <title>Login | BetterCharts</title>
        </Head>
        <div className="flex min-h-screen bg-white dark:bg-gray-900">
          <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="w-full max-w-sm mx-auto lg:w-96">
              <div>
                <span className="text-3xl text-purple-600 font-brand dark:text-purple-300">
                  bettercharts
                </span>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form className="space-y-6">
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Access Code
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Date of birth
                      </label>

                      <div className="flex mt-1 rounded-md">
                        <input
                          type="number"
                          name="day"
                          required
                          id="day"
                          className="z-10 block w-12 text-center border-gray-300 rounded-none shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-purple-500 dark:focus:ring-offset-gray-900 rounded-l-md focus:border-purple-500 sm:text-sm"
                          placeholder="23"
                        />
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 border shadow-sm dark:bg-gray-700 border-x-0 dark:border-gray-600 bg-gray-50">
                          /
                        </span>
                        <input
                          type="number"
                          name="month"
                          required
                          id="month"
                          className="z-10 block w-12 text-center border-gray-300 rounded-none shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-purple-500 dark:focus:ring-offset-gray-900 focus:border-purple-500 sm:text-sm"
                          placeholder="02"
                        />
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 border shadow-sm dark:bg-gray-700 border-x-0 dark:border-gray-600 bg-gray-50">
                          /
                        </span>
                        <input
                          type="number"
                          name="year"
                          required
                          id="year"
                          className="z-10 block w-16 text-center border-gray-300 rounded-none shadow-sm dark:bg-gray-800 rounded-r-md dark:border-gray-600 dark:text-white focus:ring-purple-500 dark:focus:ring-offset-gray-900 focus:border-purple-500 sm:text-sm"
                          placeholder="2003"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                      />
                      <label
                        htmlFor="remember_me"
                        className="block ml-2 text-sm text-gray-900 dark:text-gray-50"
                      >
                        Remember me
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm focus:dark:ring-offset-gray-900 hover:bg-purple-700 focus:outline-none "
                      >
                        Sign in
                      </button>
                      <label className="block mt-2 text-xs italic font-medium text-center text-gray-800 dark:text-gray-400">
                        your data is only being used to access classcharts on
                        our server
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex-1 hidden w-0 lg:block">
            <img
              className="absolute inset-0 object-cover w-full h-full"
              src="/classroom.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-0 m-0 bg-white dark:bg-gray-900">
        <Head>
          <title>Loading | BetterCharts</title>
        </Head>
        <div className="loading"></div>
      </div>
    );
};

export default Login;
