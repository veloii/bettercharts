import { UserContext } from "context/ClassChartsContext";
import { useContext } from "react";
import Container from "ui/Container";
import Badge from "ui/Badge";
import Head from "next/head";

const Awards = () => {
  const { user } = useContext(UserContext);

  return (
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
  );
};

export default Awards;
