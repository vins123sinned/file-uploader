import { prisma } from "./clients.js";

class Share {
  async getShare(folderName) {
    const share = await prisma.share.findUnique({
      where: {
        name: folderName,
      },
    });

    return share;
  }
  async insertShare(name, expired, folderId) {
    const share = await prisma.share.create({
      data: {
        name: name,
        expired: expired,
        folderId: Number(folderId),
      },
    });

    return share;
  }
}

export const shareDb = new Share();
