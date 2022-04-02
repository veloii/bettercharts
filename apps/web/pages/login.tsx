import { useContext, useEffect, useState } from "react";
import { SingleDatePicker } from "react-dates";
import { NextRouter, useRouter } from "next/router";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { UserContext } from "context/ClassChartsContext";
import Head from "next/head";
import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/hooks";
import { SocketContext } from "context/SocketIOContext";

const Login = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);
  const router = useRouter();
  const { socket, setSocket } = useContext(SocketContext);

  const form = useForm({
    initialValues: {
      rememberMe: "off",
      accessCode: "",
      birth: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
      return;
    }
  });

  const handleSubmit = (values: {
    rememberMe: string;
    accessCode: string;
    birth: Date | undefined;
  }) => {
    if (!values.birth) return setError(true);
    setError(false);
    setLoading(true);

    const options = values.rememberMe === "on" ? { maxAge: 31536000 } : {};

    const jsDate: Date = values.birth;
    const date = ("0" + jsDate.getDate()).slice(-2);
    const month = ("0" + (jsDate.getMonth() + 1)).slice(-2);
    const year = jsDate.getFullYear();
    const birth = `${date}/${month}/${year}`;

    setCookie("cc_access_code", values.accessCode, options);
    setCookie("cc_date_of_birth", birth, options);

    // trigger to try to login
    setSocket(undefined);
  };

  useEffect(() => {
    if (loggedIn) return;
    if (socket === null) {
      setError(true);
      removeCookie("cc_access_code");
      removeCookie("cc_date_of_birth");
      setLoading(false);
      return;
    }
    if (user !== null) {
      if (user !== undefined) {
        setLoggedIn(true);
        setError(false);
        setLoading(false);
        return;
      }
    }
  }, [socket, user]);

  useEffect(() => {
    setError(false);
  }, [form.values]);

  return (
    <div>
      <Head>
        <title>Login | BetterCharts</title>
      </Head>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontWeight: 900,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.gray[0]
                : theme.colors.gray[9],
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          No account needed. Put your ClassCharts code in.
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <PasswordInput
              {...form.getInputProps("accessCode")}
              label="Access Code"
              placeholder="A2XPQIL5UJ"
              required
              mt="md"
              error={error}
            />
            <DatePicker
              {...form.getInputProps("birth")}
              placeholder="April 15, 2007"
              label="Date of birth"
              mt="md"
              required
              error={error}
            />
            <Group position="apart" mt="md">
              <Checkbox
                {...form.getInputProps("rememberMe")}
                label="Remember me"
              />
            </Group>
            <Button loading={loading} type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
