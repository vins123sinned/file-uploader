import { fileDb } from "../db/File.js";
import { supabase } from "../db/clients.js";

const downloadFile = async (req, res, next) => {
  const { filename } = req.params;

  try {
    const { data: blob, error } = await supabase.storage
      .from("image")
      .download(filename);

    if (error) throw Error("Error with downloading the image requested");

    // convert Blob to Buffer so Node.js can understand and use it
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.type(blob.type).send(buffer);
  } catch (err) {
    next(err);
  }
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

export { downloadFile, postDeleteFile };
