import express from "express";
import fs from "node:fs";
import data from "../data/video-details.json" assert { type: "json" }; // testing entry
import _, { map } from "underscore";

const router = express.Router();

router.get("/", (_req, res) => {
  const shortList = _.map(data, function (currentObject) {
    return _.pick(currentObject, "id", "title", "channel", "image");
  });
  //using package https://underscorejs.org/#pluck
  res.send(shortList);
});

router.get("/:videoID", (req, res) => {
  const error404 = "No video with that id exists.";
  const videoID = req.params.videoID;
  console.log("Specific video " + videoID);

  const selectedVideo = data.find((e) => {
    return e.id === videoID;
  });

  if (!selectedVideo) {
    res.status(404).send("No video with that id exists.");
  }

  res.send(selectedVideo);
  //should return entire object for one video.
});

router.post("/", (req, res) => {
  console.log("Video post in process");
  if (!req.body.id || !req.body.title || !req.body.description || !req.body.image) {
    res.status(400).send("Error 400: Invalid post contents, please edit your submission and try again.");
  }
  const newVideo = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  };
  const dataFile = fs.readFileSync("./data/video-details-copy.json");
  const test = JSON.parse(dataFile);
  test.push(newVideo);
  fs.writeFileSync("./data/video-details-copy.json", JSON.stringify(test));
  res.send("post accepted");
});

// POST /videos (new video upload)

// POST /videos/:id/comments (new comment)

// DELETE /videos/:videoId/comments/:commentId (delete existing comment)

export default router;
