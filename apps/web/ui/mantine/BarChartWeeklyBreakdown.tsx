import { Text, useMantineTheme } from "@mantine/core";
import { BehaviourResponse } from "classcharts-api/dist/types";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BarChartWeeklyBreakdown = (props: { behaviour: BehaviourResponse }) => {
  const [barChartData, setBarChartData] = useState<any>();
  const theme = useMantineTheme();

  useEffect(() => {
    let labels: string[] = [];
    let positiveData: number[] = [];
    let negativeData: number[] = [];
    let positiveBackgroundColors: string[] = [];
    let negativeBackgroundColors: string[] = [];

    props.behaviour.timeline?.forEach((element) => {
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
  }, [props.behaviour]);

  return barChartData ? (
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
              display: false,
              position: "bottom",
              text: "",
            },
          },
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[5] : "#f3f4f6",
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[5] : "#f3f4f6",
          borderColor:
            theme.colorScheme === "dark" ? theme.colors.dark[5] : "#f3f4f6",
          scales: {
            xAxes: {
              stacked: true,
              grid: {
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : "#f3f4f6",
              },
            },
            yAxes: {
              stacked: true,
              grid: {
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : "#f3f4f6",
              },
            },
          },
        }}
        data={barChartData}
      />
      <Text pt="sm" weight={500} align="center">
        Weekly Breakdown
      </Text>
    </>
  ) : (
    <div></div>
  );
};

export default BarChartWeeklyBreakdown;
