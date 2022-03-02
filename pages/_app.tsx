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
import CookieConsent from "components/CookieConsent";
import Updates from "components/Updates";
import { ThemeContextProvider } from "context/ThemeContext";
import Theme from "../types/Theme";
import setupTheme from "lib/setupTheme";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, setUser] = useState<ClassCharts | null>();
  const [theme, setTheme] = useState<Theme | null>(null);

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
          return;
        }

        setTheme(setupTheme(res!));

        setUser(res);
      });
  }, []);

  return (
    <React.Fragment>
      <CookiesProvider>
        <UserContextProvider value={{ user, setUser }}>
          <ThemeContextProvider value={{ theme, setTheme }}>
            <CookieConsent />
            <Updates />
            {user ? (
              <Header>
                <Component key={router.route} {...pageProps} />
              </Header>
            ) : (
              <Component key={router.route} {...pageProps} />
            )}
          </ThemeContextProvider>
        </UserContextProvider>
      </CookiesProvider>
    </React.Fragment>
  );
}

export default MyApp;
