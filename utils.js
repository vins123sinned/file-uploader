import multer from "multer";
import { supabase } from "./db/clients.js";
import { fileDb } from "./db/File.js";
import { postDb } from "./db/Post.js";

// use a memory storage since the files will be stored to Supabase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// this could also be made another in fileRouter
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
};

export { upload, requiredErr, lengthErr, checkUser, deleteAllFiles };
