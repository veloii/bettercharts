import Head from "next/head";

const Csf = () => {
  return (
    <div className="max-w-xl text-gray-900 dark:text-gray-50">
      <Head>
        <title>Why can{"'"}t I see all my features?</title>
      </Head>
      <h1 className="pt-5 text-3xl font-semibold">
        Why can{"'"}t I see all my features?
      </h1>
      <p>
        Not all features have been added to BetterCharts that are on
        ClassCharts.
      </p>
      <p className="pt-5">Some of them include:</p>
      <ul className="list-disc">
        <li>Mental Health</li>
        <li>Messages</li>
      </ul>
      <h2 className="pt-5 text-2xl font-semibold">Why is this?</h2>
      <p>
        BetterCharts is made by me (zelr) and I am the only person on the team
        at the moment, and I do not have access to all the features.
      </p>
    </div>
  );
};

export default Csf;
