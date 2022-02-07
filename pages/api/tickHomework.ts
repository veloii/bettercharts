import type { NextApiRequest, NextApiResponse } from "next";
import { ClasschartsClient } from "classcharts-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Bad Request" });

  const { homeworkId } = req.query;
  if (!homeworkId) return res.status(400).json({ message: "Bad Request" });

  // TODO add a cookie check for the code

  const client = new ClasschartsClient(process.env.TESTING_CLASSCHARTS_CODE!, process.env.TESTING_BIRTHDAY);
  await client.login();

  await client.makeAuthedRequest(
    `https://www.classcharts.com/apiv2student/homeworkticked/${homeworkId}?pupil_id=${client.studentId}`,
    { method: "GET" }
  );

  return res.status(200).json({ message: "OK" });
};
