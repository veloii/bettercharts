import { Box, Button, Center, Stack, Text, Title } from "@mantine/core";
import Head from "next/head";

const Phone = () => {
  return (
    <Center
      style={{
        height: "100vh",
      }}
    >
            <Head>
        <title>No Phone | BetterCharts</title>
      </Head>
      <Stack p="md">
        <Title
          align="center"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          })}
        >
          The new BetterCharts does not support phone
        </Title>
        <Text
          align="center"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          })}
        >
          I am working on an app, sorry
        </Text>
      </Stack>
    </Center>
  );
};

export default Phone;
