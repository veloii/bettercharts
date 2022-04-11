import {
  SimpleGrid,
  Group,
  Box,
  Stack,
  Title,
  Text,
  Grid,
  Center,
  MediaQuery,
} from "@mantine/core";
import { BehaviourResponse } from "classcharts-api/dist/types";
import { UserContext } from "context/ClassChartsContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import PieChartBehaviour from "./PieChartBehaviour";

const PieChartBehaviourCard = (props: {
  behaviour: BehaviourResponse | undefined | null;
}) => {
  const { user } = useContext(UserContext);
  const [points, setPoints] = useState<{
    positive: number;
    negative: number;
  }>({ positive: 0, negative: 0 });

  const behaviourThisWeek =
    user.behaviour.negative_reasons.length >= 1 &&
    user.behaviour.positive_reasons.length >= 1;

  useEffect(() => {
    let pos: number = 0;
    let neg: number = 0;
    for (const key in props?.behaviour?.negative_reasons) {
      const shallow = { ...points };
      neg += props.behaviour!.negative_reasons[key];
    }
    for (const key in props?.behaviour?.positive_reasons) {
      const shallow = { ...points };
      pos += props.behaviour!.positive_reasons[key];
    }

    setPoints({ positive: pos, negative: neg });
  }, [props.behaviour]);

  return behaviourThisWeek ? (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={(theme) => ({
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.md,
          width: 300,
        })}
      >
        <PieChartBehaviour behaviour={props.behaviour} />
      </Box>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[0],
          height: 298,
          width: "100%",
        })}
      >
        <Stack p="xl" spacing={2}>
          <Title order={2}>Current Points</Title>
          <Group position="apart">
            <Text size="sm">Positive</Text>
            <Text size="sm">Negative</Text>
          </Group>
          <Group position="apart">
            <Title>{points.positive}</Title>
            <Title>{points.negative}</Title>
          </Group>
        </Stack>
      </Box>
    </Box>
  ) : (
    <div></div>
  );
};

export default PieChartBehaviourCard;
