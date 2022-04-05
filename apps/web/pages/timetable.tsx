import { useContext, useState } from "react";
import { UserContext } from "context/ClassChartsContext";
import { HomeworkTable } from "ui/mantine/HomeworkTable";
import { Box, Group, Stack, Title, Text, Center } from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";
import { SocketContext } from "context/SocketIOContext";
import { useEffect } from "react";
import { Timetable as TimetableTable } from "ui/mantine/Timetable";
import Head from "next/head";

const convertDate = (jsDate: Date) => {
  const date = ("0" + jsDate.getDate()).slice(-2);
  const month = ("0" + (jsDate.getMonth() + 1)).slice(-2);
  const year = jsDate.getFullYear();
  return `${year}-${month}-${date}`;
};

const Timetable = () => {
  const [value, setValue] = useState<Date | null>();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);

  const getTimetable = (date?: string | null) => {
    if (!date) return socket?.emit("getTimetable");

    socket?.emit("getTimetable", date);
  };

  if (!user) return <div></div>;

  const onChange = (date: Date | null) => {
    if (date) getTimetable(convertDate(date));
    else getTimetable();

    setValue(date);
  };

  return user.lessons.length === 0 ? (
    <Center
      sx={{
        height: "100vh",
      }}
    >
            <Head>
        <title>No Lessons | BetterCharts</title>
      </Head>
      <Stack spacing={20}>
        <Title order={3} align="center">
          No Lessons Today
        </Title>
        <Calendar value={value} onChange={onChange} />
      </Stack>
    </Center>
  ) : (
    <Box p="md" py="xl">
            <Head>
        <title>{value.toLocaleDateString()} Timetable | BetterCharts</title>
      </Head>
      <Stack>
        <Box>
          <Group pb="sm" position="apart">
            <Box>
              <Title order={1}>Timetable</Title>
              <Text>View your timetable for the selected day</Text>
            </Box>
            <DatePicker
              placeholder="Pick dates range"
              value={value}
              onChange={onChange}
            />
          </Group>
        </Box>

        <TimetableTable data={user.lessons} />
      </Stack>
    </Box>
  );
};

export default Timetable;
