const express = require("express");

const router = express.Router();



router.post("/create-news", (req, res) => {
  console.log(req.body)
})


module.exports = router;