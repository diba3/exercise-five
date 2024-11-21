const express = require("express");
const { collection, addDoc } = require("firebase/firestore");
const db = require("../app.js").db;

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Create a new post here");
});

router.get("/submit", (req, res) => {
  const { title, postText, author } = req.query;

  if (!title || !postText || !author) {
    return res.send({ error: "Invalid Form Submission" });
  }

  const idFromTitle = title.replace(/\s+/g, "-").toLowerCase();

  const setBlogPost = firestore.setDoc(
    firestore.doc(db, "posts", idFromTitle),
    {
      title: title,
      text: postText,
      author: author,
    }
  );

  setBlogPost
    .then(() => {
      res.sendFile(path.join(__dirname, "../public", "success.html"));
    })
    .catch((error) => {
      res.send(`Error submitting: ${error.toString()}`);
    });
});

module.exports = router;
