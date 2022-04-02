import { Homework } from "classcharts-api/dist/types";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import HomeworkModal from "../ui/mantine/HomeworkModal";
import { UserContextType } from "context/ClassChartsContext";
import { SocketContextType } from "context/SocketIOContext";

export default (
  homework: Homework,
  modals: ModalsContextProps,
  userContext: UserContextType,
  socketContext: SocketContextType
) => {
  modals.openModal({
    centered: true,
    withCloseButton: false,
    children: (
      <HomeworkModal
        socketContext={socketContext}
        userContext={userContext}
        homework={homework}
      />
    ),
  });
};
