const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// routerler
const authRouter = require("./routes/auth");
const newsRouter = require("./routes/news");
// resul salam
// merge text
// middleware
app.set("view engine", "ejs");
app.use(require("express").static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
console.log("salam");

// router init
app.use("/api", authRouter);
app.use("/api", newsRouter);

// tapilmayan routerler uchun
app.get("/", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.get("/news-form", (req, res) => {
  res.render("newsform")
});

// app.get("/*", (req, res) => {
//   res.render("login")
// });

// mongoose connect
mongoose.set("useCreateIndex", true);
mongoose.connect(
  "mongodb://localhost/breaking-news",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("mongodb is ready")
);

// server
app.listen(4004, () => {
  console.log("server started in 4004 port");
});
