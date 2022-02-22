import type { NextApiRequest, NextApiResponse } from "next";
import { ClasschartsClient } from "classcharts-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!(req.cookies?.cc_access_code && req.cookies?.cc_date_of_birth))
    return res.status(401).json({ message: "Unauthorized" });

  const client = new ClasschartsClient(
    req.cookies?.cc_access_code,
    req.cookies?.cc_date_of_birth
  );

  try {
    await client.login();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const studentInfo = await client.getStudentInfo();

  let response: any = {};

  if (studentInfo.display_homework)
    response.homework = await client.listHomeworks();
  if (studentInfo.display_behaviour)
    response.behaviour = await client.getBehaviour();
  if (studentInfo.display_activity)
    response.activity = await client.getActivity();
  if (studentInfo.display_detentions)
    response.detentions = await client.getDetentions();
  if (studentInfo.display_announcements)
    response.announcements = await client.listAnnouncements();
  if (studentInfo.display_timetable)
    response.lessons = await client.getLessons({
      date,
    });
  if (studentInfo.display_event_badges)
    response.awards = await client.getBadges();

  res.status(200).json({
    student: studentInfo,
    ...response,
  });
};
