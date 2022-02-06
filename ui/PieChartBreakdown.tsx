import { Doughnut } from "react-chartjs-2";
import { BehaviourResponse } from "classcharts-api/dist/types";
import { useState, useEffect } from "react";

const PieChartPositive = (props: {
  behaviour: BehaviourResponse;
  text?: string;
}) => {
  const [pieChartData, setPieChartData] = useState<any>();
  const { behaviour } = props;
  const [pointsPercentage, setPointsPercentage] = useState<number>(0);

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
    let labels = [];
    let positiveData = [];
    let positiveBackgroundColors: string[] = [];
    let negativeData = [];
    let negativeBackgroundColors: string[] = [];
    let totalPositive = 0;
    let totalNegative = 0;

    for (const key in behaviour.positive_reasons) {
      const val = behaviour.positive_reasons[key];
      totalPositive += val;

      labels.push(key);
      positiveData.push(val);
      if (val < 1) positiveBackgroundColors.push("#86EFAC");
      else if (val < 3) positiveBackgroundColors.push("#4ADE80");
      else if (val < 10) positiveBackgroundColors.push("#22C55E");
      else if (val < 15) positiveBackgroundColors.push("#15803D");
    }

    for (const key in behaviour.negative_reasons) {
      const val = behaviour.negative_reasons[key];
      totalNegative += val;

      labels.push(key);
      negativeData.push(val);
      if (val < 1) negativeBackgroundColors.push("#ef8686");
      else if (val < 3) negativeBackgroundColors.push("#de4a4a");
      else if (val < 10) negativeBackgroundColors.push("#c42121");
      else if (val < 15) negativeBackgroundColors.push("#7f1515");
    }

    setPointsPercentage(Math.floor((totalNegative / totalPositive) * 100));

    setPieChartData({
      labels: labels,
      datasets: [
        {
          label: "",
          data: positiveData,
          backgroundColor: positiveBackgroundColors,
          hoverOffset: 4,
        },
        {
          label: "",
          data: negativeData,
          backgroundColor: negativeBackgroundColors,
          hoverOffset: 4,
        },
      ],
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
            className="flex justify-center items-start"
          >
            <div className="absolute dark:text-gray-400 font-medium xl:-mt-0 -mt-4">
              {props.text}
            </div>
          </div>
          <div
            style={{
              zIndex: "1",
            }}
            className="text-center -mt-60 text-sm text-gray-200 font-light bg-green-800 py-16 rounded-full relative w-36 mx-auto"
          >
            {100 - pointsPercentage}% Positive
          </div>
        </>
      )}
    </div>
  );
};

export default PieChartPositive;
