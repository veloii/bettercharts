import type { ClasschartsClient } from "classcharts-api";

const getHomework = async (
  client: ClasschartsClient,
  dateStart?: string,
  dateEnd?: string
) => {
  try {
    if (dateStart && dateEnd) {
      return await client.listHomeworks({
        fromDate: dateStart,
        toDate: dateEnd,
      });
    } else {
      return await client.listHomeworks();
    }
  } catch {
    return null;
  }
};

export default getHomework;
