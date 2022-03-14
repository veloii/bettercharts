import type { ClasschartsClient } from "classcharts-api";

const getActivity = async (
  client: ClasschartsClient,
  dateStart?: string,
  dateEnd?: string
) => {
  try {
    if (dateStart && dateEnd) {
      return await client.getActivity({
        from: dateStart,
        to: dateEnd,
      });
    } else {
      return await client.getActivity();
    }
  } catch {
    return null;
  }
};

export default getActivity;
