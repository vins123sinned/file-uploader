import path from "node:path";
import * as fs from "node:fs/promises";
import mime from "mime/lite";
import { prisma } from "./clients.js";
import { supabase } from "./clients.js";
import { decode } from "base64-arraybuffer";

async function getImage(imageName) {
  try {
    const imagePath = path.join(
      import.meta.dirname,
      `/populatedbImages/${imageName}`,
    );
    const imageData = await fs.readFile(imagePath);
    return imageData;
  } catch (err) {
    console.error(err);
  }
}

async function insertFolder(name) {
  const folder = await prisma.folder.create({
    data: {
      name: name,
    },
  });

  return folder;
}

async function insertPost(name, fileIds, folderId) {
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

async function insertFile(size, url, filename) {
  const file = await prisma.file.create({
    data: {
      size: size,
      url: url,
      name: filename,
    },
  });

  return file;
}

async function uploadFiles(imagesArray) {
  const links = await Promise.all(
    imagesArray.map(async (imageName) => {
      const imageData = await getImage(imageName);
      // decodes base64 string to ArrayBuffer for supabase .upload()
      const fileBase64 = decode(imageData.toString("base64"));
      const filename = crypto.randomUUID();

      try {
        const { data, error } = await supabase.storage
          .from("image")
          .upload(filename, fileBase64, {
            contentType: mime.getType(imageName),
          });

        if (error) throw new Error("Error with uploading an image");

        // return url
        const { data: image } = supabase.storage
          .from("image")
          .getPublicUrl(filename);

        const insertedFile = await insertFile(
          Buffer.byteLength(imageData),
          image.publicUrl,
          filename,
        );

        return { id: insertedFile.id };
      } catch (err) {
        throw new Error(err);
      }
    }),
  );

  return links;
}

async function main() {
  const folders = [
    "Fast Food 🍔",
    "Fine Dining 🍽️",
    "Street Food 🌮",
    "What the... 😳",
  ];
  const folderIds = [];

  console.log("seeding...");
  await Promise.all(
    folders.map(async (name) => {
      try {
        const folder = await insertFolder(name);
        folderIds.push({
          key: name,
          value: folder.id,
        });
      } catch (err) {
        console.error(err);
      }
    }),
  );

  const posts = [
    {
      name: "Bojangles",
      files: ["bojangles1.png", "bojangles2.jpeg", "bojangles3.jpeg"],
      folderId: folderIds.find((folder) => folder.key === "Fast Food 🍔").value,
    },
    {
      name: "McDonald's",
      files: ["mcdonalds1.jpg", "mcdonalds2.jpeg", "mcdonalds3.jpeg"],
      folderId: folderIds.find((folder) => folder.key === "Fast Food 🍔").value,
    },
    {
      name: "Eleven Madison Park",
      files: ["emp1.jpeg", "emp2.jpeg", "emp3.jpg", "emp4.jpg"],
      folderId: folderIds.find((folder) => folder.key === "Fine Dining 🍽️")
        .value,
    },
    {
      name: "Noma",
      files: ["noma1.jpg", "noma2.jpg", "noma3.jpg", "noma4.jpg", "noma5.jpg"],
      folderId: folderIds.find((folder) => folder.key === "Fine Dining 🍽️")
        .value,
    },
    {
      name: "Doner Kebab",
      files: ["doner1.jpg", "doner2.jpg", "doner3.jpg"],
      folderId: folderIds.find((folder) => folder.key === "Street Food 🌮")
        .value,
    },
    {
      name: "Fuzhou Comfort Food",
      files: ["fcf1.jpg", "fcf2.jpeg", "fcf3.jpeg"],
      folderId: folderIds.find((folder) => folder.key === "Street Food 🌮")
        .value,
    },
    {
      name: "Street Tacos",
      files: ["tacos1.jpg", "tacos2.jpg"],
      folderId: folderIds.find((folder) => folder.key === "Street Food 🌮")
        .value,
    },
    {
      name: "Heisenberg's Goods",
      files: ["walt1.jpeg", "walt2.jpeg"],
      folderId: folderIds.find((folder) => folder.key === "What the... 😳")
        .value,
    },
  ];
  await Promise.all(
    posts.map(async (post) => {
      try {
        const fileIds = await uploadFiles(post.files);

        insertPost(post.name, fileIds, post.folderId);
      } catch (err) {
        console.error(err);
      }
    }),
  );

  console.log("Done!");
}

main();
