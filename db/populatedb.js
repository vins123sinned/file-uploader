import { prisma } from "./clients.js";
import { supabase } from "./clients.js";

async function insertFolder(name) {
  const folder = await prisma.folder.create({
    data: {
      name: name,
    },
  });

  return folder;
}

async function insertPost(name, files, folderId) {
  const fileIds = await uploadImages(files);
  // add files
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

async function uploadImages(imagesArray) {
  const links = await Promise.all(
    imagesArray.map(async (imagePath) => {
      console.log(imagePath);
      const filename = crypto.randomUUID();

      try {
        const { data, error } = await supabase.storage
          .from("image")
          .upload(filename, imagePath);

        if (error) throw new Error("Error with uploading an image");

        // return url
        const { data: image } = supabase.storage
          .from("image")
          .getPublicUrl(filename);

        const insertedFile = await fileDb.insertFile(
          file.size,
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
  /*
  await Promise.all(
    folders.map(async (name) => {
      const folder = await insertFolder(name);
      folderIds.push({
        key: name,
        value: folder.id,
      });
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
      files: ["walt1.jpg", "walt2.jpg"],
      folderId: folderIds.find((folder) => folder.key === "What the... 😳")
        .value,
    },
  ];
  await Promise.all(posts.map((post) => {
    insertPost
  }));
  */

  console.log(URL.createObjectURL);
  //await uploadImages(["./populateddbImages/bojangles1.png"]);
  console.log(folders);
}

main();
