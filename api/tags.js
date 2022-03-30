const express = require("express");
//const client = require("pg/lib/native/client");
const tagsRouter = express.Router();
const { getPostsByTagName, getAllTags } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  // const { post } = req.body;
  const tagPost = {};

  try {
    const post = await getPostsByTagName(tagName);

    tagPost.post = post;

    res.send(tagPost);

    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;

//curl http://localhost:3000/api/tags/%23happy/posts

// read the tagname from the params
