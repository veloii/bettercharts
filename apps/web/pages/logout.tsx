import Head from "next/head";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);

  useEffect(() => {
    removeCookie("cc_access_code");
    removeCookie("cc_date_of_birth");

    window.location.href = "https://bettercharts.zelr.me";
  }, []);

  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-0 m-0 bg-white dark:bg-gray-900">
      <Head>
        <title>Loading | BetterCharts</title>
      </Head>
      <div className="loading"></div>
    </div>
  );
};

export default logout;
