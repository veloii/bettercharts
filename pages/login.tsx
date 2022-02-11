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

      window.location.pathname = "/";

      return;
    }
  });

  if (user === false)
    return (
      <div>
        <div className="min-h-screen bg-white dark:bg-gray-900 flex">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src="/CC_logo_no_tes.png"
                  alt="BetterCharts"
                />
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
                          className="dark:bg-gray-800 dark:text-white appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="day"
                          required
                          id="day"
                          className="z-10 dark:bg-gray-800  dark:border-gray-600 dark:text-white focus:ring-orange-500 dark:focus:ring-offset-gray-900 rounded-l-md focus:border-orange-500 w-12 text-center block rounded-none sm:text-sm border-gray-300"
                          placeholder="23"
                        />
                        <span className="inline-flex dark:bg-gray-700 border border-x-0 dark:border-gray-600 items-center px-3 bg-gray-50 text-gray-500 text-sm">
                          /
                        </span>
                        <input
                          type="number"
                          name="month"
                          required
                          id="month"
                          className="z-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-orange-500 dark:focus:ring-offset-gray-900 focus:border-orange-500 block w-12 text-center rounded-none sm:text-sm border-gray-300"
                          placeholder="02"
                        />
                        <span className="inline-flex dark:bg-gray-700 border border-x-0 dark:border-gray-600 items-center px-3 bg-gray-50 text-gray-500 text-sm">
                          /
                        </span>
                        <input
                          type="number"
                          name="year"
                          required
                          id="year"
                          className="z-10 dark:bg-gray-800 rounded-r-md dark:border-gray-600 dark:text-white focus:ring-orange-500 dark:focus:ring-offset-gray-900 focus:border-orange-500 text-center block w-16 rounded-none sm:text-sm border-gray-300"
                          placeholder="2003"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-800 rounded dark:focus:ring-offset-gray-900"
                      />
                      <label
                        htmlFor="remember_me"
                        className="ml-2 block text-sm text-gray-900 dark:text-gray-50"
                      >
                        Remember me
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="focus:dark:ring-offset-gray-900 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Sign in
                      </button>
                      <label className="block italic text-center mt-2 text-xs font-medium text-gray-800 dark:text-gray-400">
                        your data is only being used to access classcharts on
                        our server
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="/classroom.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="m-0 p-0 w-screen h-screen absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50">
        <Head>
          <title>Loading | BetterCharts</title>
        </Head>
        <div className="loading"></div>
      </div>
    );
};

export default Login;
