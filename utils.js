import { supabase } from "./db/clients.js";
import { decode } from "base64-arraybuffer";
import { fileDb } from "./db/File.js";
import { postDb } from "./db/Post.js";

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

        return { id: insertedFile.id };
      } catch (err) {
        throw new Error(err);
      }
    }),
  );

  return links;
};

const deleteAllFiles = async (postId) => {
  const post = await postDb.getPost(postId);
  const files = post.files;

  const filePaths = await Promise.all(
    files.map(async (file) => {
      try {
        await fileDb.deleteFile(file.id);
        return file.name;
      } catch (err) {
        throw new Error(err);
      }
    }),
  );

  const { data, error } = await supabase.storage
    .from("image")
    .remove(filePaths);

  if (error) throw error;

  console.log(files);
};

export { requiredErr, lengthErr, checkUser, uploadFiles, deleteAllFiles };
