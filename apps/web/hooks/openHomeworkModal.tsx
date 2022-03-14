import ReactDOM, { unmountComponentAtNode } from "react-dom";
import React from "react";
import HomeworkModal from "../ui/HomeworkModal";
import { UserContextType } from "../context/ClassChartsContext";
import { Homework } from "classcharts-api/dist/types";
import { Socket } from "socket.io-client";

const openHomeworkModal = (
  userContext: UserContextType,
  socketContext: Socket,
  homework: Homework,
  status: "late" | "submitted" | "fail" | "completed" | "todo"
) => {
  const next = document.querySelector("#__next");
  const container = document.createElement("div");
  next?.appendChild(container);

  ReactDOM.render(
    <HomeworkModal
      socketContext={socketContext}
      homework={homework}
      userContext={userContext}
      open={true}
      status={status}
    />,
    container
  );
};

export default openHomeworkModal;
