const express = require("express");
const app = express();
const cors = require("cors");
const { getPost, addPost, deletePost, addLike } = require("./post");

const CsbInspector = require("Csb-Inspector");
CsbInspector();

require("dotenv").config({ path: "./.env_example" });

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  try {
    res.sendFile();
  } catch (error) {
    res.json({ message: "faltan recursos" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const getPosts = await getPost();
    
    res.json(getPosts);
  } catch (error) {
    console.log(error);
  }
});
app.get("/posts", async (req, res) => {
  try {
    const getPosts = await getPost();
    console.log(getPost);
    res.json(getPosts);
  } catch (error) {
    console.log(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const payload = req.body;
    await addPost(payload);
    res.send("Post creado");
  } catch (error) {
    console.log(error);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    console.log("put");
    const { id } = req.params;
    const resp = await addLike(id);
    console.log(resp);
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});


app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    res.json({ message: "Eliminaste post" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, console.log("SERVIDOR ENCENDIDO"));
