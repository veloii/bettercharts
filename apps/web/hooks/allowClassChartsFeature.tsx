import { UserContext } from "context/ClassChartsContext";
import { useContext } from "react";
import ClassCharts, { ClassChartsFeature } from "types/ClassCharts";

const allowClassChartsFeature = (
  user: ClassCharts,
  showAllFeatures?: boolean,
  feature?: ClassChartsFeature
) => {
  if (feature) {
    switch (feature) {
      case "behaviour":
        return user?.student.display_behaviour;
      case "homework":
        return user?.student.display_homework;
      case "detentions":
        return user?.student.display_detentions;
      case "announcements":
        return user?.student.display_announcements;
      case "timetable":
        return user?.student.display_timetable;
      case "awards":
        return user?.student.display_event_badges;
      default:
        break;
    }
  }

  if (showAllFeatures) {
    return [
      { name: "Behaviour", value: user?.student.display_behaviour },
      { name: "Homework", value: user?.student.display_homework },
      { name: "Detentions", value: user?.student.display_detentions },
      { name: "Announcements", value: user?.student.display_announcements },
      { name: "Timetable", value: user?.student.display_timetable },
      { name: "Awards", value: user?.student.display_event_badges },
    ];
  }

  let allowedFeatures: string[] = [];

  if (user?.student.display_behaviour) allowedFeatures.push("Behaviour");
  if (user?.student.display_homework) allowedFeatures.push("Homework");
  if (user?.student.display_detentions) allowedFeatures.push("Detentions");
  if (user?.student.display_announcements)
    allowedFeatures.push("Announcements");
  if (user?.student.display_timetable) allowedFeatures.push("Timetable");
  if (user?.student.display_event_badges) allowedFeatures.push("Awards");

  return allowedFeatures;
};

export default allowClassChartsFeature;
