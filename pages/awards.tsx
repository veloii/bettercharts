import { UserContext } from "context/ClassChartsContext";
import { useContext } from "react";
import Container from "ui/Container";
import Badge from "ui/Badge";
import Head from "next/head";

const Awards = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <Container>
      <Head>
        <title>Awards | BetterCharts</title>
      </Head>
      <div className="flex gap-2 flex-wrap pt-5 justify-center md:justify-start">
        {user?.awards?.map((award) => (
          <Badge
            dateCreated={award.created_date}
            image={award.icon_url}
            text={award.name}
          />
        ))}
      </div>
      {user?.awards.length === 0 && (
        <div className="flex justify-center items-center mt-16 bg-gray-800 p-10 rounded-3xl shadow dark:shadow-none">
          <div>
            <img className="w-96" src="/NoHomework.svg" />
            <h2 className="text-3xl text-center text-gray-200 font-semibold py-2">
              No Awards
            </h2>
          </div>
        </div>
      )}
    </Container>
  ) : (
    <div
      className={`m-0 p-0 w-screen h-screen gap-4 absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center`}
    >
      <Head>
        <title>Loading | BetterCharts</title>
      </Head>
      <div className="loading"></div>
    </div>
  );
};

export default Awards;
