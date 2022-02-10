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
  const homeworkInfo = await client.listHomeworks();
  const behaviourInfo = await client.getBehaviour();
  const activityInfo = await client.getActivity();
  const detentionInfo = await client.getDetentions();
  const announcementInfo = await client.listAnnouncements();
  const lessonsInfo = await client.getLessons({
    date,
  });

  res.status(200).json({
    student: studentInfo,
    homework: homeworkInfo,
    behaviour: behaviourInfo,
    activity: activityInfo,
    detentions: detentionInfo,
    announcements: announcementInfo,
    lessons: lessonsInfo,
  });
};
