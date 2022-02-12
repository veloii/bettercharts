import Head from "next/head";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);

  const router = useRouter();

  useEffect(() => {
    removeCookie("cc_access_code");
    removeCookie("cc_date_of_birth");

    window.location.pathname = "/login";
  }, []);

  return (
    <div className="m-0 p-0 w-screen h-screen absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50">
      <Head>
        <title>Loading | BetterCharts</title>
      </Head>
      <div className="loading"></div>
    </div>
  );
};

export default logout;
