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

module.exports = router;
