import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContextProvider } from "../context/ClassChartsContext";
import ClassCharts from "../types/ClassCharts";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { CookiesProvider, useCookies } from "react-cookie";
import CookieConsent from "components/CookieConsent";
import Updates from "components/Updates";
import { ThemeContextProvider } from "context/ThemeContext";
import Theme from "../types/Theme";
import setupTheme from "lib/setupTheme";
import { SocketContextProvider } from "context/SocketIOContext";
import { io, Socket } from "socket.io-client";
import Login from "./login";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, setUser] = useState<ClassCharts | null>();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [socket, setSocket] = useState<Socket | null>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);
  const [status, setStatus] = useState<string>("Discovering Cookies");

  useEffect(() => {
    if (cookies.cc_access_code && cookies.cc_date_of_birth) {
      if (socket === null) return;

      setStatus("Connecting to Socket.IO");

      const _socket = io(process.env.NEXT_PUBLIC_API_URL || "https://api.zelr.me", {
        auth: {
          accessCode: cookies.cc_access_code,
          dateOfBirth: cookies.cc_date_of_birth,
        },
        withCredentials: true,
      });

      _socket.on("ready", () => {
        setStatus("Initializing BetterCharts");
        _socket.emit("getInfo");
        setSocket(_socket);
      });

      _socket.on("connect", () => {
        setStatus("Connected to Socket.IO, waiting for data");
      });

      _socket?.on("refreshData", (user) => {
        if (theme === null) setTheme(setupTheme(user));
        setUser(user);
      });

      _socket.on("connect_error", (err) => {
        setStatus("Invalid ClassCharts Code");
        removeCookie("cc_access_code");
        removeCookie("cc_date_of_birth");
        setUser(null);
        window.location.pathname = "/login";
      });
    } else {
      if (!socket) {
        setUser(null);
      }
    }
  }, [cookies]);

  return (
    <React.Fragment>
      <CookiesProvider>
        <SocketContextProvider value={{ socket, setSocket }}>
          <UserContextProvider value={{ user, setUser }}>
            <ThemeContextProvider value={{ theme, setTheme }}>
              <CookieConsent />
              <Updates />
              {user ? (
                <Header>
                  <Component key={router.route} {...pageProps} />
                </Header>
              ) : user === null ? (
                <Login />
              ) : (
                <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-0 m-0 bg-white dark:bg-gray-900">
                  <div className="loading"></div>
                  <div className="pl-5">{status}</div>
                </div>
              )}
            </ThemeContextProvider>
          </UserContextProvider>
        </SocketContextProvider>
      </CookiesProvider>
    </React.Fragment>
  );
}

export default MyApp;
