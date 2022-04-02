import React from "react";
import { Table, ScrollArea, Text, ThemeIcon, Center } from "@mantine/core";
import {
  DetentionsResponse,
  HomeworksResponse,
} from "classcharts-api/dist/types";
import { useModals } from "@mantine/modals";
import { UserContext } from "context/ClassChartsContext";
import { SocketContext } from "context/SocketIOContext";
import { ArrowUp, Check, Clock, X, Icon } from "tabler-icons-react";

interface TableSelectionProps {
  data: DetentionsResponse;
}

const Icon = (props: { status: string }) => {
  let icon: { Element: Icon; color: string };

  if (props.status === "yes") icon = { Element: Check, color: "green" };
  else if (props.status === "no") icon = { Element: X, color: "red" };
  else if (props.status === "upscaled")
    icon = { Element: ArrowUp, color: "yellow" };
  else icon = { Element: Clock, color: "gray" };

  return (
    <ThemeIcon size="md" radius="md" color={icon.color}>
      <icon.Element
        style={{
          margin: 3,
        }}
      />
    </ThemeIcon>
  );
};

export function DetentionTable({ data }: TableSelectionProps) {
  const reversedDetentions = [...data].reverse();

  const rows = reversedDetentions.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <Center>
            <Icon status={item.attended} />
          </Center>
        </td>
        <td>
          <Text size="sm" weight={500}>
            {item.lesson_pupil_behaviour.reason}
          </Text>
        </td>
        <td>{item?.length} minutes</td>
        <td>{item?.location}</td>
        <td>{new Date(item.date!).toLocaleDateString() + " " + item.time}</td>
        <td>{item?.lesson?.subject?.name}</td>
        <td>{item?.lesson?.name}</td>
        <td>
          {item?.teacher?.title} {item?.teacher?.first_name?.slice(0, 1)}{" "}
          {item?.teacher?.last_name}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 900 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}></th>
            <th>Name</th>
            <th>Duration</th>
            <th>Location</th>
            <th>Time</th>
            <th>Subject</th>
            <th>Class</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
