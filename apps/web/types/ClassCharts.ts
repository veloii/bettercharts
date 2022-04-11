import {
  Student,
  BehaviourResponse,
  ActivityResponse,
  HomeworksResponse,
  DetentionsResponse,
  AnnouncementsResponse,
  LessonsResponse,
  BadgesResponse,
} from "classcharts-api/dist/types";

export default interface ClassCharts {
  student: Student;
  homework: HomeworksResponse;
  behaviour: BehaviourResponse;
  activity: ActivityResponse;
  detentions: DetentionsResponse;
  announcements: AnnouncementsResponse;
  lessons: LessonsResponse;
  awards: BadgesResponse;
  allTimeBehaviour: BehaviourResponse;
  fake?: boolean;
}

export type ClassChartsFeature =
  | "behaviour"
  | "homework"
  | "detentions"
  | "announcements"
  | "timetable"
  | "awards";
