import type { NextApiRequest, NextApiResponse } from "next";
import { ClasschartsClient } from "classcharts-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Bad Request" });

  const { homeworkId } = req.query;
  if (!homeworkId) return res.status(400).json({ message: "Bad Request" });

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

  await client.makeAuthedRequest(
    `https://www.classcharts.com/apiv2student/homeworkticked/${homeworkId}?pupil_id=${client.studentId}`,
    { method: "GET" }
  );

  return res.status(200).json({ message: "OK" });
};
