import { Doughnut } from "react-chartjs-2";
import { BehaviourResponse } from "classcharts-api/dist/types";
import { useState, useEffect } from "react";

const calculatePositivePointsPercentage = (
  positive: number,
  negative: number
) => {
  const total = positive + negative;

  return Math.round((positive / total) * 10000) / 100 + "%";
};

const PieChartPositive = (props: {
  behaviour: BehaviourResponse;
  text?: string;
}) => {
  const [pieChartData, setPieChartData] = useState<any>();
  const { behaviour } = props;
  const [pointsPercentage, setPointsPercentage] = useState<string>("");

  const [mode, setMode] = useState<"light" | "dark" | undefined>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const modeMe = (e: any) => {
      setMode(e.matches ? "dark" : "light");
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", modeMe);
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeListener(modeMe);
  }, []);

  useEffect(() => {
    let reasons = [];

    for (const key in behaviour.positive_reasons) {
      const getBackgroundColor = (val: number) => {
        if (val < 3) return "#86EFAC";
        else if (val >= 3) return "#4ADE80";
        else if (val > 10) return "#22C55E";
        else if (val > 15) return "#15803D";
      };

      const val = behaviour.positive_reasons[key];

      reasons.push({
        label: key,
        value: val,
        backgroundColor: getBackgroundColor(val),
        type: "positive",
      });
    }

    for (const key in behaviour.negative_reasons) {
      const getBackgroundColor = (val: number) => {
        if (val < 3) return "#ef8686";
        else if (val >= 3) return "#de4a4a";
        else if (val > 10) return "#c42121";
        else if (val > 15) return "#7f1515";
      };

      const val = behaviour.negative_reasons[key];

      reasons.push({
        label: key,
        value: val,
        backgroundColor: getBackgroundColor(val),
        type: "negative",
      });
    }

    const positiveReasons = reasons.filter(
      (reason) => reason.type === "positive"
    );
    const negativeReasons = reasons.filter(
      (reason) => reason.type === "negative"
    );

    const labels = [
      ...positiveReasons.map((reason) => reason.label),
      ...negativeReasons.map((reason) => reason.label),
    ];

    const reducer = (accumulator: any, curr: any) => accumulator + curr;

    const positivePointsArray = positiveReasons.map((reason) => reason.value);

    const negativePointsArray = negativeReasons.map((reason) => reason.value);

    const negativePoints =
      negativePointsArray.length > 0 ? negativePointsArray.reduce(reducer) : 0;

    const positivePoints =
      positivePointsArray.length > 0 ? positivePointsArray.reduce(reducer) : 0;

    const percentage = calculatePositivePointsPercentage(
      positivePoints,
      negativePoints
    );

    setPointsPercentage(percentage);

    let datasets = [];

    if (positivePoints > 0) {
      datasets.push({
        data: positiveReasons.map((reason) => reason.value),
        backgroundColor: positiveReasons.map(
          (reason) => reason.backgroundColor
        ),
        hoverOffset: 8,
        order: 1,
      });
    }

    if (negativePoints > 0) {
      datasets.push({
        data: [
          ...positiveReasons.map(() => 0),
          negativeReasons.map((reason) => reason.value),
        ],
        backgroundColor: negativeReasons.map(
          (reason) => reason.backgroundColor
        ),
        hoverOffset: 8,
        order: 2,
      });
    }

    setPieChartData({
      labels: labels,
      datasets,
    });
  }, [behaviour]);

  return (
    <div
      style={{
        position: "relative",
        height: "300px",
        width: "300px",
      }}
      className="pie"
    >
      {pieChartData && (
        <>
          <Doughnut
            style={{
              zIndex: 2,
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  color: "#828996",
                  display: true,
                  position: "bottom",
                  text: "",
                },
              },
              backgroundColor: mode === "dark" ? "#111827" : "#fff",
              color: mode === "dark" ? "#111827" : "#fff",
              borderColor: mode === "dark" ? "#111827" : "#fff",
            }}
            data={pieChartData}
          />
          <div
            style={{
              zIndex: "1",
            }}
            className="flex items-start justify-center"
          >
            <div className="absolute -mt-4 font-medium dark:text-gray-400 xl:-mt-0">
              {props.text}
            </div>
          </div>
          <div
            style={{
              zIndex: "1",
            }}
            className="relative py-16 mx-auto text-sm font-light text-center text-gray-200 bg-green-800 rounded-full -mt-60 w-36"
          >
            {pointsPercentage} Positive
          </div>
        </>
      )}
    </div>
  );
};

export default PieChartPositive;
