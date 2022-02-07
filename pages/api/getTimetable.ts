import type { NextApiRequest, NextApiResponse } from "next";
import { ClasschartsClient } from "classcharts-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { date } = req.query;

  const client = new ClasschartsClient(
    process.env.TESTING_CLASSCHARTS_CODE!,
    process.env.TESTING_BIRTHDAY
  );
  await client.login();

  if (date) {
    const lessons = await client.getLessons({
      date: date.toString(),
    });

    return res.status(200).json(lessons);
  } else {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const lessons = await client.getLessons({
      date,
    });

    return res.status(200).json(lessons);
  }
};
