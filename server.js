import express from "express";
import videos from "./routes/videosRoute.js";
import cors from "cors";

const app = express();
const PORT = "8282";

app.use(cors({ origin: "http://localhost:5555" }));
app.use(express.json());
app.use(express.static("static"));

app.use("/videos", videos);

app.listen(PORT, () => {
  console.log(`BrainFlix-backend Listening on port: ${PORT}`);
});

// ! For BandSite Sprint 3, add a .env file to each the client and server folders.
// *For the client, you just need to add the ‘API url’ and use it.
// *For the server add the PORT and use it.  You’ll need to install the dotenv package (npm install dotenv).
// !Remember to add .env to the gitignore files.  Include a .env.example and ask if something doesn’t make sense.
