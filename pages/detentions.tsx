import { UserContext } from "context/ClassChartsContext";
import { useContext } from "react";
import Detention from "ui/Detention";
import { Detention as DetentionType } from "classcharts-api/dist/types";
import Container from "ui/Container";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const today = new Date();

export const convertDetentions = (detentions: Array<DetentionType>) =>
  detentions?.reverse().map((detention) => ({
    id: detention.id,
    dateFull:
      new Date(detention.date!).toLocaleDateString() + " " + detention.time,
    date: new Date(detention.date!).toDateString(),
    stage: capitalize(detention.attended),
    title: detention.lesson_pupil_behaviour!.reason,
    duration: detention.length + " minutes",
    location: detention.location!,
    lesson: detention.lesson?.name!,
    subject: detention.lesson?.subject?.name!,
    teacher:
      detention.teacher?.first_name &&
      detention.teacher?.first_name.substring(0, 1)! +
        " " +
        detention.teacher?.last_name,
  }));

export const detentionType = (
  detentions: Array<DetentionType>,
  requestedType: "future" | "today" | "past"
) =>
  detentions.filter((detention) => {
    const detentionDate = new Date(detention.date!);

    if (requestedType === "today")
      if (detentionDate.toISOString() === today.toISOString()) return true;
    if (requestedType === "past") if (detentionDate < today) return true;
    if (requestedType === "future") if (detentionDate > today) return true;
  });

const detentions = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <Container>
      <div className="py-5 h-full">
        {user?.detentions.length === 0 ? (
          <div className="flex justify-center items-center mt-16 bg-gray-800 p-10 rounded-3xl shadow dark:shadow-none">
            <div>
              <img className="w-96" src="/NoHomework.svg" />
              <h2 className="text-3xl text-center text-gray-200 font-semibold py-2">
                No Detentions
              </h2>
            </div>
          </div>
        ) : (
          <>
            <Detention
              title="Today"
              detentions={convertDetentions(
                detentionType(user.detentions, "today")
              )}
            />
            <Detention
              title="Future"
              detentions={convertDetentions(
                detentionType(user.detentions, "future")
              )}
            />
            <Detention
              title="Past"
              detentions={convertDetentions(
                detentionType(user.detentions, "past")
              )}
            />
          </>
        )}
      </div>
    </Container>
  ) : (
    <div className="m-0 p-0 w-screen h-screen absolute top-0 left-0 bg-white dark:bg-gray-900 flex justify-center items-center z-50">
      <div className="loading"></div>
    </div>
  );
};

export default detentions;
