import { useContext, useEffect, useState } from "react";
import { SingleDatePicker } from "react-dates";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { UserContext } from "context/ClassChartsContext";
import Head from "next/head";
import Button from "ui/Button";

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
        <div className="min-h-screen bg-white md:flex dark:bg-gray-900">
          <div className="absolute z-50 flex flex-col justify-center flex-1 w-full -translate-x-1/2 -translate-y-1/2 bg-white md:p-5 md:w-auto md:shadow-lg lg:p-6 dark:md:border dark:border-gray-800 dark:bg-gray-900 md:rounded-2xl top-1/2 left-1/2 lg:flex-none">
            <div className="w-full max-w-sm mx-auto lg:w-96">
              <div>
                <span className="text-3xl text-emerald-600 font-brand dark:text-emerald-300">
                  bcx
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                  Sign in to your account
                </h2>
              </div>

              <div>
                <div className="mt-4">
                  <form className="space-y-6">
                    <div className="flex items-center justify-center w-full gap-2">
                      <div className="space-y-1">
                        <div className="mt-1">
                          <input
                            placeholder="Access Code"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-40 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none sm:text-sm focus:ring-emerald-500 dark:focus:ring-offset-gray-900 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex mt-1 text-center rounded-md">
                          <input
                            type="number"
                            name="day"
                            required
                            id="day"
                            className="z-10 block w-12 text-center border-gray-300 rounded-none shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-emerald-500 dark:focus:ring-offset-gray-900 rounded-l-md focus:border-emerald-500 sm:text-sm"
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
                            className="z-10 block w-12 text-center border-gray-300 rounded-none shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-emerald-500 dark:focus:ring-offset-gray-900 focus:border-emerald-500 sm:text-sm"
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
                            className="z-10 block w-16 text-center border-gray-300 rounded-none shadow-sm dark:bg-gray-800 rounded-r-md dark:border-gray-600 dark:text-white focus:ring-emerald-500 dark:focus:ring-offset-gray-900 focus:border-emerald-500 sm:text-sm"
                            placeholder="2003"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                      />
                      <label
                        htmlFor="remember_me"
                        className="block ml-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        Remember me
                      </label>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        size="3"
                        className="items-center justify-center w-full"
                      >
                        Sign in
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex-1 hidden w-0 md:block">
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
