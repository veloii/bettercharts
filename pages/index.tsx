import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
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

export default Index;
