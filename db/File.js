import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class File {
  async getAllFiles() {
    const files = await prisma.file.findMany();

    return files;
  }

  async getFile(fileId) {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    return file;
  }

  async insertFile(name) {
    await prisma.file.create({
      data: {
        name: name,
        size: 0, // ADD THIS WHEN SUPABASE IS IMPLEMENTED!
      },
    });
  }
}

export const fileDb = new File();
