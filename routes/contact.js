const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/post-contact", async (req, res) => {
  const { ad, soyad, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "news.az.robot@gmail.com",
      pass: "newsaz123"
    }
  });

  let info = await transporter.sendMail({
    from: '"news.az.robot@gmail.com" ',
    to: email,
    subject: "newsAZ saytindan mektub",
    text: message
  });
});

module.exports = router;
