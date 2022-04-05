import {
  Box,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { UserContext } from "context/ClassChartsContext";
import { SocketContext } from "context/SocketIOContext";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Timeline from "ui/mantine/Timeline";
import "chart.js/auto";
import PieChartBehaviour from "ui/mantine/PieChartBehaviour";
import PieChartBehaviourCard from "ui/mantine/PieChartBehaviourCard";
import BarChartWeeklyBreakdown from "ui/mantine/BarChartWeeklyBreakdown";
import Head from "next/head";

const Behaviour = () => {
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.emit("getBehaviour");
    socket?.emit("getActivity");
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
            <Head>
        <title>Behaviour | BetterCharts</title>
      </Head>
      <Title order={1} px="md" pt="xl">
        Behaviour
      </Title>
      <Text px="md" pb="sm">
        View your behaviour in class with visual breakdowns
      </Text>
      <Box sx={(theme) => ({ padding: theme.spacing.md })}>
        <SimpleGrid cols={2}>
          <Paper withBorder shadow="sm" p="sm">
            <Timeline timeline={user?.activity} />
          </Paper>

          <Stack>
            <Paper
              style={{
                minWidth: 600,
              }}
              withBorder
              shadow="sm"
              p={0}
            >
              <PieChartBehaviourCard behaviour={user?.allTimeBehaviour} />
            </Paper>
            <Paper withBorder shadow="sm" p="sm">
              <BarChartWeeklyBreakdown behaviour={user?.behaviour!} />
            </Paper>
          </Stack>
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default Behaviour;
