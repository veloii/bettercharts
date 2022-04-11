import React from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { ExternalLink } from "tabler-icons-react";
import { HomeworksResponse } from "classcharts-api/dist/types";
import convertHomework from "lib/convertHomework";
import { useModals } from "@mantine/modals";
import openHomeworkModal from "hooks/openHomeworkModal";
import { UserContext } from "context/ClassChartsContext";
import { SocketContext } from "context/SocketIOContext";

interface TableSelectionProps {
  data: HomeworksResponse | null | undefined;
}

export function HomeworkTable({ data }: TableSelectionProps) {
  const modals = useModals();

  const user = React.useContext(UserContext);
  const socket = React.useContext(SocketContext);

  const rows = data?.map((item) => {
    const homework = convertHomework(item);

    return (
      <tr key={item.id}>
        <td>
          <ActionIcon
            onClick={() => openHomeworkModal(item, modals, user, socket)}
            variant="light"
          >
            <ExternalLink style={{ padding: 5 }} />
          </ActionIcon>
        </td>
        <td>
          <Group spacing="sm">
            <ThemeIcon
              color={homework.icon.color}
              variant="light"
              size="sm"
              radius="xl"
            >
              <homework.icon.element style={{ padding: 2 }} />
            </ThemeIcon>
            <Text size="sm" weight={500}>
              {homework.name}
            </Text>
          </Group>
        </td>

        <td>{homework.teacher}</td>
        <td>{homework.class}</td>
        <td>{homework.dueIn}</td>
        <td>{homework.subject}</td>
        <td>{homework.type}</td>
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
            <th>Teacher</th>
            <th>Class</th>
            <th>Due In</th>
            <th>Subject</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
