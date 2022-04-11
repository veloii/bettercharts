import getDBCalendar from "./getDBCalendar";
import getDBUser from "./getDBUser";

const getCalendar = async (studentId: string) => {
  // this creates a user if it doesn't exist
  const user = await getDBUser(studentId);

  const calendar = await getDBCalendar(studentId);
  return calendar;
};

export default getCalendar;
