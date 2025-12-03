import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Folder {
  async getAllFolders() {
    const folders = await prisma.folder.findMany();

    return folders;
  }

  async getFolder(folderId) {
    const folder = await prisma.folder.findUnique({
      where: {
        id: Number(folderId),
      },
    });

    return folder;
  }

  async insertFolder(name) {
    // later on double check if files really are related!
    await prisma.folder.create({
      data: {
        name: name,
      },
    });
  }

  async updateFolder(folderId, name) {
    await prisma.folder.update({
      where: {
        id: Number(folderId),
      },
      data: {
        name: name,
      },
    });
  }
}

export const folderDb = new Folder();
