const express = require("express");
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
} = require("firebase/firestore");

const app = express();
const port = 3000;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "exercise-five-b8690.firebaseapp.com",
  projectId: "exercise-five-b8690",
  storageBucket: "exercise-five-b8690.firebasestorage.app",
  messagingSenderId: "236039710690",
  appId: "1:236039710690:web:7373bf22a20e8ed293fbbb",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.use(express.json());

const indexRoute = require("./routes/index.js");
const createPostRoute = require("./routes/createPost.js");
const singlePostRoute = require("./routes/singlePost.js");

app.use("/", indexRoute);
app.use("/create", createPostRoute);
app.use("/post", singlePostRoute);

app.listen(port, () => {
  console.log(`Exercise Five app listening on port ${port}`);
});
