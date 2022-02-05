import type { NextApiRequest, NextApiResponse } from "next";
import { ClasschartsClient } from "@/classcharts/index";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { startDate, endDate } = req.query;

  if (startDate && endDate) {
    const client = new ClasschartsClient(process.env.TESTING_CLASSCHARTS_CODE!, process.env.TESTING_BIRTHDAY);
    await client.init();

    const homeworkInfo = await client.listHomeworks({
      displayDate: 'due_date',
      fromDate: startDate.toString(),
      toDate: endDate.toString(),
    });

    return res.status(200).json(homeworkInfo);
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
};
