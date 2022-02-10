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

  if (startDate && endDate) {
    const behaviourInfo = await client.getBehaviour({
      from: startDate.toString(),
      to: endDate.toString(),
    });

    const activityInfo = await client.getActivity({
      from: startDate.toString(),
      to: endDate.toString(),
    });

    return res
      .status(200)
      .json({ behaviour: behaviourInfo, activity: activityInfo });
  } else {
    const behaviourInfo = await client.getBehaviour();

    const activityInfo = await client.getActivity();

    return res
      .status(200)
      .json({ behaviour: behaviourInfo, activity: activityInfo });
  }
};
