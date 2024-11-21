const express = require("express");
const { doc, getDoc } = require("firebase/firestore");
const db = require("../app.js").db;

const router = express.Router();
router.get("/", (request, response) => {
  response.send("Please include a post ID");
});

router.get("/all", (request, response) => {
  const postsQuery = firestore.getDocs(firestore.collection(db, "posts"));

  postsQuery
    .then((querySnapshot) => {
      if (!querySnapshot) {
        return response.send([]);
      }

      const posts = [];
      querySnapshot.forEach((post) => {
        const postData = post.data();
        posts.push(postData);
      });

      response.send(posts);
    })
    .catch((error) => {
      console.error(error);
      response.send(error);
    });
});

router.get("/:postId", (request, response) => {
  const postId = request.params.postId;

  const postQuery = firestore.getDoc(firestore.doc(db, "posts", postId));

  postQuery
    .then((docSnapshot) => {
      const post = docSnapshot.data();
      if (!post) {
        return response.send({});
      }
      response.send(post);
    })
    .catch((error) => {
      console.error(error);
      response.send(error);
    });
});

module.exports = router;
