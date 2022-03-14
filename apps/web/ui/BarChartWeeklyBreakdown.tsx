import { Bar } from "react-chartjs-2";
import { BehaviourResponse } from "classcharts-api/dist/types";
import { useState, useEffect } from "react";

const BarChartWeekly = (props: { behaviour: BehaviourResponse }) => {
  const [barChartData, setBarChartData] = useState<any>();
  const { behaviour } = props;

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
    let labels: string[] = [];
    let positiveData: number[] = [];
    let negativeData: number[] = [];
    let positiveBackgroundColors: string[] = [];
    let negativeBackgroundColors: string[] = [];

    behaviour.timeline?.forEach((element) => {
      labels.push(element.name);

      negativeData.push(element.negative);
      if (element.negative < 1) negativeBackgroundColors.push("#ef8686");
      else if (element.negative < 3) negativeBackgroundColors.push("#de4a4a");
      else if (element.negative < 10) negativeBackgroundColors.push("#c42121");
      else if (element.negative < 15) negativeBackgroundColors.push("#7f1515");

      positiveData.push(element.positive);
      if (element.positive < 1) positiveBackgroundColors.push("#86EFAC");
      else if (element.positive < 3) positiveBackgroundColors.push("#4ADE80");
      else if (element.positive < 10) positiveBackgroundColors.push("#22C55E");
      else if (element.positive < 15) positiveBackgroundColors.push("#15803D");
    });

    setBarChartData({
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
      }}
      className="bg-white dark:bg-gray-900 lg:p-5 w-full lg:w-[500px] xl:w-[700px]"
    >
      {barChartData && (
        <>
          <Bar
            options={{
              responsive: true,
              resizeDelay: 1,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  position: "bottom",
                  text: "",
                },
              },
              backgroundColor: mode === "dark" ? "#111827" : "#f3f4f6",
              color: mode === "dark" ? "#111827" : "#f3f4f6",
              borderColor: mode === "dark" ? "#111827" : "#f3f4f6",
              scales: {
                xAxes: {
                  stacked: true,
                  grid: {
                    color: mode === "dark" ? "#1f2937" : "#f3f4f6",
                  },
                },
                yAxes: {
                  stacked: true,
                  grid: {
                    color: mode === "dark" ? "#1f2937" : "#f3f4f6",
                  },
                },
              },
            }}
            className="w-fit"
            data={barChartData}
          />
          <div
            style={{
              zIndex: "1",
            }}
            className="flex items-center justify-center"
          >
            <div className="absolute font-medium dark:text-gray-400">
              Weekly Behaviour Breakdown
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BarChartWeekly;
