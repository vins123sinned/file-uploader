import { prisma } from "./clients.js";

class Post {
  async getAllPosts() {
    const posts = await prisma.post.findMany();

    return posts;
  }

  async getPost(postId) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        files: true,
      },
    });

    return post;
  }

  async insertPost(name, fileIds, folderId) {
    await prisma.post.create({
      data: {
        name: name,
        files: {
          connect: fileIds,
        },
        folderId: folderId === "" ? null : Number(folderId),
      },
    });
  }

  async deletePost(postId) {
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
  }
}

export const postDb = new Post();
