import type { ClasschartsClient } from "classcharts-api";

const convertDate = (date: Date) =>
  date.getFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();

const getUser = async (client: ClasschartsClient) => {
  const studentInfo = await client.getStudentInfo();

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let user: any = {};

  user.student = studentInfo;

  if (studentInfo.display_homework)
    user.homework = await client.listHomeworks();
  if (studentInfo.display_behaviour) {
    user.behaviour = await client.getBehaviour();
    user.allTimeBehaviour = await client.getBehaviour({
      from: "2000-1-1",
      to: convertDate(new Date()),
    });
  }
  if (studentInfo.display_activity) user.activity = await client.getActivity();
  if (studentInfo.display_detentions)
    user.detentions = await client.getDetentions();
  if (studentInfo.display_announcements)
    user.announcements = await client.listAnnouncements();
  if (studentInfo.display_timetable)
    user.lessons = await client.getLessons({
      date,
    });
  if (studentInfo.display_event_badges) user.awards = await client.getBadges();

  return user;
};

export default getUser;
