import { Button, Group, Stack, Text, Title, Checkbox } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { Homework } from "classcharts-api/dist/types";
import { UserContext, UserContextType } from "context/ClassChartsContext";
import { SocketContext, SocketContextType } from "context/SocketIOContext";
import convertHomework from "lib/convertHomework";
import { useContext } from "react";

const HomeworkModal = (props: {
  homework: Homework;
  userContext: UserContextType;
  socketContext: SocketContextType;
}) => {
  const modals = useModals();
  const item = convertHomework(props.homework);
  const { user, setUser } = props.userContext;
  const { socket } = props.socketContext;

  return (
    <div>
      <Stack>
        <Group spacing={10}>
          <Title order={3}>{props.homework.title}</Title>
          <item.icon.element color={item.icon.color} style={{ padding: 2 }} />
        </Group>
        <Group>
          <Stack spacing={0}>
            <Text size="xs" weight={700}>
              Teacher
            </Text>
            <Text size="sm">{item.teacher}</Text>
          </Stack>
          <Stack spacing={0}>
            <Text size="xs" weight={700}>
              Class
            </Text>
            <Text size="sm">{item.class}</Text>
          </Stack>
          <Stack spacing={0}>
            <Text size="xs" weight={700}>
              Subject
            </Text>
            <Text size="sm">{item.subject}</Text>
          </Stack>
        </Group>
        <Checkbox
          label="Completed?"
          checked={props.homework.status.ticked === "yes"}
          onChange={(click) => {
            try {
              let shallowCopy = { ...user! };

              shallowCopy.homework.find(
                (homework) => homework.id === props.homework.id
              )!.status.ticked =
                props.homework.status.ticked === "yes" ? "no" : "yes";

              socket?.emit("tickHomework", props.homework.status.id);

              setUser(shallowCopy);
            } catch {
              return;
            }
          }}
        />
        <Text
          size="sm"
          dangerouslySetInnerHTML={{ __html: props.homework.description_raw }}
        ></Text>

        <Group
          style={{
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {props.homework.validated_attachments.map((attachment) => (
            <a href={attachment.file}>
              <Button variant="outline">{attachment.file_name}</Button>
            </a>
          ))}
        </Group>
      </Stack>
      <Button
        fullWidth
        variant="light"
        onClick={() => modals.closeAll()}
        mt="md"
      >
        Back
      </Button>
    </div>
  );
};

export default HomeworkModal;
