import { prisma, supabase } from "./clients.js";

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

  async insertFile(name, size, url) {
    const file = await prisma.file.create({
      data: {
        name: name,
        size: size,
        url: url,
      },
    });

    return file;
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
