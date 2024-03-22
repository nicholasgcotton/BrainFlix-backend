import express from "express";
import fs from "node:fs";
import data from "../data/video-details.json" assert { type: "json" };
import _, { map } from "underscore";
import { v4 } from "uuid";

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

  const selectedVideo = data.find((e) => {
    return e.id === videoID;
  });

  if (!selectedVideo) {
    res.status(404).send("No video with that id exists.");
  }

  res.send(selectedVideo);
  //should return entire object for one video.
});

router.post("/:videoID/comment", (req, res) => {
  const videoIdTarget = req.params.videoID;
  if (!req.body.comment) {
    res.status(400).send("Error 400: Invalid blank comment, please edit your submission and try again.");
  }
  const newComment = {
    id: v4(),
    name: "UserName",
    comment: req.body.comment,
    likes: 0,
    timestamp: Date.now(),
  };

  const dataFile = fs.readFileSync("./data/video-details.json");
  const test = JSON.parse(dataFile);
  const selectedVideo = test.find((e) => {
    return e.id === videoIdTarget;
  });

  selectedVideo.comments.push(newComment);
  fs.writeFileSync("./data/video-details.json", JSON.stringify(test));
  res.send("Post accepted.");
});

// POST /videos (new video upload)
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.image) {
    res.status(400).send("Error 400: Invalid post contents, please edit your submission and try again.");
  }
  const time = Date.now();
  const newVideo = {
    // ! POST /videos that will add a new video to the video list. A unique id must be generated for each video added
    // ! need to switch from taking ID from submission and generating a UUID here.
    id: v4(),
    title: req.body.title,
    channel: "",
    description: req.body.description,
    image: req.body.image,
    views: "",
    likes: "",
    duration: "",
    video: "http://127.0.0.1:8282/stream",
    timestamp: time,
    comments: [],
  };
  const dataFile = fs.readFileSync("./data/video-details.json");
  const test = JSON.parse(dataFile);
  test.push(newVideo);
  fs.writeFileSync("./data/video-details.json", JSON.stringify(test));
  res.send("Post accepted.");
});

// Optional
// POST /videos/:id/comments (new comment)
// DELETE /videos/:videoId/comments/:commentId (delete existing comment)

export default router;
