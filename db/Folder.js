import { prisma } from "./clients.js";

class Folder {
  async getAllFolders() {
    const folders = await prisma.folder.findMany({
      include: {
        posts: true,
        shares: true,
      },
    });

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

  async getAllPosts(folderId) {
    const posts = await prisma.post.findMany({
      where: {
        folderId: {
          equals: Number(folderId),
        },
      },
    });

    return posts;
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

  async deleteFolder(folderId) {
    await prisma.folder.delete({
      where: {
        id: Number(folderId),
      },
    });

    await prisma.post.updateMany({
      where: {
        folderId: {
          equals: Number(folderId),
        },
      },
      data: {
        folderId: null,
      },
    });
  }
}

export const folderDb = new Folder();
