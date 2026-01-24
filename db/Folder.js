import { prisma } from "./clients.js";

class Folder {
  async getAllFolders() {
    const folders = await prisma.folder.findMany({
      orderBy: [
        {
          date: "desc",
        },
      ],
      include: {
        posts: true,
        shares: true,
      },
    });

    return folders;
  }

  async getFoldersWithLimit(limit) {
    const folders = await prisma.folder.findMany({
      orderBy: [
        {
          date: "desc",
        },
      ],
      take: limit,
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
      include: {
        files: true,
      },
    });

    return posts;
  }

  async insertFolder(name) {
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
    await prisma.share.deleteMany({
      where: {
        folderId: {
          equals: Number(folderId),
        },
      },
    });

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
