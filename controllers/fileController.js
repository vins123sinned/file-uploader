import { supabase } from "../db/clients.js";
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
  const data = await Promise.all(
    req.files.map(async (file) => {
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
        const { data: uploadedFile } = supabase.storage
          .from("image")
          .getPublicUrl(filename);

        const insertedFile = await fileDb.insertFile(
          file.size,
          uploadedFile.publicUrl,
        );

        return {
          name: filename,
          id: insertedFile.id,
          url: uploadedFile.publicUrl,
        };
      } catch (err) {
        next(err);
      }
    }),
  );

  res.json(data);
};

const postDeleteFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    await fileDb.deleteFile(fileId);
    res.redirect("/files");
  } catch (err) {
    return next(err);
  }
};

const postDeleteSupabaseFile = async (req, res, next) => {
  const { fileName } = req.params;

  try {
    const { data, error } = await supabase.storage
      .from("image")
      .remove([fileName]);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    return next(err);
  }
};

export {
  getAllFiles,
  getFile,
  postUploadFiles,
  postDeleteFile,
  postDeleteSupabaseFile,
};
