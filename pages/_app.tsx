import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContextProvider } from "../context/ClassChartsContext";
import ClassCharts from "../types/ClassCharts";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, setUser] = useState<ClassCharts>();

  useEffect(() => {
    fetch("/api/getInfo")
      .then((res) => res.json())
      .then((res) => setUser(res));
  }, []);

  return (
    <React.Fragment>
      <UserContextProvider value={{ user, setUser }}>
        <Header>
          <Component key={router.route} {...pageProps} />
        </Header>
      </UserContextProvider>
    </React.Fragment>
  );
}

export default MyApp;
