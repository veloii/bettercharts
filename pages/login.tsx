import { useContext, useEffect, useState } from "react";
import { SingleDatePicker } from "react-dates";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { UserContext } from "context/ClassChartsContext";

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
    if (router.query?.password && router.query?.dob) {
      setCookie(
        "cc_access_code",
        router.query?.password.toString().toUpperCase()
      );
      setCookie(
        "cc_date_of_birth",
        dayjs(router.query?.dob.toString()).format("D/M/YYYY")
      );

      router.push("/");
      return;
    }
  });

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
                    <div className="mt-1">
                      <SingleDatePicker
                        date={date}
                        onDateChange={(date) => {
                          setDate(date);
                        }}
                        focused={focused}
                        onFocusChange={({ focused }) => setFocused(focused)}
                        id="dob"
                        noBorder
                        isOutsideRange={() => false}
                      />
                    </div>
                    <label
                      htmlFor="password"
                      className="block italic w-64 text-xs font-medium text-gray-800 dark:text-gray-400"
                    >
                      tip: type the date of birth in rather then select it with
                      the date picker
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="focus:dark:ring-offset-gray-900 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Sign in
                    </button>
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
};

export default Login;
