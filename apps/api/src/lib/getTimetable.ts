import type { ClasschartsClient } from "classcharts-api";

const getTimetable = async (client: ClasschartsClient, date?: string) => {
  try {
    if (date) {
      return await client.getLessons({
        date,
      });
    } else {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      return await client.getLessons({ date });
    }
  } catch {
    return null;
  }
};

export default getTimetable;
