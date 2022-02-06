import {
  Student,
  BehaviourResponse,
  ActivityResponse,
  HomeworksResponse,
  DetentionsResponse,
} from "classcharts-api/dist/types";

export default interface ClassCharts {
  student: Student;
  homework: HomeworksResponse;
  behaviour: BehaviourResponse;
  activity: ActivityResponse;
  detentions: DetentionsResponse;
}
