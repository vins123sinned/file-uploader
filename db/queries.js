import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  // use findFirst instead of findUnique for case-insensitive search
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });
  console.log(user);

  return user;
};

const insertUser = async (email, password) => {
  // add bcrypt soon!
  await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });

  return;
};

export { getUserByEmail, insertUser };
