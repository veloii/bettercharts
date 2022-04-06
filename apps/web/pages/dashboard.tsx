import { UserContext } from "context/ClassChartsContext";
import Masonry from "react-masonry-css";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import Head from "next/head";
import { SocketContext } from "context/SocketIOContext";
import {
  Box,
  Card,
  createStyles,
  Grid,
  Paper,
  SimpleGrid,
  Title,
  Text,
  ScrollArea,
  Skeleton,
  Button,
  Stack,
} from "@mantine/core";
import { HomeworkTable } from "ui/mantine/HomeworkTable";
import Timeline from "ui/mantine/Timeline";
import PieChartBehaviourCard from "ui/mantine/PieChartBehaviourCard";
import "chart.js/auto";
import { DetentionTable } from "ui/mantine/DetentionTable";
import { Timetable } from "ui/mantine/Timetable";
import { Announcement } from "ui/mantine/Announcement";
import Link from "next/link";

const convertDate = (date: dayjs.Dayjs) =>
  date.year() + "-" + (date.month() + 1) + "-" + date.date();

const useStyles = createStyles((theme) => ({
  masonary: {
    padding: theme.spacing.md,
    display: "flex",
    marginTop: -theme.spacing.md,
    marginLeft: -theme.spacing.md,
    width: "auto",
  },
  masonaryColumn: {
    "> div": {
      marginTop: theme.spacing.md,
    },
    backgroundClip: "padding-box",
    paddingLeft: theme.spacing.md,
  },
}));

const Dashboard: NextPage = () => {
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { classes } = useStyles();
  const [ready, setReady] = useState<boolean>(false);
  const reversedAnnouncements = [].concat(user.announcements).reverse();

  useEffect(() => {
    if (ready) return;
    if (user?.fake !== true) setReady(true);
  }, [user?.fake]);

  useEffect(() => {
    if (ready) {
      const fromDate = convertDate(dayjs().subtract(7, "day"));
      const toDate = convertDate(dayjs().add(7, "day"));

      socket?.emit("getBehaviour", [fromDate, toDate]);
      socket?.emit("getActivity", [fromDate, toDate]);
      socket?.emit("getHomework", [fromDate, toDate]);
      socket?.emit("getTimetable");
    }
  }, [ready]);

  const futureDetentions = () =>
    user?.detentions.filter((item) => {
      if (new Date(item.date!).getTime() > new Date().getTime()) return true;

      if (
        new Date(item.date!).toLocaleDateString() ===
        new Date().toLocaleDateString()
      )
        return true;

      return false;
    });

  return (
    <Box>
      <Head>
        <title>Dashboard | BetterCharts</title>
      </Head>
      <Title order={1} px="md" pt="xl">
        Dashboard
      </Title>
      <Text px="md" pb="sm">
        See information about this week at a glance
      </Text>
      <Masonry
        breakpointCols={{ default: 2, 1100: 1 }}
        className={classes.masonary}
        columnClassName={classes.masonaryColumn}
      >
        {user?.behaviour && user.behaviour.timeline.length >= 1 && (
          <Skeleton visible={!ready}>
            <Paper withBorder shadow="md" p={0}>
              <PieChartBehaviourCard behaviour={user?.behaviour} />
            </Paper>
          </Skeleton>
        )}

        {user?.homework && user.homework.length >= 1 && (
          <Skeleton visible={!ready}>
            <Paper withBorder shadow="md" style={{ padding: 0 }}>
              <HomeworkTable data={user?.homework} />
            </Paper>
          </Skeleton>
        )}

        {user?.activity && user.activity.length >= 1 && (
          <Skeleton visible={!ready}>
            <Paper withBorder shadow="md" p="sm">
              <Timeline timeline={user?.activity} />
            </Paper>
          </Skeleton>
        )}

        {(futureDetentions()?.length || []) >= 1 && (
          <Skeleton visible={!ready}>
            <Paper withBorder shadow="md" p="sm">
              <DetentionTable data={futureDetentions()!} />
            </Paper>
          </Skeleton>
        )}

        {user?.lessons && user?.lessons.length >= 1 && (
          <Skeleton visible={!ready}>
            <Paper withBorder shadow="md" p="sm">
              <Timetable data={user?.lessons!} />
            </Paper>
          </Skeleton>
        )}

        {user?.announcements && user?.announcements.length >= 1 && (
          <Skeleton visible={!ready}>
            <Paper withBorder shadow="md" p="sm">
              <Stack>
                <Announcement
                  postedAt={dayjs(
                    reversedAnnouncements[0].timestamp
                  ).toString()}
                  body={reversedAnnouncements[0].description!}
                  author={{
                    name: reversedAnnouncements[0].teacher_name,
                    image: reversedAnnouncements[0].school_logo || "",
                  }}
                  attachments={reversedAnnouncements[0].attachments}
                />
                {user.announcements.length > 1 && (
                  <Link passHref href="/announcements">
                    <Button variant="subtle">
                      View {user.announcements.length - 1} more announcement
                      {user.announcements.length - 1 !== 2 && "s"}
                    </Button>
                  </Link>
                )}
              </Stack>
            </Paper>
          </Skeleton>
        )}
      </Masonry>
    </Box>
  );
};

export default Dashboard;
