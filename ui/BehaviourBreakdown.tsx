import { useEffect, useState } from "react";
import { BehaviourResponse } from "classcharts-api/dist/types";
import { Doughnut } from "react-chartjs-2";
import PieChartBreakdown from "./PieChartBreakdown";
import BarChartWeekly from "./BarChartWeeklyBreakdown";

const BehaviourBreakdown = (props: { behaviour: BehaviourResponse }) => {
  const { behaviour } = props;

  return (
    <div className="justify-between gap-5 pt-16 space-y-2 lg:flex lg:space-y-0">
      <div className="flex items-center justify-center p-5 px-10 bg-white shadow dark:bg-gray-900 sm:rounded-3xl">
        <PieChartBreakdown text="Behaviour Breakdown" behaviour={behaviour} />
      </div>
      <div className="flex items-center justify-center p-5 bg-white shadow dark:bg-gray-900 sm:rounded-3xl">
        <BarChartWeekly behaviour={behaviour} />
      </div>
    </div>
  );
};

export default BehaviourBreakdown;
