import prisma from "./prisma";

const createDBEntry = async (studentId: string) => {
  return await prisma.student.create({
    data: {
      id: studentId,
    },
  });
};

const getUser = async (studentId: string) => {
  try {
    const userExists = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (userExists) return userExists;
    else return false;
  } catch {
    return false;
  }
};

const getDBUser = async (studentId: string) => {
  const user = await getUser(studentId);

  if (user === false) return await createDBEntry(studentId);
  else return user;
};

export default getDBUser;
