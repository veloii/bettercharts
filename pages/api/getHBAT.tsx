import type { NextApiRequest, NextApiResponse } from "next";
import { ClasschartsClient } from "classcharts-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { startDate, endDate } = req.query;

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

  const lessons = await client.getLessons({
    date: date.toString(),
  });

  if (startDate && endDate) {
    const behaviourInfo = await client.getBehaviour({
      from: startDate.toString(),
      to: endDate.toString(),
    });

    const activityInfo = await client.getActivity({
      from: startDate.toString(),
      to: endDate.toString(),
    });

    const homeworkInfo = await client.listHomeworks({
      displayDate: "due_date",
      fromDate: startDate.toString(),
      toDate: endDate.toString(),
    });

    return res.status(200).json({
      behaviour: behaviourInfo,
      activity: activityInfo,
      homework: homeworkInfo,
      lessons,
    });
  } else {
    const behaviourInfo = await client.getBehaviour();
    const activityInfo = await client.getActivity();
    const homeworkInfo = await client.listHomeworks();

    return res.status(200).json({
      behaviour: behaviourInfo,
      activity: activityInfo,
      homework: homeworkInfo,
      lessons,
    });
  }
};
