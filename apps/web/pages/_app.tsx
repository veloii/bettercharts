import "../styles/globals.css";
import { BrowserView, MobileView } from "react-device-detect";
import { ModalsProvider } from "@mantine/modals";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { UserContextProvider } from "../context/ClassChartsContext";
import ClassCharts from "../types/ClassCharts";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useCookies } from "react-cookie";
import Theme from "../types/Theme";
import { SocketContextProvider } from "context/SocketIOContext";
import { io, Socket } from "socket.io-client";
import Login from "./login";
import Calendar from "types/Calendar";
import {
  Box,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  ScrollArea,
} from "@mantine/core";
import { Sidebar } from "ui/Sidebar";
import Dashboard from "./dashboard";
import fakeUser from "lib/fakeUser";
import { useLocalStorage, useHotkeys, useColorScheme } from "@mantine/hooks";
import Phone from "./phone";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, setUser] = useState<ClassCharts | null | undefined>(fakeUser);
  const [calendar, setCalendar] = useState<Calendar | undefined>();
  const [loaded, setLoaded] = useState(false);
  const [socket, setSocket] = useState<Socket | null>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);
  const [status, setStatus] = useState<string>("Discovering Cookies");
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (socket) return;

    if (cookies.cc_access_code && cookies.cc_date_of_birth) {
      if (socket === null) return;

      setStatus("Connecting to Socket.IO");

      const _socket = io(
        process.env.NEXT_PUBLIC_API_URL || "https://api.zelr.me",
        {
          auth: {
            accessCode: cookies.cc_access_code,
            dateOfBirth: cookies.cc_date_of_birth,
          },
          withCredentials: true,
        }
      );

      _socket.on("ready", () => {
        setStatus("Initializing BetterCharts");
        _socket.emit("getInfo");

        _socket.emit("getCalendar");
        setSocket(_socket);
      });

      _socket.on("connect", () => {
        setStatus("Connected to Socket.IO, waiting for data");
      });

      _socket?.on("refreshCalendar", (calendar) => {
        const localCalendar = { days: calendar };
        setCalendar(localCalendar);
        setLoaded(true);
      });

      _socket?.on("refreshData", (user) => {
        setUser(user);
      });

      _socket.on("connect_error", (err) => {
        setStatus("Invalid ClassCharts Code");
        setSocket(null);
        setUser(null);
      });
    } else {
      if (!socket) {
        setUser(null);
      }
    }
  }, [cookies, socket === undefined]);

  useEffect(() => {
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          primaryColor: "violet",
          fontFamily: "Inter var",
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          })}
        >
          <ModalsProvider>
            <SocketContextProvider value={{ socket, setSocket }}>
              <UserContextProvider value={{ user, setUser }}>
                {user && loaded ? (
                  <div style={{ display: "flex" }}>
                    <Sidebar />
                    <Box
                      sx={(theme) => ({
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                        width: "100%",
                      })}
                    >
                      <ScrollArea
                        style={{
                          height: "100vh",
                          minWidth: "1024px",
                          width: "100%",
                          maxWidth: "100vw",
                        }}
                      >
                        <Box
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                            width: "100%",
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[0]
                                : theme.colors.gray[9],
                          })}
                        >
                          <BrowserView>
                            <Component key={router.route} {...pageProps} />
                          </BrowserView>
                          <MobileView>
                            <Phone />
                          </MobileView>
                        </Box>
                      </ScrollArea>
                    </Box>
                  </div>
                ) : user === null ? (
                  <ScrollArea
                    style={{
                      height: "100vh",
                      width: "100%",
                    }}
                  >
                    <BrowserView>
                      <Login />
                    </BrowserView>
                    <MobileView>
                      <Phone />
                    </MobileView>
                  </ScrollArea>
                ) : user !== undefined ? (
                  <div style={{ display: "flex" }}>
                    <Sidebar />
                    <Box
                      sx={(theme) => ({
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                        width: "100%",
                      })}
                    >
                      <ScrollArea
                        style={{
                          height: "100vh",
                          minWidth: "1024px",
                          width: "100%",
                          maxWidth: "100vw",
                        }}
                      >
                        <Box
                          sx={(theme) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                            width: "100%",
                            color:
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[0]
                                : theme.colors.gray[9],
                          })}
                        >
                          <BrowserView>
                            <Dashboard />
                          </BrowserView>
                          <MobileView>
                            <Phone />
                          </MobileView>
                        </Box>
                      </ScrollArea>
                    </Box>
                  </div>
                ) : (
                  <ScrollArea
                    style={{
                      height: "100vh",
                      width: "100%",
                    }}
                  >
                    <BrowserView>
                      <Login />
                    </BrowserView>
                    <MobileView>
                      <Phone />
                    </MobileView>
                  </ScrollArea>
                )}
              </UserContextProvider>
            </SocketContextProvider>
          </ModalsProvider>
        </Box>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
