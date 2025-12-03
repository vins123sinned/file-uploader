import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Folder {
  async getAllFolders() {
    const folders = await prisma.folder.findMany();

    return folders;
  }

  async insertFolder(name) {
    // later on double check if files really are related!
    await prisma.folder.create({
      data: {
        name: name,
      },
    });
  }
}

export const folderDb = new Folder();
