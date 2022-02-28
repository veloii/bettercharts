import { UserContext } from "context/ClassChartsContext";
import { useContext, useEffect } from "react";
import Container from "ui/Container";
import Badge from "ui/Badge";
import Head from "next/head";
import { useRouter } from "next/router";

const Awards = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/login");
  }, []);

  return user ? (
    <Container>
      <Head>
        <title>Awards | BetterCharts</title>
      </Head>
      <div className="flex flex-wrap justify-center gap-2 pt-5 md:justify-start">
        {user?.awards?.map((award) => (
          <Badge
            dateCreated={award.created_date}
            image={award.icon_url}
            text={award.name}
          />
        ))}
      </div>
      {user?.awards.length === 0 && (
        <div className="flex items-center justify-center p-10 mt-16 bg-gray-800 shadow rounded-3xl dark:shadow-none">
          <div>
            <img className="w-96" src="/NoHomework.svg" />
            <h2 className="py-2 text-3xl font-semibold text-center text-gray-200">
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
