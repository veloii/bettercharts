import type { NextApiRequest, NextApiResponse } from "next";
import { ClasschartsClient } from "@/classcharts/index";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new ClasschartsClient(
    process.env.TESTING_CLASSCHARTS_CODE!,
    process.env.TESTING_BIRTHDAY
  );
  await client.init();

  const studentInfo = await client.getStudentInfo();
  const homeworkInfo = await client.listHomeworks();
  const behaviourInfo = await client.getBehaviour();
  const activityInfo = await client.getActivity();
  const detentionInfo = await client.getDetentions();

  res.status(200).json({
    ...studentInfo,
    homework: [...homeworkInfo],
    behaviour: behaviourInfo,
    activity: activityInfo,
    detentions: detentionInfo,
  });
};
