import { Icon, School, User } from "tabler-icons-react";
import ClassCharts from "types/ClassCharts";

type Feature = {
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  icon: Icon;
  links?: {
    label: string;
    link: string;
  }[];
};

const getSidebarFeatures = (user: ClassCharts) => {
  let student: Feature = {
    label: "Student",
    icon: User,
    initiallyOpened: true,
    links: [],
  };

  let school: Feature = {
    label: "School",
    icon: School,
    links: [],
  };

  if (user.activity && user.behaviour)
    student.links?.push({ label: "Behaviour", link: "/behaviour" });
  if (user.awards) student.links?.push({ label: "Awards", link: "/awards" });
  if (user.homework)
    student.links?.push({ label: "Homework", link: "/homework" });
  if (user.detentions)
    student.links?.push({ label: "Detentions", link: "/detentions" });

  if (user.announcements)
    school.links?.push({ label: "Announcements", link: "/announcements" });
  if (user.lessons)
    school.links?.push({ label: "Timetable", link: "/timetable" });

  return { school, student };
};

export default getSidebarFeatures;
