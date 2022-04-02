import { useContext, useState } from "react";
import { UserContext } from "context/ClassChartsContext";
import { HomeworkTable } from "ui/mantine/HomeworkTable";
import { Box, Group, Stack, Title, Text } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { SocketContext } from "context/SocketIOContext";
import { useEffect } from "react";

const convertDate = (jsDate: Date) => {
  const date = ("0" + jsDate.getDate()).slice(-2);
  const month = ("0" + (jsDate.getMonth() + 1)).slice(-2);
  const year = jsDate.getFullYear();
  return `${year}-${month}-${date}`;
};

const Homework = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getHomework();
  }, []);

  const getHomework = (from?: string, to?: string) => {
    if (!from) return socket?.emit("getHomework");
    if (!to) return socket?.emit("getHomework");

    socket?.emit("getHomework", [from, to]);
  };

  if (!user) return <div></div>;
  return (
    <Box p="md" py="xl">
      <Stack>
        <Box>
          <Group pb="sm" position="apart">
            <Box>
              <Title order={1}>Homework</Title>
              <Text>View and complete the homework set for each class</Text>
            </Box>
            <DateRangePicker
              placeholder="Pick dates range"
              value={value}
              onChange={(dates) => {
                setValue(dates);

                if (dates[0] === null) return getHomework();
                if (dates[1] === null) return getHomework();

                const from = convertDate(dates[0]);
                const to = convertDate(dates[1]);

                getHomework(from, to);
              }}
            />
          </Group>
        </Box>
        <HomeworkTable data={user.homework} />
      </Stack>
    </Box>
  );
};

export default Homework;
