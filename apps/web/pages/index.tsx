import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return <div>
          <Head>
        <title>Loading | BetterCharts</title>
      </Head>
  </div>;
};

export default Index;
