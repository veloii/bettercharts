import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContextProvider } from "../context/ClassChartsContext";
import ClassCharts from "../types/ClassCharts";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import allowClassChartsFeature from "hooks/allowClassChartsFeature";
import { CookiesProvider, useCookies } from "react-cookie";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, setUser] = useState<ClassCharts | null>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);

  useEffect(() => {
    fetch("/api/getInfo")
      .then((res) => res.json())
      .then((res) => {
        if (res?.message === "Unauthorized") {
          setUser(null);
          return router.push("/login");
        }

        const classCharts: ClassCharts = res as any;
        const features: Array<{ name: string; value: boolean }> =
          allowClassChartsFeature(classCharts, true) as any;

        features.forEach((feature) => {
          if (router.asPath.includes(feature.name) && feature.value === false)
            router.push("/");
        });

        setUser(res);
      });
  }, []);

  router.events?.on("routeChangeStart", (path) => {
    if (user) {
      const features: Array<{ name: string; value: boolean }> =
        allowClassChartsFeature(user, true) as any;

      features.forEach((feature) => {
        if (path.includes(feature.name) && feature.value === false)
          router.push("/");
      });
    }
  });

  return (
    <React.Fragment>
      <CookiesProvider>
        <UserContextProvider value={{ user, setUser }}>
          {user ? (
            <Header>
              <Component key={router.route} {...pageProps} />
            </Header>
          ) : (
            <Component key={router.route} {...pageProps} />
          )}
        </UserContextProvider>
      </CookiesProvider>
    </React.Fragment>
  );
}

export default MyApp;
