import ReactDOM, { unmountComponentAtNode } from "react-dom";
import React from "react";
import HomeworkModal from "../ui/HomeworkModal";
import { UserContextType } from "../context/ClassChartsContext";
import { Homework } from "types/ClassCharts";

const openHomeworkModal = (
  userContext: UserContextType,
  homework: Homework,
  status: "late" | "submitted" | "fail" | "completed" | "todo"
) => {
  const next = document.querySelector("#__next");
  const container = document.createElement("div");
  next?.appendChild(container);

  ReactDOM.render(
    <HomeworkModal
      homework={homework}
      userContext={userContext}
      open={true}
      status={status}
    />,
    container
  );
};

export default openHomeworkModal;
