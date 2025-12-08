import { prisma } from "./clients.js";

class File {
  async getAllFiles() {
    const files = await prisma.file.findMany();

    return files;
  }

  async getFile(fileId) {
    const file = await prisma.file.findUnique({
      where: {
        id: Number(fileId),
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

  async deleteFile(fileId) {
    await prisma.file.delete({
      where: {
        id: Number(fileId),
      },
    });
  }
}

export const fileDb = new File();
