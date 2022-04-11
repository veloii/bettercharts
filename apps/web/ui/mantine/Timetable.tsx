import React from "react";
import { Table, ScrollArea, Text } from "@mantine/core";
import { LessonsResponse } from "classcharts-api/dist/types";
import dayjs from "dayjs";

interface TableSelectionProps {
  data: LessonsResponse;
}

export function Timetable({ data }: TableSelectionProps) {
  const rows = data.map((item) => {
    return (
      <tr key={item.key}>
        <td>
          <Text size="sm" weight={500}>
            {item.subject_name}
          </Text>
        </td>
        <td>{item.lesson_name}</td>
        <td>{item?.teacher_name}</td>
        <td>{item.room_name}</td>
        <td>
          {dayjs(item.start_time).format("HH:mm")}
          {" - "}
          {dayjs(item.end_time).format("HH:mm")}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 600 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Class</th>
            <th>Teacher</th>
            <th>Room</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
