import { UserContext } from "context/ClassChartsContext";
import { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import Announcement from "ui/Announcement";
import Container from "ui/Container";

const Announcements: NextPage = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <Container>
      <Head>
        <title>Announcements | BetterCharts</title>
      </Head>
      <div className="space-y-4 pt-4">
        {user?.announcements.length === 0 && (
          <div className="flex justify-center items-center mt-16 bg-gray-800 p-10 rounded-3xl shadow dark:shadow-none">
            <div>
              <img className="w-96" src="/NoHomework.svg" />
              <h2 className="text-3xl text-center text-gray-200 font-semibold py-2">
                No Announcements
              </h2>
            </div>
          </div>
        )}
        {user?.announcements?.map((announcement) => (
          <Announcement announcement={announcement} key={announcement.id} />
        ))}
      </div>
    </Container>
  ) : (
    <div
      className={`m-0 p-0 w-screen h-screen gap-4 absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50`}
    >
      <Head>
        <title>Loading | BetterCharts</title>
      </Head>
      <div className="loading"></div>
    </div>
  );
};

export default Announcements;
