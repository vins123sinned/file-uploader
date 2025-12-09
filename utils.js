import { supabase } from "./db/clients.js";
import { decode } from "base64-arraybuffer";

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

// upload all files to multer, returning the url strings
const uploadFiles = async (files, next) => {
  await Promise.all(
    files.map(async (file) => {
      // decodes base64 string to ArrayBuffer
      const fileBase64 = decode(file.buffer.toString("base64"));

      // upload file to supabase
      try {
        const { data, error } = await supabase.storage
          .from("image")
          .upload(file.originalname, fileBase64, {
            contentType: file.mimetype,
          });

        // moves to catch block
        if (error) throw error;
      } catch (err) {
        // quit this code and jump straight to error handling
        throw new Error(err);
      }
    }),
  );
};

export { requiredErr, lengthErr, checkUser, uploadFiles };
