import { useEffect, useState } from "react";
import { Behaviour } from "types/ClassCharts";
import { Doughnut } from "react-chartjs-2";
import PieChartBreakdown from "./PieChartBreakdown";
import BarChartWeekly from "./BarChartWeeklyBreakdown";

const BehaviourBreakdown = (props: { behaviour: Behaviour }) => {
  const { behaviour } = props;

  return (
    <div className="lg:flex pt-16 gap-5 space-y-2 lg:space-y-0 justify-between">
      <div className="p-5 px-10 bg-white dark:bg-gray-900 sm:rounded-3xl shadow flex justify-center items-center">
        <PieChartBreakdown behaviour={behaviour} />
      </div>
      <div className="p-5 bg-white dark:bg-gray-900 sm:rounded-3xl shadow flex justify-center items-center">
        <BarChartWeekly behaviour={behaviour} />
      </div>
    </div>
  );
};

export default BehaviourBreakdown;
