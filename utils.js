import { supabase } from "./db/clients.js";
import { decode } from "base64-arraybuffer";
import { fileDb } from "./db/File.js";

const requiredErr = "is required";
const lengthErr = (minLength, maxLength) =>
  `must be between ${minLength} and ${maxLength} characters`;

// custom middleware to make sure the user is logged in
const checkUser = (req, res, next) => {
  if (!res.locals.currentUser) {
    return res.redirect("/login");
  } else {
    next();
  }
};

// upload all files to multer, returning the ids of the files
const uploadFiles = async (files) => {
  const links = await Promise.all(
    files.map(async (file) => {
      // decodes base64 string to ArrayBuffer for supabase .upload()
      const fileBase64 = decode(file.buffer.toString("base64"));

      try {
        const { data, error } = await supabase.storage
          .from("image")
          .upload(file.originalname, fileBase64, {
            contentType: file.mimetype,
          });

        if (error) throw error;

        // return url
        const { data: image } = supabase.storage
          .from("image")
          .getPublicUrl(file.originalname);

        const insertedFile = await fileDb.insertFile(
          file.originalname,
          file.size,
          image.publicUrl,
        );

        return { id: insertedFile.id };
      } catch (err) {
        throw new Error(err);
      }
    }),
  );

  return links;
};

const deleteAllFiles = async (fileIds) => {};

export { requiredErr, lengthErr, checkUser, uploadFiles };
