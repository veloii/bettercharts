import { Box, Group, List, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { ActivityPoint, ActivityResponse } from "classcharts-api/dist/types";
import { CircleCheck, CircleDashed, X } from "tabler-icons-react";
import parseTwitterDate from "lib/parseTwitterDate";

const formatContent = (item: ActivityPoint) => {
  let result: string = "awarded";

  if (item.teacher_name) {
    result += " by " + item.teacher_name;
  }
  if (item.lesson_name) {
    result += " in " + item.lesson_name;
  }

  return result;
};

const Timeline = (props: { timeline: ActivityResponse | undefined | null }) => {
  if (!props.timeline) return <div></div>;

  return (
    <List spacing="md" size="sm" center>
      {props.timeline?.map((timeline) => (
        <List.Item
          key={timeline.id}
          icon={
            timeline.polarity === "negative" ? (
              <Tooltip
                label={`${timeline.score} Negative${
                  timeline.score === 1 ? "" : "s"
                }`}
              >
                <ThemeIcon color="red" size={30} radius="xl">
                  <X size={20} />
                </ThemeIcon>
              </Tooltip>
            ) : (
              <Tooltip
                label={`${timeline.score} Positive${
                  timeline.score === 1 ? "" : "s"
                }`}
              >
                <ThemeIcon color="teal" size={32} radius="xl">
                  <CircleCheck size={22} />
                </ThemeIcon>
              </Tooltip>
            )
          }
        >
          <Group position="apart">
            <Group spacing={5}>
              <Text color="dimmed" size="sm">
                {timeline.reason}
              </Text>
              <Text weight={600} size="sm">
                {formatContent(timeline)}
              </Text>
            </Group>
            <Text color="dimmed" size="xs" align="right">
              {parseTwitterDate(timeline?.timestamp?.replace(" ", "T") + "Z")}
            </Text>
          </Group>
        </List.Item>
      ))}
    </List>
  );
};

export default Timeline;
