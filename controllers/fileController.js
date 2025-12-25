import { decode } from "base64-arraybuffer";
import { fileDb } from "../db/File.js";

const getAllFiles = async (req, res) => {
  const files = await fileDb.getAllFiles();

  res.render("list", {
    subject: "files",
    items: files,
  });
};

const getFile = async (req, res) => {
  const { fileId } = req.params;
  const file = await fileDb.getFile(fileId);

  res.render("fileDetail", {
    file: file,
  });
};

// upload all files to multer, returning the ids of the files
const postUploadFiles = async (req, res, next) => {
  console.log(req.files);
  /*
  const data = await Promise.all(
    Array.from(images).map(async (image) => {
      console.log(image);
      // decodes base64 string to ArrayBuffer for supabase .upload()
      const fileBase64 = decode(image.buffer.toString("base64"));
      const filename = crypto.randomUUID();

      try {
        const { data, error } = await supabase.storage
          .from("image")
          .upload(filename, fileBase64, {
            contentType: image.mimetype,
          });

        if (error) throw error;

        // return url
        const { data: uploadedImage } = supabase.storage
          .from("image")
          .getPublicUrl(filename);

        const insertedFile = await fileDb.insertFile(
          image.size,
          uploadedImage.publicUrl,
        );

        return { id: insertedFile.id, url: uploadedImage.publicUrl };
      } catch (err) {
        next(err);
      }
    }),
  );

  return data;
  */
  res.json("a");
};
/*
const postUploadFiles = async (files) => {
  const data = await Promise.all(
    files.map(async (file) => {
      // decodes base64 string to ArrayBuffer for supabase .upload()
      const fileBase64 = decode(file.buffer.toString("base64"));
      const filename = crypto.randomUUID();

      try {
        const { data, error } = await supabase.storage
          .from("image")
          .upload(filename, fileBase64, {
            contentType: file.mimetype,
          });

        if (error) throw error;

        // return url
        const { data: image } = supabase.storage
          .from("image")
          .getPublicUrl(filename);

        const insertedFile = await fileDb.insertFile(
          file.size,
          image.publicUrl,
        );

        return { id: insertedFile.id, url: image.publicUrl };
      } catch (err) {
        throw new Error(err);
      }
    }),
  );

  return data;
};
*/

const postDeleteFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    await fileDb.deleteFile(fileId);
    res.redirect("/files");
  } catch (err) {
    return next(err);
  }
};

export { getAllFiles, getFile, postUploadFiles, postDeleteFile };
