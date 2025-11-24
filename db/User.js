import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class User {
  async getUserById(id) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    return user;
  }

  async getUserByEmail(email) {
    // use findFirst instead of findUnique for case-insensitive search
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    return user;
  }

  async insertUser(email, password) {
    // add bcrypt soon!
    await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });

    return;
  }
}

export const userDb = new User();
