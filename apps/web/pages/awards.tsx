import { Center, Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { UserContext } from "context/ClassChartsContext";
import { Image } from "@mantine/core";
import { useContext } from "react";
import Head from "next/head";

const Awards = () => {
  const { user } = useContext(UserContext);

  return (
    <>
          <Head>
        <title>Awards | BetterCharts</title>
      </Head>
      <Title order={1} px="md" pt="xl">
        Awards
      </Title>
      <Text px="md" pb="sm">
        ¯\_(ツ)_/¯
      </Text>
      <Group p="md">
        {user?.awards.map((award) => (
          <Paper radius="md" p="sm" shadow="lg" withBorder>
            <Center>
              <Image src={award.icon_url} width={130} />
            </Center>
            <Text weight={500}>{award.name}</Text>
          </Paper>
        ))}
      </Group>
    </>
  );
};

export default Awards;
