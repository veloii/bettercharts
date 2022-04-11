import { Doughnut } from "react-chartjs-2";
import { BehaviourResponse } from "classcharts-api/dist/types";
import { useState, useEffect } from "react";
import { useColorScheme } from "@mantine/hooks";
import {
  Box,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

const calculatePositivePointsPercentage = (
  positive: number,
  negative: number
) => {
  const total = positive + negative;

  return Math.round((positive / total) * 10000) / 100 + "%";
};

const PieChartBehaviour = (props: {
  behaviour: BehaviourResponse | undefined | null;
}) => {
  const [pieChartData, setPieChartData] = useState<any>();
  const { behaviour } = props;
  const [pointsPercentage, setPointsPercentage] = useState<string>("");
  const mode = useMantineTheme();

  useEffect(() => {
    let pos = [];
    let neg = [];

    for (const key in behaviour?.positive_reasons) {
      const getBackgroundColor = (val: number) => {
        if (val < 3) return "#86EFAC";
        else if (val >= 3) return "#4ADE80";
        else if (val > 10) return "#22C55E";
        else if (val > 15) return "#15803D";
      };

      const val = behaviour?.positive_reasons[key];

      pos.push({
        label: key,
        value: val,
        backgroundColor: getBackgroundColor(val || 0),
        type: "positive",
      });
    }

    for (const key in behaviour?.negative_reasons) {
      const getBackgroundColor = (val: number) => {
        if (val < 3) return "#ef8686";
        else if (val >= 3) return "#de4a4a";
        else if (val > 10) return "#c42121";
        else if (val > 15) return "#7f1515";
      };

      const val = behaviour?.negative_reasons[key];

      neg.push({
        label: key,
        value: val,
        backgroundColor: getBackgroundColor(val || 0),
        type: "negative",
      });
    }

    let labels = [
      ...pos.map((pos) => pos.label),
      ...neg.map((neg) => neg.label),
    ];

    let negData = [...pos.map(() => 0), ...neg.map((neg) => neg.value)];
    let posData = [...pos.map((pos) => pos.value), ...neg.map(() => 0)];

    let negColors = [
      ...pos.map(() => 0),
      ...neg.map((neg) => neg.backgroundColor),
    ];
    let posColors = [
      ...pos.map((pos) => pos.backgroundColor),
      ...neg.map(() => 0),
    ];

    let posDataSet = {
      label: "Positive",
      data: posData,
      backgroundColor: posColors,
    };

    let negDataSet = {
      label: "Neagtive",
      data: negData,
      backgroundColor: negColors,
    };

    const reducer = (accumulator: any, curr: any) => accumulator + curr;

    const positivePointsArray = pos.map((reason) => reason.value);

    const negativePointsArray = neg.map((reason) => reason.value);

    const negativePoints =
      negativePointsArray.length > 0 ? negativePointsArray.reduce(reducer) : 0;

    const positivePoints =
      positivePointsArray.length > 0 ? positivePointsArray.reduce(reducer) : 0;

    const percentage = calculatePositivePointsPercentage(
      positivePoints || 0,
      negativePoints || 0
    );

    setPointsPercentage(percentage);

    setPieChartData({
      labels,
      datasets: [{ ...posDataSet }, { ...negDataSet }],
    });
  }, [behaviour]);

  return (
    <div
      style={{
        height: "266px",
        width: "300px",
      }}
    >
      {pieChartData && (
        <>
          <div
            style={{
              zIndex: 9999,
            }}
          >
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

                backgroundColor:
                  mode.colorScheme === "dark" ? "#111827" : "#fff",
                color: mode.colorScheme === "dark" ? "#111827" : "#fff",
                borderColor: mode.colorScheme === "dark" ? "#111827" : "#fff",
              }}
              data={pieChartData}
            />
          </div>
          <Text
            sx={(theme) => ({
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: 32,
              paddingBottom: 32,
              position: "relative",
              borderRadius: 9999,
              marginTop: -210,
              width: 150,
              zIndex: 1,
            })}
            align="center"
          >
            {pointsPercentage} Positive
          </Text>
        </>
      )}
    </div>
  );
};

export default PieChartBehaviour;
