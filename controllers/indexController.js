import { folderDb } from "../db/Folder.js";
import { postDb } from "../db/Post.js";

const getHomepage = async (req, res) => {
  const posts = await postDb.getPostsWithLimit(1);
  const folders = await folderDb.getFoldersWithLimit(3);

  res.render("layout", {
    title: "Alimenté",
    path: "partials/homepage.ejs",
    posts: posts,
    folders: folders,
  });
};

export { getHomepage };
