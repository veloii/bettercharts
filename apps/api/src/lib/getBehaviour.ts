import type { ClasschartsClient } from "classcharts-api";

const getBehaviour = async (
  client: ClasschartsClient,
  dateStart?: string,
  dateEnd?: string
) => {
  try {
    if (dateStart && dateEnd) {
      return await client.getBehaviour({
        from: dateStart,
        to: dateEnd,
      });
    } else {
      return await client.getBehaviour();
    }
  } catch {
    return null;
  }
};

export default getBehaviour;
