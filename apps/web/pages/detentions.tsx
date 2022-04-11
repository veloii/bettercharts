import { Group, Box, Stack, Title, Text } from "@mantine/core";
import { UserContext } from "context/ClassChartsContext";
import { SocketContext } from "context/SocketIOContext";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DetentionTable } from "ui/mantine/DetentionTable";

const convertDate = (jsDate: Date) => {
  const date = ("0" + jsDate.getDate()).slice(-2);
  const month = ("0" + (jsDate.getMonth() + 1)).slice(-2);
  const year = jsDate.getFullYear();
  return `${year}-${month}-${date}`;
};

const Detentions = () => {
  const { user } = useContext(UserContext);
  if (!user) return <div></div>;

  return (
    <Box p="md" py="xl">
            <Head>
        <title>Detentions | BetterCharts</title>
      </Head>
      <Stack>
        <Box>
          <Group pb="sm" position="apart">
            <Box>
              <Title order={1}>Detentions</Title>
              <Text>Do I really have to explain?</Text>
            </Box>
          </Group>
        </Box>
        <DetentionTable data={user.detentions} />
      </Stack>
    </Box>
  );
};

export default Detentions;
