const router = require("express").Router();

let Song = require("../models/backendmodels/song.model");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.route("/").get((req, res) => {
  Song.find()
    .then((songs) => res.json(songs))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/image").post(async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    let imageUrl = uploadResponse.url;
    console.log(imageUrl);
    res.json(imageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get(`/:id`, function (req, res) {
  return Song.find({ "values.id": req.params.id })
    .then(function (song) {
      res.json(song);
    })
    .catch(function (err) {
      // handle error
      res.status(400).json("Error: " + err);
    });
});

router.route("/add").post((req, res) => {
  const values = req.body.values;
  const newSong = new Song({
    values,
  });

  newSong
    .save()
    .then(() => res.json("Song added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
