const express = require("express");
const NewsModel = require("../models/news-model");
const router = express.Router();

router.post("/create-news", (req, res) => {
  const { img, author, desc, title } = req.body;
  const news = new NewsModel({
    image: img,
    author,
    desc,
    title
  });
  news.save().then(n => {
    res.status(200).json({
      news: n
    });
  });
});

router.get("/get-news", (req, res) => {
  NewsModel.find({}, (err, news) => {
    if (err) {
      console.log("error");
    } else {
      res.status(200).json({ news });
    }
  });
});

router.delete("/delete-news/:id", (req, res) => {
  const { id } = req.params;
  NewsModel.deleteMany({ _id: id }, function(err, data) {
    if (err) {
      res.status(422).json({ err: "poza bilmedim" });
    } else {
      res.status(200).json({ deleted: true });
    }
  });
});

router.put("/update-news/:id", (req, res) => {
  const { id } = req.params;
  const { title, image, desc, author } = req.body;

  NewsModel.findOneAndUpdate(
    { _id: id },
    { $set: { title, image, desc, author } },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(422).json({ err: "update ede bilmedim" });
      } else {
        res.status(200).json({ updated: true });
      }
    }
  );
});

module.exports = router;
