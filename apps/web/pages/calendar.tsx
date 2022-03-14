import { UserContext } from "context/ClassChartsContext";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Container from "ui/Container";
import { useRouter } from "next/router";
import CalendarComponent from "ui/Calendar";

const Calendar = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Calendar | BetterCharts</title>
      </Head>
      <CalendarComponent />
    </>
  );
};

export default Calendar;
