const express = require("express");
const JobsModel = require("../models/jobs-model");
const router = express.Router();
const sharp = require("sharp");

router.post("/create-jobs", (req, res) => {
  const { image, ad, tecrube, tarix, maas } = req.body;

  let parts = image.split(";");
  let mimType = parts[0].split(":")[1];
  let imageData = parts[1].split(",")[1];
  const img = new Buffer.from(imageData, "base64");

  const ext = mimType.includes("jpeg")
    ? mimType.slice(6, 10)
    : mimType.slice(6, 9);

  const imageName = `uploadedimage-${Date.now()}`;

  sharp(img)
    .toFile(__dirname + `/upload/${imageName}.${ext}`)
    .then(data => {
      const jobs = new JobsModel({
        image: imageName,
        ad,
        tecrube,
        tarix,
        maas
      });
      jobs.save().then(j => {
        res.status(200).json({
          jobs: j
        });
      });
    })
    .catch(err => console.log(err));
});

router.get("/get-jobs", (req, res) => {
  JobsModel.find({}, (err, jobs) => {
    if (err) {
      console.log("error");
    } else {
      res.status(200).json({ jobs });
    }
  });
});

router.delete("/delete-jobs/:id", (req, res) => {
  const { id } = req.params;
  JobsModel.deleteMany({ _id: id }, function(err, data) {
    if (err) {
      res.status(422).json({ err: "poza bilmedim" });
    } else {
      res.status(200).json({ deleted: true });
    }
  });
});

module.exports = router;
