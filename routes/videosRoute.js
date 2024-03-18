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

export default router;
