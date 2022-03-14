import {
  TemplateIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserIcon,
  SpeakerphoneIcon,
  ClockIcon,
  ExclamationIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import ClassCharts from "../types/ClassCharts";
import type { desktopNavigation as desktopNavigationType } from "../types/Theme";

const setupTheme = (user_: any) => {
  const user: ClassCharts = user_;
  const student = user.student;

  let desktopNavigation: desktopNavigationType[] = [
    {
      name: "Student",
      items: [],
    },
    {
      name: "School",
      items: [],
    },
  ];
  const studentIndex = desktopNavigation.findIndex(
    (nav) => nav.name === "Student"
  );
  const schoolIndex = desktopNavigation.findIndex(
    (nav) => nav.name === "School"
  );

  // Dashboard
  desktopNavigation[studentIndex].items.push({
    name: "Dashboard",
    description: "See everything for this week in one place at a glance.",
    href: "/overview",
    info: "View now",
    icon: TemplateIcon,
  });

  // Behaviour
  if (student.display_behaviour && student.display_activity) {
    desktopNavigation[studentIndex].items.push({
      name: "Behaviour",
      description: "View your behaviour in class with visual breakdowns.",
      href: "/behaviour",
      info: "View now",
      icon: ChartBarIcon,
    });
  }

  // Awards
  if (student.display_event_badges) {
    desktopNavigation[studentIndex].items.push({
      name: "Awards",
      description:
        "View your awards from reaching a certain amount of behaviour points.",
      href: "/awards",
      info: "View now",
      icon: UserIcon,
    });
  }

  // Announcements
  if (student.display_announcements) {
    desktopNavigation[schoolIndex].items.push({
      name: "Announcements",
      description: "See all the announcements the school have posted.",
      href: "/announcements",
      info: "View now",

      icon: SpeakerphoneIcon,
    });
  }

  // Timetable
  if (student.display_timetable) {
    desktopNavigation[schoolIndex].items.push({
      name: "Timetable",
      description: "See your school timetable for today.",
      href: "/timetable",
      info: "View now",

      icon: ClockIcon,
    });
  }

  // Homework
  if (student.display_homework) {
    desktopNavigation[studentIndex].items.push({
      name: "Homework",
      description: "View and complete the homework set for each class.",
      href: "/homework",
      info: "View now",
      icon: BookOpenIcon,
    });
  }

  // Detentions
  if (student.display_detentions) {
    desktopNavigation[studentIndex].items.push({
      name: "Detentions",
      description: "View and check if you have completed your detentions.",
      href: "/detentions",
      info: "View now",
      icon: ExclamationIcon,
    });
  }

  // Calendar
  desktopNavigation[studentIndex].items.push({
    name: "Calendar",
    description: "See when your homework is due and set events.",
    href: "/calendar",
    info: "View now",
    icon: CalendarIcon,
  });

  // Cleanup
  if (desktopNavigation[schoolIndex].items.length < 1)
    desktopNavigation = desktopNavigation.filter(
      (nav) => nav.name !== "School"
    );

  if (desktopNavigation[studentIndex].items.length < 1)
    desktopNavigation = desktopNavigation.filter(
      (nav) => nav.name !== "Student"
    );

  return { desktopNavigation };
};

export default setupTheme;
