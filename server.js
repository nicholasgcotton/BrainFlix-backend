import express from "express";
import videos from "./routes/videosRoute.js";

const app = express();
const PORT = "8282";

app.use(express.json());
app.use(express.static("images"));

app.use("/videos", videos);

app.listen(PORT, () => {
  console.log(`BrainFlix-backend Listening on port: ${PORT}`);
});
