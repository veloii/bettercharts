import { Group, Paper, Center, Title, Text, Stack } from "@mantine/core";
import { UserContext } from "context/ClassChartsContext";
import dayjs from "dayjs";
import Head from "next/head";
import { useContext } from "react";
import { Announcement } from "ui/mantine/Announcement";

const Announcements = () => {
  const { user } = useContext(UserContext);

  return (
    <>
          <Head>
        <title>Announcements | BetterCharts</title>
      </Head>
      <Title order={1} px="md" pt="xl">
        Announcements
      </Title>
      <Text px="md" pb="sm">
        See all the announcements your school has posted
      </Text>
      <Stack p="md">
        {user?.announcements.map((announcement) => (
          <Announcement
            postedAt={dayjs(announcement.timestamp).toString()}
            body={announcement.description!}
            author={{
              name: announcement.teacher_name,
              image: announcement.school_logo || "",
            }}
            attachments={announcement.attachments}
          />
        ))}
      </Stack>
    </>
  );
};

export default Announcements;
